"use client"

import { useEffect, useState } from "react"
import { Bell, ArrowLeft, Handshake, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase, type News } from "@/lib/supabase"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Footer from "@/components/footer"
import VideoBackground from "@/components/video-background"
import MainNav from "@/components/main-nav"

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
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black relative overflow-hidden font-makinas-square">
      {/* Background Video */}
      <VideoBackground />

      {/* Navigation */}
      <MainNav currentPage="お知らせ" />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-kizuna-gold hover:text-kizuna-light-gold font-semibold transition-colors duration-300 font-makinas-square"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ホームに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 tracking-wide drop-shadow-md font-makinas-square">お知らせ</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-kizuna-light-gold drop-shadow-sm font-makinas-square">絆命会からの重要なお知らせをお届けします</p>
        </div>

        {/* News List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-kizuna-gold"></div>
            <p className="mt-4 text-gray-300 font-makinas-square">お知らせを読み込んでいます...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-black/80 via-gray-900/80 to-kizuna-dark/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-kizuna-gold">
            <Bell className="w-24 h-24 text-kizuna-gold mx-auto mb-6" />
            <p className="text-xl text-gray-300 font-makinas-square">現在、お知らせはありません。</p>
          </div>
        ) : (
          <div className="space-y-8">
            {news.map((item, index) => (
              <article
                key={item.id}
                className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-kizuna-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-kizuna-dark to-black rounded-full flex items-center justify-center shadow-lg border-2 border-kizuna-gold">
                      <Bell className="w-8 h-8 text-kizuna-light-gold" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-kizuna-dark to-black text-kizuna-light-gold text-sm font-semibold px-3 py-1 rounded-full mr-4 border border-kizuna-gold font-makinas-square">
                        {format(new Date(item.published_date), "yyyy年MM月dd日", { locale: ja })}
                      </span>
                      {index === 0 && (
                        <span className="bg-gradient-to-r from-red-800 to-red-900 text-red-100 text-sm font-semibold px-3 py-1 rounded-full animate-pulse border border-red-400 font-makinas-square">
                          最新
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 font-makinas-square">{item.title}</h2>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line font-makinas-square">{item.content}</p>
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
