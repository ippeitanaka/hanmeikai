"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import EnhancedVideoBackground from "@/components/enhanced-video-background"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      setError("ログイン中にエラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black relative overflow-hidden font-makinas-square">
      {/* Enhanced Background Video */}
      <EnhancedVideoBackground />

      {/* Navigation */}
      <MainNav currentPage="" />

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-20">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-kizuna-gold hover:text-kizuna-light-gold font-semibold transition-colors duration-300 text-sm sm:text-base font-makinas-square"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            ホームに戻る
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-2xl p-5 sm:p-8 shadow-2xl border-4 border-kizuna-gold">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-kizuna-gold to-kizuna-bronze rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-2 font-makinas-square">管理者ログイン</h2>
            <p className="text-sm sm:text-base text-kizuna-gold font-makinas-square">管理者権限でログインしてください</p>
          </div>

                    <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-kizuna-gold mb-2 font-makinas-square">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-kizuna-gold/50 bg-black/50 text-white rounded-lg focus:outline-none focus:border-kizuna-gold focus:ring-2 focus:ring-kizuna-gold/20 transition-all duration-300 text-base font-makinas-square"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-kizuna-gold mb-2 font-makinas-square">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-kizuna-gold/50 bg-black/50 text-white rounded-lg focus:outline-none focus:border-kizuna-gold focus:ring-2 focus:ring-kizuna-gold/20 transition-all duration-300 text-base font-makinas-square"
                placeholder="パスワードを入力"
              />
            </div>

            {error && (
              <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-3">
                <p className="text-red-300 text-sm font-makinas-square">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-base sm:text-lg font-makinas-square"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  ログイン中...
                </div>
              ) : (
                "ログイン"
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
