"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ExternalLink, LayoutDashboard, LogOut, Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

type AdminNavProps = {
  title: string
  subtitle?: string
  showLogout?: boolean
  userEmail?: string | null
}

export default function AdminNav({ title, subtitle, showLogout = false, userEmail }: AdminNavProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/admin/dashboard" className="flex min-w-0 items-center gap-3">
          <img src="/images/school-emblem.webp?v=3" alt="東洋医療専門学校 校章" className="h-12 w-12 shrink-0 object-contain" />
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-lg font-black text-[#112B3A] sm:text-xl">{title}</span>
              <span className="hidden rounded-full bg-[#E8F7F4] px-2.5 py-1 text-[9px] font-extrabold tracking-[0.12em] text-[#087C73] sm:inline">ADMIN</span>
            </span>
            {subtitle && <span className="mt-0.5 block truncate text-xs font-semibold text-slate-500">{subtitle}</span>}
            {userEmail && <span className="mt-0.5 block truncate text-[10px] text-slate-400">{userEmail}</span>}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#087C73]">
            <LayoutDashboard className="h-4 w-4" />ダッシュボード
          </Link>
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#087C73]">
            <ExternalLink className="h-4 w-4" />サイト表示
          </Link>
          {showLogout && <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl bg-[#112B3A] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#0B4550]"><LogOut className="h-4 w-4" />ログアウト</button>}
        </div>

        <button onClick={() => setOpen(v => !v)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden" aria-label="管理メニュー">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="mx-auto flex max-w-[1440px] flex-col gap-2">
        <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">ダッシュボード</Link>
        <Link href="/" target="_blank" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">サイトを表示</Link>
        {showLogout && <button onClick={handleLogout} className="rounded-xl bg-[#112B3A] px-4 py-3 text-left text-sm font-extrabold text-white">ログアウト</button>}
      </div></div>}
    </header>
  )
}
