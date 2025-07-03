"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Home, Handshake, Heart } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

type AdminNavProps = {
  title: string
  subtitle?: string
  showLogout?: boolean
  userEmail?: string | null
}

export default function AdminNav({ title, subtitle, showLogout = false, userEmail }: AdminNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    setIsMenuOpen(false)
  }

  return (
    <nav className="relative z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="relative group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-2 sm:border-4 border-emerald-900">
                <div className="relative">
                  <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-900" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-1 h-1 sm:w-2 sm:h-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-amber-100 tracking-wider">{title}</h1>
              {subtitle && <p className="text-xs sm:text-sm text-emerald-200">{subtitle}</p>}
              {userEmail && <p className="text-xs text-emerald-200">ログイン中: {userEmail}</p>}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2">
            {showLogout && (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-emerald-600">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="flex items-center text-amber-100 hover:text-amber-300 font-semibold py-2 px-3 rounded-lg hover:bg-emerald-600/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                ホームページ
              </Link>
              <Link
                href="/admin/dashboard"
                className="flex items-center text-amber-100 hover:text-amber-300 font-semibold py-2 px-3 rounded-lg hover:bg-emerald-600/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Handshake className="w-5 h-5 mr-3" />
                管理ダッシュボード
              </Link>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-300 hover:text-red-100 font-semibold py-2 px-3 rounded-lg hover:bg-red-600/30 transition-all duration-300 w-full text-left"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  ログアウト
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
