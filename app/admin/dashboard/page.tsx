"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, BriefcaseBusiness, CalendarDays, Edit3, ExternalLink, Plus, Trash2 } from "lucide-react"
import { supabase, supabaseAdmin, type Event, type News, type Job } from "@/lib/supabase"
import AdminNav from "@/components/admin-nav"
import Footer from "@/components/footer"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [news, setNews] = useState<News[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState("")
  const router = useRouter()

  useEffect(() => { checkUser(); fetchEvents(); fetchNews(); fetchJobs() }, [])
  const checkUser = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) router.push("/admin/login"); else setUser(user); setLoading(false) }
  const fetchEvents = async () => { const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true }); if (!error) setEvents(data || []) }
  const fetchNews = async () => { const { data, error } = await supabase.from("news").select("*").order("published_date", { ascending: false }); if (!error) setNews(data || []) }
  const fetchJobs = async () => { const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false }); if (!error) setJobs(data || []) }
  const remove = async (table: "events"|"news"|"jobs", id: string, refresh: () => void, label: string) => {
    if (!confirm(`${label}を削除しますか？`)) return
    setActionError("")
    const { error } = await supabaseAdmin.from(table).delete().eq("id", id)
    if (error) setActionError(`${label}の削除に失敗しました: ${error.message}`)
    else refresh()
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#F7FBFC]"><span className="h-11 w-11 animate-spin rounded-full border-4 border-[#D8EFEB] border-t-[#0B9A82]" /></div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#112B3A]">
      <AdminNav title="絆命会 管理画面" subtitle="コンテンツ管理ダッシュボード" userEmail={user.email} showLogout />
      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[10px] font-extrabold tracking-[0.22em] text-[#12A491]">ADMIN DASHBOARD</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">コンテンツ管理</h1><p className="mt-2 text-sm font-medium text-slate-500">イベント・お知らせ・求人情報をここから管理できます。</p></div>
          <div className="flex flex-wrap gap-2">{[["/events","イベント"],["/news","お知らせ"],["/jobs","求人"]].map(([href,label])=><Link key={href} href={href} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-600 shadow-sm hover:text-[#087C73]"><ExternalLink className="h-4 w-4" />{label}ページ</Link>)}</div>
        </div>
        {actionError && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{actionError}</p>}
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <AdminSection title="イベント管理" icon={<CalendarDays className="h-5 w-5" />} newHref="/admin/events/new">
            {events.length === 0 ? <Empty text="イベントがありません" /> : events.map(e=><AdminRow key={e.id} title={e.title} meta={new Date(e.date).toLocaleDateString("ja-JP")} editHref={`/admin/events/edit/${e.id}`} onDelete={()=>remove("events",e.id,fetchEvents,"イベント")} />)}
          </AdminSection>
          <AdminSection title="お知らせ管理" icon={<Bell className="h-5 w-5" />} newHref="/admin/news/new">
            {news.length === 0 ? <Empty text="お知らせがありません" /> : news.map(n=><AdminRow key={n.id} title={n.title} meta={new Date(n.published_date).toLocaleDateString("ja-JP")} editHref={`/admin/news/edit/${n.id}`} onDelete={()=>remove("news",n.id,fetchNews,"お知らせ")} />)}
          </AdminSection>
          <AdminSection title="求人管理" icon={<BriefcaseBusiness className="h-5 w-5" />} newHref="/admin/jobs/new">
            {jobs.length === 0 ? <Empty text="求人情報がありません" /> : jobs.map(j=><AdminRow key={j.id} title={j.title} meta={[j.company,j.location].filter(Boolean).join(" / ")} editHref={`/admin/jobs/edit/${j.id}`} onDelete={()=>remove("jobs",j.id,fetchJobs,"求人情報")} />)}
          </AdminSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function AdminSection({title,icon,newHref,children}:{title:string;icon:React.ReactNode;newHref:string;children:React.ReactNode}) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,61,62,0.06)] sm:p-6"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F4] text-[#087C73]">{icon}</span><h2 className="text-lg font-black">{title}</h2></div><Link href={newHref} className="inline-flex items-center gap-1.5 rounded-xl bg-[#087C73] px-3.5 py-2.5 text-xs font-extrabold text-white"><Plus className="h-4 w-4" />新規作成</Link></div><div className="mt-5 max-h-[62vh] space-y-3 overflow-y-auto pr-1">{children}</div></section>
}
function AdminRow({title,meta,editHref,onDelete}:{title:string;meta:string;editHref:string;onDelete:()=>void}) {
  return <div className="rounded-2xl border border-slate-100 bg-[#F9FBFB] p-4"><h3 className="line-clamp-2 font-bold">{title}</h3><p className="mt-1 text-xs font-medium text-slate-500">{meta || "—"}</p><div className="mt-3 flex gap-2"><Link href={editHref} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-extrabold text-[#087C73] ring-1 ring-slate-200"><Edit3 className="h-3.5 w-3.5" />編集</Link><button onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-extrabold text-red-600"><Trash2 className="h-3.5 w-3.5" />削除</button></div></div>
}
function Empty({text}:{text:string}) { return <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm font-bold text-slate-400">{text}</div> }
