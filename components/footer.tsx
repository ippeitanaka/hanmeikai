import Link from "next/link"
import { MessageCircle } from "lucide-react"

const footerLinks = [
  { label: "ホーム", href: "/" },
  { label: "絆命会について", href: "/about" },
  { label: "イベント", href: "/events" },
  { label: "求人情報", href: "/jobs" },
  { label: "お知らせ", href: "/news" },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-3.5">
            <img
              src="/images/school-emblem.webp?v=3"
              alt="東洋医療専門学校 校章"
              className="h-16 w-16 object-contain"
            />
            <span>
              <span className="block text-xl font-black tracking-[0.08em] text-[#112B3A]">絆命会</span>
              <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                東洋医療専門学校 救急救命士学科 同窓会
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-5 lg:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="フッターナビゲーション">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm font-bold text-slate-600 transition hover:text-[#087C73]">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <a
                href="https://lin.ee/Y8DHYjk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#087C73] hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                LINE
              </a>
              <Link href="/admin/login" className="hover:text-slate-600">Management</Link>
              <span>© 2003 Hanmeikai. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
