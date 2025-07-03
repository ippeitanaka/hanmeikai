"use client"

import { useEffect, useState } from "react"
import { Bell, ArrowLeft, Handshake, Heart } from "lucide-react"
import Link from "next/link"
import { supabase, type News } from "@/lib/supabase"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Footer from "@/components/footer"
import VideoBackground from "@/components/video-background"

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*").order("published_date", { ascending: false })

      if (error) {
        console.error("Error fetching news:", error)
      } else {
        setNews(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 relative overflow-hidden">
      {/* Background Video */}
      <VideoBackground />

      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-900 transform group-hover:scale-110 transition-all duration-300">
                  <div className="relative">
                    <Handshake className="w-10 h-10 text-emerald-900" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-30 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-100 tracking-wider drop-shadow-lg">絆命会</h1>
                <p className="text-emerald-200 font-medium">東洋医療専門学校 救急救命士学科 同窓会</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-8">
              {[
                { name: "ホーム", href: "/", isExternal: false },
                { name: "絆命会について", href: "/about", isExternal: false },
                { name: "イベント", href: "/events", isExternal: false },
                { name: "お知らせ", href: "/news", isExternal: false },
                { name: "お問い合わせ", href: "https://lin.ee/Y8DHYjk", isExternal: true },
              ].map((item) =>
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-100 hover:text-amber-300 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600/30 transition-all duration-300 border-b-2 border-transparent hover:border-amber-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-b-2 ${
                      item.name === "お知らせ"
                        ? "text-amber-300 bg-emerald-600/30 border-amber-300"
                        : "text-amber-100 hover:text-amber-300 hover:bg-emerald-600/30 border-transparent hover:border-amber-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ホームに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-800 mb-4 tracking-wide drop-shadow-md">お知らせ</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-700 drop-shadow-sm">絆命会からの重要なお知らせをお届けします</p>
        </div>

        {/* News List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">お知らせを読み込んでいます...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <Bell className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600">現在、お知らせはありません。</p>
          </div>
        ) : (
          <div className="space-y-8">
            {news.map((item, index) => (
              <article
                key={item.id}
                className="bg-gradient-to-br from-white/90 via-stone-50/90 to-amber-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-emerald-700 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bell className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full mr-4">
                        {format(new Date(item.published_date), "yyyy年MM月dd日", { locale: ja })}
                      </span>
                      {index === 0 && (
                        <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                          最新
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-emerald-800 mb-4">{item.title}</h2>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
