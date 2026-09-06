"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, MessageCircle, X } from "lucide-react"

type NavItem = {
  name: string
  href: string
  isExternal?: boolean
}

type MainNavProps = {
  currentPage: string
}

const navItems: NavItem[] = [
  { name: "ホーム", href: "/" },
  { name: "絆命会について", href: "/about" },
  { name: "イベント", href: "/events" },
  { name: "お知らせ", href: "/news" },
  { name: "求人情報", href: "/jobs" },
]

export default function MainNav({ currentPage }: MainNavProps) {
  const [open, setOpen] = useState(false)

  const navClass = (name: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      name === currentPage
        ? "bg-[#E9F3F1] text-[#0F3D3E]"
        : "text-slate-600 hover:bg-slate-100 hover:text-[#0F3D3E]"
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform group-hover:-translate-y-0.5">
            <Image
              src="/images/school-emblem.webp"
              alt="東洋医療専門学校 校章"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-extrabold tracking-[0.08em] text-slate-900">絆命会</span>
            <span className="hidden truncate text-[11px] font-medium text-slate-500 sm:block">
              東洋医療専門学校 救急救命士学科 同窓会
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className={navClass(item.name)}>
              {item.name}
            </Link>
          ))}
          <a
            href="https://lin.ee/Y8DHYjk"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#0F3D3E] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0A3132] hover:shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            LINEで問い合わせ
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="モバイルナビゲーション">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  item.name === currentPage ? "bg-[#E9F3F1] text-[#0F3D3E]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://lin.ee/Y8DHYjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3D3E] px-4 py-3 text-sm font-bold text-white"
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
