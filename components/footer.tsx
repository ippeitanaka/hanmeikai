import Link from "next/link"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import KizunaMark from "@/components/kizuna-mark"

const footerLinks = [
  { label: "絆命会について", href: "/about" },
  { label: "イベント", href: "/events" },
  { label: "お知らせ", href: "/news" },
  { label: "求人情報", href: "/jobs" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B3435] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#D8A54A]">
                <KizunaMark className="h-9 w-9" />
              </span>
              <span>
                <span className="block text-xl font-extrabold tracking-[0.08em]">絆命会</span>
                <span className="mt-1 block text-xs font-medium text-white/60">
                  東洋医療専門学校 救急救命士学科 同窓会
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
              卒業してからも、救急救命士として歩む仲間がつながり、学び、支え合える場所を。
            </p>
          </div>

          <div className="lg:text-right">
            <div className="flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm font-semibold text-white/70 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href="https://lin.ee/Y8DHYjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0F3D3E] transition hover:bg-[#F2F7F6]"
            >
              <MessageCircle className="h-4 w-4" />
              LINEで問い合わせ
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2003 Hanmeikai. All rights reserved.</p>
          <Link href="/admin/login" className="transition hover:text-white/70">
            Management
          </Link>
        </div>
      </div>
    </footer>
  )
}
