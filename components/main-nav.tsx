"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, MessageCircle, X } from "lucide-react"

type MainNavProps = {
  currentPage: string
}

const navItems = [
  { name: "ホーム", href: "/" },
  { name: "絆命会について", href: "/about" },
  { name: "イベント", href: "/events" },
  { name: "求人情報", href: "/jobs" },
  { name: "お知らせ", href: "/news" },
]

export default function MainNav({ currentPage }: MainNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex min-w-0 items-center gap-3.5" onClick={() => setOpen(false)}>
          <img
            src="/images/school-emblem.webp?v=3"
            alt="東洋医療専門学校 校章"
            className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
          />
          <span className="min-w-0">
            <span className="block text-xl font-black tracking-[0.08em] text-[#112B3A] sm:text-2xl">絆命会</span>
            <span className="hidden truncate text-[11px] font-semibold text-slate-500 sm:block">
              東洋医療専門学校 救急救命士学科 同窓会
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => {
            const active = item.name === currentPage
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                  active
                    ? "bg-[#E8F5F2] text-[#087C73]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#087C73]"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          <a
            href="https://lin.ee/Y8DHYjk"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#12B89E] to-[#087C73] px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(8,124,115,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(8,124,115,0.28)]"
          >
            <MessageCircle className="h-4 w-4" />
            LINEで問い合わせ
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 xl:hidden"
          aria-expanded={open}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="モバイルナビゲーション">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  item.name === currentPage ? "bg-[#E8F5F2] text-[#087C73]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://lin.ee/Y8DHYjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#087C73] px-4 py-3 text-sm font-extrabold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              LINEで問い合わせ
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
