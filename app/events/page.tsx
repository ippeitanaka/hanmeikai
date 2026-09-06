"use client"

import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Clock3, MapPin } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import { EmptyState, LoadingState, PublicPageHeader } from "@/components/public-page"
import { supabase, type Event } from "@/lib/supabase"
import { formatTextWithLinks } from "@/lib/utils"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*")
        if (error) {
          console.error("Error fetching events:", error)
          return
        }
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const sorted = (data || []).sort((a, b) => {
          const da = new Date(a.date); const db = new Date(b.date)
          const aDay = new Date(da.getFullYear(), da.getMonth(), da.getDate())
          const bDay = new Date(db.getFullYear(), db.getMonth(), db.getDate())
          const aPast = aDay < today; const bPast = bDay < today
          if (!aPast && !bPast) return aDay.getTime() - bDay.getTime()
          if (aPast && bPast) return bDay.getTime() - aDay.getTime()
          return aPast ? 1 : -1
        })
        setEvents(sorted)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const today = useMemo(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#112B3A]">
      <MainNav currentPage="イベント" />
      <PublicPageHeader
        eyebrow="EVENTS"
        title="イベント"
        description="交流会・研修会など、絆命会が開催・案内するイベント情報を掲載しています。"
        icon={<CalendarDays className="h-6 w-6" />}
      />

      <main className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        {loading ? (
          <LoadingState label="イベント情報を読み込んでいます..." />
        ) : events.length === 0 ? (
          <EmptyState icon={<CalendarDays className="h-8 w-8" />} title="現在、予定されているイベントはありません" description="新しいイベントが決まり次第、こちらでお知らせします。" />
        ) : (
          <div className="space-y-5">
            {events.map((event) => {
              const eventDay = new Date(event.date)
              const normalized = new Date(eventDay.getFullYear(), eventDay.getMonth(), eventDay.getDate())
              const isPast = normalized < today
              return (
                <article key={event.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,61,62,0.06)]">
                  <div className="grid md:grid-cols-[150px_1fr]">
                    <div className={isPast ? "bg-slate-100 p-6 text-slate-500" : "bg-[#E8F7F4] p-6 text-[#087C73]"}>
                      <p className="text-xs font-extrabold tracking-[0.15em]">{isPast ? "PAST" : "UPCOMING"}</p>
                      <p className="mt-3 text-4xl font-black">{format(eventDay, "dd")}</p>
                      <p className="mt-1 text-sm font-extrabold">{format(eventDay, "yyyy.MM")}</p>
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <h2 className="text-2xl font-black tracking-[-0.02em]">{event.title}</h2>
                          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-500">
                            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#0B9A82]" />{format(eventDay, "yyyy年MM月dd日(E)", { locale: ja })}</span>
                            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0B9A82]" />{event.location}</span>
                          </div>
                          <div className="mt-5 text-sm font-medium leading-7 text-slate-600">{formatTextWithLinks(event.description)}</div>
                        </div>
                        <span className={isPast ? "inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-500" : "inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E8F7F4] px-4 py-2 text-xs font-extrabold text-[#087C73]"}>
                          <Clock3 className="h-4 w-4" />
                          {isPast ? "開催済み" : "開催予定"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
