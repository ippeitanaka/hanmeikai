"use client"

import type React from "react"

import { useState } from "react"
import { Database, Key, Shield, Save, ArrowLeft, Handshake, Heart, Copy, Check } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default function SupabaseSetupPage() {
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [anonKey, setAnonKey] = useState("")
  const [serviceRoleKey, setServiceRoleKey] = useState("")
  const [loading, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      // 環境変数の検証
      if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        setError("すべての項目を入力してください。")
        return
      }

      if (!supabaseUrl.includes("supabase.co")) {
        setError("正しいSupabase URLを入力してください。")
        return
      }

      // 実際の環境では、これらの値をサーバーサイドで安全に保存する必要があります
      // ここではデモンストレーション用にローカルストレージに保存
      localStorage.setItem("supabase_url", supabaseUrl)
      localStorage.setItem("supabase_anon_key", anonKey)
      localStorage.setItem("supabase_service_role_key", serviceRoleKey)

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (error) {
      setError("設定の保存中にエラーが発生しました。")
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #059669 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #d97706 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-900 transform group-hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <Handshake className="w-10 h-10 text-emerald-900" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-30 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-100 tracking-wider drop-shadow-lg">絆命会</h1>
                <p className="text-emerald-200 font-medium">Supabase環境変数設定</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/login"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            管理者ログインに戻る
          </Link>
        </div>

        {/* Setup Form */}
        <div className="bg-gradient-to-br from-white via-stone-50 to-amber-50 rounded-3xl p-10 shadow-2xl border-4 border-emerald-700">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Database className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Supabase環境変数設定</h2>
            <p className="text-xl text-gray-600">Supabaseプロジェクトの接続情報を入力してください</p>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mt-4"></div>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Supabase URL */}
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
              <label htmlFor="supabaseUrl" className="block text-lg font-bold text-emerald-700 mb-3 flex items-center">
                <Database className="w-5 h-5 mr-3" />
                Supabase URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="supabaseUrl"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  required
                  className="w-full px-4 py-4 border-2 border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 font-mono text-base pr-12"
                  placeholder="https://your-project-id.supabase.co"
                />
                {supabaseUrl && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(supabaseUrl, "url")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    {copiedField === "url" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                📍 Supabaseプロジェクト → Settings → API → Project URL
              </p>
            </div>

            {/* Anon Key */}
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
              <label htmlFor="anonKey" className="block text-lg font-bold text-blue-700 mb-3 flex items-center">
                <Key className="w-5 h-5 mr-3" />
                Anon Key (公開キー)
              </label>
              <div className="relative">
                <textarea
                  id="anonKey"
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 font-mono text-sm resize-none"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6..."
                />
                {anonKey && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(anonKey, "anon")}
                    className="absolute right-3 top-3 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {copiedField === "anon" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 bg-blue-50 p-2 rounded">
                🔑 Supabaseプロジェクト → Settings → API → Project API keys → anon public
              </p>
            </div>

            {/* Service Role Key */}
            <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300 shadow-lg">
              <label htmlFor="serviceRoleKey" className="block text-lg font-bold text-red-700 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                Service Role Key (秘密キー)
              </label>
              <div className="relative">
                <textarea
                  id="serviceRoleKey"
                  value={serviceRoleKey}
                  onChange={(e) => setServiceRoleKey(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-red-400 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-mono text-sm resize-none bg-white"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6..."
                />
                {serviceRoleKey && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(serviceRoleKey, "service")}
                    className="absolute right-3 top-3 text-red-600 hover:text-red-800 transition-colors"
                  >
                    {copiedField === "service" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-3">
                <p className="text-sm text-red-800 font-semibold flex items-center">⚠️ 重要: このキーは秘密情報です</p>
                <p className="text-xs text-red-700 mt-1">
                  Supabaseプロジェクト → Settings → API → Project API keys → service_role secret
                </p>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 animate-pulse">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <Save className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-green-800 font-bold text-lg">設定完了！</p>
                    <p className="text-green-700">環境変数が正常に保存されました</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                <p className="text-red-800 font-bold text-lg">❌ {error}</p>
              </div>
            )}

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl text-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                  保存中...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Save className="w-6 h-6 mr-4" />
                  環境変数を保存して設定完了
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Next Steps */}
        {success && (
          <div className="text-center mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-300">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">🎉 次のステップ</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admin/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  管理者ログイン
                </Link>
                <Link
                  href="/"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  ホームに戻る
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
