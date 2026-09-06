"use client"

import { useEffect, useState } from "react"
import { BriefcaseBusiness, Building2, CalendarDays, Download, Eye, FileText, MapPin, MessageCircle, UserRound, X } from "lucide-react"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import PasswordProtection from "@/components/password-protection"
import { EmptyState, LoadingState, PublicPageHeader } from "@/components/public-page"
import { supabase, type Job } from "@/lib/supabase"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [previewPdf, setPreviewPdf] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false })
        if (error) console.error("Error fetching jobs:", error)
        else setJobs(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <PasswordProtection correctPassword="toyo119">
      <div className="min-h-screen bg-white text-[#112B3A]">
        <MainNav currentPage="求人情報" />
        <PublicPageHeader
          eyebrow="CAREER"
          title="求人情報"
          description="絆命会会員向けに、救急救命士としての経験を活かせる求人・キャリア情報を掲載しています。"
          icon={<BriefcaseBusiness className="h-6 w-6" />}
        />

        <main className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          {loading ? (
            <LoadingState label="求人情報を読み込んでいます..." />
          ) : jobs.length === 0 ? (
            <EmptyState icon={<BriefcaseBusiness className="h-8 w-8" />} title="現在、求人情報はありません" description="新しい求人情報が追加されるまでお待ちください。" />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <article key={job.id} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,61,62,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F7F4] text-[#0B9A82]">
                      <BriefcaseBusiness className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-[#F3F7F7] px-3 py-1 text-[10px] font-extrabold text-slate-500">{new Date(job.created_at).toLocaleDateString("ja-JP")}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-black leading-7">{job.title}</h2>
                  <div className="mt-4 space-y-2.5 text-sm font-semibold text-slate-500">
                    {job.company && <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#0B9A82]" />{job.company}</p>}
                    {job.location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0B9A82]" />{job.location}</p>}
                    {job.employment_type && <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-[#0B9A82]" />{job.employment_type}</p>}
                  </div>
                  <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
                    <button onClick={() => setSelectedJob(job)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087C73] px-4 py-3 text-sm font-extrabold text-white">
                      <Eye className="h-4 w-4" />詳細
                    </button>
                    {job.pdf_url && <button onClick={() => setPreviewPdf(job.pdf_url)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-extrabold text-slate-700 hover:border-[#12B89E]/40 hover:text-[#087C73]"><FileText className="h-4 w-4" />資料</button>}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#087C73] to-[#064E52] p-8 text-white sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black">求人情報についてのお問い合わせ</h2>
                <p className="mt-2 text-sm font-medium text-white/75">掲載内容へのご質問や相談はLINEからお問い合わせください。</p>
              </div>
              <a href="https://lin.ee/Y8DHYjk" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#087C73]">
                <MessageCircle className="h-4 w-4" />LINEで問い合わせ
              </a>
            </div>
          </div>
        </main>

        {selectedJob && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071C2A]/70 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
                <h3 className="text-xl font-black sm:text-2xl">{selectedJob.title}</h3>
                <button onClick={() => setSelectedJob(null)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedJob.company && <Info icon={<Building2 className="h-5 w-5" />} label="会社・組織名" value={selectedJob.company} />}
                  {selectedJob.location && <Info icon={<MapPin className="h-5 w-5" />} label="勤務地" value={selectedJob.location} />}
                  {selectedJob.employment_type && <Info icon={<UserRound className="h-5 w-5" />} label="雇用形態" value={selectedJob.employment_type} />}
                  <Info icon={<CalendarDays className="h-5 w-5" />} label="掲載日" value={new Date(selectedJob.created_at).toLocaleDateString("ja-JP")} />
                </div>
                {selectedJob.description && <div className="mt-6 rounded-2xl bg-[#F7FBFC] p-6"><h4 className="font-black">求人概要</h4><p className="mt-3 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">{selectedJob.description}</p></div>}
                {selectedJob.pdf_url && <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => { setPreviewPdf(selectedJob.pdf_url); setSelectedJob(null) }} className="inline-flex items-center gap-2 rounded-xl bg-[#087C73] px-5 py-3 text-sm font-extrabold text-white"><Eye className="h-4 w-4" />資料をプレビュー</button><a href={selectedJob.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-extrabold text-slate-700"><Download className="h-4 w-4" />開く</a></div>}
              </div>
            </div>
          </div>
        )}

        {previewPdf && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#071C2A]/80 p-4 backdrop-blur-sm">
            <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h3 className="font-black">求人資料プレビュー</h3>
                <button onClick={() => setPreviewPdf(null)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"><X className="h-5 w-5" /></button>
              </div>
              <iframe src={previewPdf} className="min-h-0 flex-1" title="求人資料PDF" />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </PasswordProtection>
  )
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 text-[#0B9A82]">{icon}<span className="text-xs font-extrabold tracking-[0.08em] text-slate-500">{label}</span></div><p className="mt-2 font-bold text-[#112B3A]">{value}</p></div>
}
