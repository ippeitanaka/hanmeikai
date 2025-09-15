"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Bell, Plus, Edit, Trash2, ExternalLink, Briefcase } from "lucide-react"
import Link from "next/link"
import { supabase, type Event, type News, type Job } from "@/lib/supabase"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import EnhancedVideoBackground from "@/components/enhanced-video-background"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [news, setNews] = useState<News[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchEvents()
    fetchNews()
    fetchJobs()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/admin/login")
    } else {
      setUser(user)
    }
    setLoading(false)
  }

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

    if (!error) {
      setEvents(data || [])
    }
  }

  const fetchNews = async () => {
    const { data, error } = await supabase.from("news").select("*").order("published_date", { ascending: false })

    if (!error) {
      setNews(data || [])
    }
  }

  const fetchJobs = async () => {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (!error) {
      setJobs(data || [])
    }
  }

  const deleteEvent = async (id: string) => {
    if (confirm("このイベントを削除しますか？")) {
      const { error } = await supabase.from("events").delete().eq("id", id)

      if (!error) {
        fetchEvents()
      }
    }
  }

  const deleteNews = async (id: string) => {
    if (confirm("このお知らせを削除しますか？")) {
      const { error } = await supabase.from("news").delete().eq("id", id)

      if (!error) {
        fetchNews()
      }
    }
  }

  const deleteJob = async (id: string) => {
    if (confirm("この求人情報を削除しますか？")) {
      const { error } = await supabase.from("jobs").delete().eq("id", id)

      if (!error) {
        fetchJobs()
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-kizuna-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kizuna-gold"></div>
      </div>
    )
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-kizuna-dark relative overflow-hidden font-makinas-square">
      {/* Enhanced Background Video */}
      <EnhancedVideoBackground />

      {/* Navigation */}
      <MainNav currentPage="" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-makinas-square">管理者ダッシュボード</h1>
          <p className="text-kizuna-gold font-makinas-square">ユーザー: {user.email}</p>
          <button
            onClick={logout}
            className="mt-4 bg-gradient-to-r from-kizuna-dark to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 font-makinas-square border border-kizuna-gold"
          >
            ログアウト
          </button>
        </div>

        {/* Quick Links */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center sm:justify-start">
          <Link
            href="/events"
            target="_blank"
            className="inline-flex items-center bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-medium py-2 px-4 rounded-lg text-sm transition-colors font-makinas-square"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            イベントページを表示
          </Link>
          <Link
            href="/news"
            target="_blank"
            className="inline-flex items-center bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-medium py-2 px-4 rounded-lg text-sm transition-colors font-makinas-square"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            お知らせページを表示
          </Link>
          <Link
            href="/jobs"
            target="_blank"
            className="inline-flex items-center bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-medium py-2 px-4 rounded-lg text-sm transition-colors font-makinas-square"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            求人情報ページを表示
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Events Management */}
          <div className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-2xl p-5 sm:p-8 shadow-2xl border-4 border-kizuna-gold">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text flex items-center font-makinas-square">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 text-kizuna-gold" />
                イベント管理
              </h2>
              <Link
                href="/admin/events/new"
                className="bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 text-sm sm:text-base font-makinas-square"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規作成
              </Link>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {events.length === 0 ? (
                <div className="text-center py-8 bg-kizuna-dark/50 rounded-lg border-2 border-dashed border-kizuna-gold/30">
                  <Calendar className="w-12 h-12 mx-auto text-kizuna-gold mb-2" />
                  <p className="text-white">イベントがありません</p>
                  <p className="text-sm text-kizuna-beige mt-1">「新規作成」から追加できます</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="bg-kizuna-dark/50 rounded-lg p-4 border-2 border-kizuna-bronze/30">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-sm text-kizuna-beige mb-3">{new Date(event.date).toLocaleDateString("ja-JP")}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/events/edit/${event.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        編集
                      </Link>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        削除
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* News Management */}
          <div className="bg-kizuna-dark/80 rounded-2xl p-5 sm:p-8 shadow-xl border-4 border-kizuna-gold">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                お知らせ管理
              </h2>
              <Link
                href="/admin/news/new"
                className="bg-kizuna-gold hover:bg-kizuna-bronze text-kizuna-dark font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規作成
              </Link>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {news.length === 0 ? (
                <div className="text-center py-8 bg-kizuna-dark/50 rounded-lg border-2 border-dashed border-kizuna-gold/30">
                  <Bell className="w-12 h-12 mx-auto text-kizuna-gold mb-2" />
                  <p className="text-white">お知らせがありません</p>
                  <p className="text-sm text-kizuna-beige mt-1">「新規作成」から追加できます</p>
                </div>
              ) : (
                news.map((item) => (
                  <div key={item.id} className="bg-kizuna-dark/50 rounded-lg p-4 border-2 border-kizuna-bronze/30">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-kizuna-beige mb-3">
                      {new Date(item.published_date).toLocaleDateString("ja-JP")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/news/edit/${item.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        編集
                      </Link>
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        削除
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Jobs Management - 新規追加 */}
          <div className="bg-kizuna-dark/80 rounded-2xl p-5 sm:p-8 shadow-xl border-4 border-kizuna-gold">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                求人管理
              </h2>
              <Link
                href="/admin/jobs/new"
                className="bg-kizuna-gold hover:bg-kizuna-bronze text-kizuna-dark font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規作成
              </Link>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {jobs.length === 0 ? (
                <div className="text-center py-8 bg-kizuna-dark/50 rounded-lg border-2 border-dashed border-kizuna-gold/30">
                  <Briefcase className="w-12 h-12 mx-auto text-kizuna-gold mb-2" />
                  <p className="text-white">求人情報がありません</p>
                  <p className="text-sm text-kizuna-beige mt-1">「新規作成」から追加できます</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-kizuna-dark/50 rounded-lg p-4 border-2 border-kizuna-bronze/30">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{job.title}</h3>
                    <p className="text-sm text-kizuna-beige mb-1">{job.company}</p>
                    <p className="text-sm text-kizuna-beige mb-3">{job.location}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/jobs/edit/${job.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        編集
                      </Link>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex items-center transition-colors duration-300"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        削除
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/"
            className="text-kizuna-gold hover:text-kizuna-beige font-semibold transition-colors duration-300"
          >
            ホームページに戻る
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
