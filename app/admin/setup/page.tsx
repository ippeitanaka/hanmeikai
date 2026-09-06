"use client"

import type React from "react"

import { useState } from "react"
import { Database, Key, Shield, Save, ArrowLeft, Handshake, Heart, Copy, Check } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

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
    <div className="min-h-screen bg-[#F7FBFC] text-[#112B3A]">

      {/* Navigation */}
      <AdminNav title="絆命会 管理画面" subtitle="Supabase環境設定" />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/login"
            className="inline-flex items-center text-slate-700 hover:text-[#087C73] font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            管理者ログインに戻る
          </Link>
        </div>

        {/* Setup Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,61,62,0.06)] sm:p-10">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-pulse">
              <Database className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#112B3A] mb-4">Supabase環境変数設定</h2>
            <p className="text-xl text-gray-600">Supabaseプロジェクトの接続情報を入力してください</p>
            
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Supabase URL */}
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-sm">
              <label htmlFor="supabaseUrl" className="block text-lg font-bold text-slate-700 mb-3 flex items-center">
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
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 font-mono text-base pr-12"
                  placeholder="https://your-project-id.supabase.co"
                />
                {supabaseUrl && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(supabaseUrl, "url")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#087C73] hover:text-[#112B3A] transition-colors"
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
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-sm">
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
            <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300 shadow-sm">
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
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <h3 className="text-xl font-bold text-[#112B3A] mb-4">🎉 次のステップ</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/admin/login"
                  className="bg-[#087C73] hover:bg-[#076B65] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
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
