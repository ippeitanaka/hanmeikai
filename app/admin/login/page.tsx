"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, LockKeyhole } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。")
      else router.push("/admin/dashboard")
    } catch {
      setError("ログイン中にエラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="" />
      <main className="bg-gradient-to-b from-[#F6FBFA] to-white px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#087C73]"><ArrowLeft className="h-4 w-4" />ホームに戻る</Link>
          <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,61,62,0.10)] sm:p-9">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F7F4] text-[#087C73]"><LockKeyhole className="h-8 w-8" /></span>
            <div className="mt-5 text-center"><p className="text-[10px] font-extrabold tracking-[0.22em] text-[#12A491]">ADMINISTRATION</p><h1 className="mt-2 text-2xl font-black">管理者ログイン</h1><p className="mt-2 text-sm font-medium text-slate-500">管理者アカウントでログインしてください。</p></div>
            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              <div><label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">メールアドレス</label><input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10" placeholder="admin@example.com" /></div>
              <div><label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">パスワード</label><input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10" /></div>
              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#112B3A] px-5 py-3.5 text-sm font-extrabold text-white disabled:opacity-50">{loading ? "ログイン中..." : "ログイン"}</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
