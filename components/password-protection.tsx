"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"

interface PasswordProtectionProps {
  children: React.ReactNode
  correctPassword: string
}

export default function PasswordProtection({ children, correctPassword }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (localStorage.getItem("jobs-auth") === correctPassword) setAuthenticated(true)
  }, [correctPassword])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      localStorage.setItem("jobs-auth", password)
      setAuthenticated(true)
      setError("")
    } else {
      setError("パスワードが正しくありません")
      setPassword("")
    }
  }

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="求人情報" />
      <main className="bg-gradient-to-b from-[#F6FBFA] to-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,61,62,0.10)] sm:p-9">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F7F4] text-[#087C73]">
            <LockKeyhole className="h-8 w-8" />
          </span>
          <div className="mt-5 text-center">
            <p className="text-[10px] font-extrabold tracking-[0.22em] text-[#12A491]">MEMBERS ONLY</p>
            <h1 className="mt-2 text-2xl font-black">求人情報</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">絆命会会員専用ページです。</p>
          </div>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="jobs-password" className="mb-2 block text-sm font-bold text-slate-700">パスワード</label>
              <div className="relative">
                <input id="jobs-password" type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-11 text-sm outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10" placeholder="パスワードを入力" required />
                <button type="button" onClick={() => setShow(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#087C73]" aria-label="パスワード表示切替">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#12B89E] to-[#087C73] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(8,124,115,0.18)]">求人情報を見る</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
