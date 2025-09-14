#!/usr/bin/env node
/*
  冪等なHTMLタグ挿入スクリプト
  - .htmlを再帰的に探索し</head>直前へ挿入
  - 既存タグの重複を検出してスキップ
  - EOL(LF/CRLF)とインデントを可能な範囲で保持
  - Search Console用metaはマッピングで出し分け（未設定はスキップ）
  - 変更/スキップ/エラーを一覧で出力
*/
const fs = require('fs')
const path = require('path')

//=== 設定値（必要に応じて編集） ===

// ディレクトリ名やパスの一部で出し分けたい場合に使用
// 例: { admin: 'xxxx', public: 'yyyy' }
// 指定が無いファイルはSearch Console metaを挿入しません
const GOOGLE_VERIFICATION_MAP = {
  // admin: '',
  // public: '',
}

// 除外ディレクトリ
const EXCLUDE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'out'])

//=== ユーティリティ ===
const findEOL = (text) => (text.includes('\r\n') ? '\r\n' : '\n')
const leadingWhitespace = (line) => (line.match(/^([ \t]*)/) || ['',''])[1]
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function detectIndent(text, headCloseIndex) {
  const before = text.slice(0, headCloseIndex)
  const lines = before.split(/\r?\n/)
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i]
    if (l.trim().length === 0) continue
    return leadingWhitespace(l)
  }
  return '  '
}

function hasGoogleVerification(content, value) {
  if (!value) return false
  const re = new RegExp(`<meta\\s+name=["']google-site-verification["']\\s+content=["']${escapeRegExp(value)}["'][^>]*>`, 'i')
  return re.test(content)
}

function pickVerificationForFile(filePath) {
  const keys = Object.keys(GOOGLE_VERIFICATION_MAP)
  for (const key of keys) {
    const needle = `${path.sep}${key}${path.sep}`
    if (filePath.includes(needle)) {
      return GOOGLE_VERIFICATION_MAP[key]
    }
  }
  return null
}

function buildInsertBlock({ indent, eol, googleVerification }) {
  const lines = []
  if (googleVerification) {
    lines.push(`<meta name="google-site-verification" content="${googleVerification}" />`)
  }
  return lines.map(l => indent + l).join(eol) + eol
}

function insertBeforeHeadClose(content, block, indent, eol) {
  const idx = content.toLowerCase().lastIndexOf('</head>')
  if (idx === -1) return { ok: false, content }
  const before = content.slice(0, idx)
  const after = content.slice(idx)
  // 直前に余白がなければEOLを入れる
  const needsEOL = !before.endsWith('\n') && !before.endsWith('\r')
  const spacer = needsEOL ? eol : ''
  return { ok: true, content: before + spacer + block + indent + after }
}

function shouldSkipFile(filePath) {
  const parts = filePath.split(path.sep)
  return parts.some(p => EXCLUDE_DIRS.has(p))
}

function walk(dir, results) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(ent.name)) continue
      walk(full, results)
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
      if (!shouldSkipFile(full)) results.push(full)
    }
  }
}

function main() {
  const root = process.cwd()
  const htmlFiles = []
  walk(root, htmlFiles)

  const changed = []
  const skipped = []
  const errors = []

  if (htmlFiles.length === 0) {
    console.log('No .html files found. Nothing to do.')
  }

  for (const file of htmlFiles) {
    try {
      const raw = fs.readFileSync(file, 'utf8')
      const eol = findEOL(raw)
      const idx = raw.toLowerCase().lastIndexOf('</head>')
      if (idx === -1) {
        skipped.push({ file, reason: 'no </head>' })
        continue
      }

      const indent = detectIndent(raw, idx)
      const verification = pickVerificationForFile(file)
      const verificationExists = verification ? hasGoogleVerification(raw, verification) : false

      if (!verification || verificationExists) {
        skipped.push({ file, reason: 'already has verification or no verification needed' })
        continue
      }

      const block = buildInsertBlock({ indent, eol, googleVerification: verificationExists ? null : verification })
      if (!block.trim()) {
        skipped.push({ file, reason: 'nothing to insert' })
        continue
      }
      const { ok, content } = insertBeforeHeadClose(raw, block, indent, eol)
      if (!ok) {
        skipped.push({ file, reason: 'failed to locate </head>' })
        continue
      }
      fs.writeFileSync(file, content, 'utf8')
      changed.push(file)
    } catch (err) {
      errors.push({ file, error: String(err && err.message ? err.message : err) })
    }
  }

  // ログ出力
  console.log('\n=== Inject Tags Summary ===')
  console.log(`Changed: ${changed.length}`)
  changed.forEach(f => console.log(`  - ${f}`))
  console.log(`Skipped: ${skipped.length}`)
  skipped.forEach(s => console.log(`  - ${s.file} (${s.reason})`))
  console.log(`Errors: ${errors.length}`)
  errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`))
}

main()
