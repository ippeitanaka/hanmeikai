"use client"

import { useEffect, useState } from "react"
import { Bell, CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import { EmptyState, LoadingState, PublicPageHeader } from "@/components/public-page"
import { supabase, type News } from "@/lib/supabase"

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase.from("news").select("*").order("published_date", { ascending: false })
        if (error) console.error("Error fetching news:", error)
        else setNews(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="お知らせ" />
      <PublicPageHeader
        eyebrow="NEWS"
        title="お知らせ"
        description="絆命会からのご案内、活動報告、会員向けの大切なお知らせを掲載しています。"
        icon={<Bell className="h-6 w-6" />}
      />

      <main className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        {loading ? (
          <LoadingState label="お知らせを読み込んでいます..." />
        ) : news.length === 0 ? (
          <EmptyState icon={<Bell className="h-8 w-8" />} title="現在、お知らせはありません" description="新しいお知らせが追加され次第、こちらに掲載します。" />
        ) : (
          <div className="space-y-4">
            {news.map((item, index) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_26px_rgba(15,61,62,0.05)] sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F7F4] text-[#0B9A82]">
                    <Bell className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500">
                        <CalendarDays className="h-4 w-4 text-[#0B9A82]" />
                        {format(new Date(item.published_date), "yyyy年MM月dd日", { locale: ja })}
                      </span>
                      {index === 0 && <span className="rounded-full bg-[#FFF0E5] px-3 py-1 text-[10px] font-extrabold tracking-[0.08em] text-[#D97706]">NEW</span>}
                    </div>
                    <h2 className="mt-3 text-2xl font-black tracking-[-0.02em]">{item.title}</h2>
                    <p className="mt-4 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">{item.content}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
