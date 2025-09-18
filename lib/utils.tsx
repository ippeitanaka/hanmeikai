import React from "react";

// テキスト内の改行を<br>に変換し、URLをリンク化する
export function formatTextWithLinks(text: string): React.ReactNode[] {
  if (!text) return [];
  // URL検出用正規表現
  const urlRegex = /(https?:\/\/[\w!?/\-._~:@&=+$,%#]+)|(www\.[\w!?/\-._~:@&=+$,%#]+)/g;
  // 改行で分割し、各行ごとに処理
  return text.split(/\n/).flatMap((line, i, arr) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = urlRegex.exec(line)) !== null) {
      // URL前のテキスト
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      const url = match[0];
      const href = url.startsWith('http') ? url : `https://${url}`;
      parts.push(
        <a key={href + i} href={href} target="_blank" rel="noopener noreferrer" className="underline text-kizuna-gold hover:text-kizuna-bronze">{url}</a>
      );
      lastIndex = match.index + url.length;
    }
    // 残りのテキスト
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
    // 最後以外は<br />を挿入
    if (i < arr.length - 1) {
      parts.push(<br key={`br-${i}`} />);
    }
    return parts;
  });
}
