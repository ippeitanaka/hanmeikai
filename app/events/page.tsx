"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, ArrowLeft, Handshake, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase, type Event } from "@/lib/supabase"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Footer from "@/components/footer"
import VideoBackground from "@/components/video-background"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

      if (error) {
        console.error("Error fetching events:", error)
      } else {
        setEvents(data || [])
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
      <nav className="relative z-50 bg-gradient-to-r from-black via-kizuna-dark to-black shadow-2xl border-b-4 border-kizuna-gold">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Container - Rectangular Liner Style */}
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-32 h-20 bg-gradient-to-r from-kizuna-gold via-kizuna-light-gold to-kizuna-gold flex items-center justify-center shadow-2xl border-4 border-black transform group-hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden">
                  <Image
                    src="/images/kizuna-logo-transparent.png"
                    alt="絆命会ロゴ"
                    width={120}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-kizuna-gold rounded-lg blur-xl opacity-20 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text tracking-wider drop-shadow-lg font-makinas-square">絆命会</h1>
                <p className="text-kizuna-gold font-medium font-makinas-square">東洋医療専門学校 救急救命士学科 同窓会</p>
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
                    className="text-kizuna-gold hover:text-kizuna-light-gold font-semibold py-2 px-4 rounded-lg hover:bg-kizuna-dark/30 transition-all duration-300 border-b-2 border-transparent hover:border-kizuna-gold font-makinas-square"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-b-2 font-makinas-square ${
                      item.name === "イベント"
                        ? "text-kizuna-light-gold bg-kizuna-dark/30 border-kizuna-gold"
                        : "text-kizuna-gold hover:text-kizuna-light-gold hover:bg-kizuna-dark/30 border-transparent hover:border-kizuna-gold"
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
            className="inline-flex items-center text-kizuna-gold hover:text-kizuna-light-gold font-semibold transition-colors duration-300 font-makinas-square"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ホームに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 tracking-wide drop-shadow-md font-makinas-square">イベント</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-kizuna-light-gold drop-shadow-sm font-makinas-square">絆命会主催のイベント情報をお知らせします</p>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-kizuna-gold"></div>
            <p className="mt-4 text-gray-300 font-makinas-square">イベント情報を読み込んでいます...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-black/80 via-gray-900/80 to-kizuna-dark/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-kizuna-gold">
            <Calendar className="w-24 h-24 text-kizuna-gold mx-auto mb-6" />
            <p className="text-xl text-gray-300 font-makinas-square">現在、予定されているイベントはありません。</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-kizuna-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 font-makinas-square">{event.title}</h2>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed font-makinas-square">{event.description}</p>

                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                      <div className="flex items-center text-kizuna-light-gold">
                        <Calendar className="w-6 h-6 mr-3 text-kizuna-gold" />
                        <div>
                          <p className="font-semibold font-makinas-square">開催日</p>
                          <p className="text-lg font-makinas-square">{format(new Date(event.date), "yyyy年MM月dd日(E)", { locale: ja })}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-kizuna-light-gold">
                        <MapPin className="w-6 h-6 mr-3 text-kizuna-gold" />
                        <div>
                          <p className="font-semibold font-makinas-square">会場</p>
                          <p className="text-lg font-makinas-square">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-40 flex justify-center lg:justify-end mt-6 lg:mt-0">
                    <div className="bg-gradient-to-br from-kizuna-dark to-black text-kizuna-light-gold rounded-2xl p-6 text-center shadow-lg border border-kizuna-gold">
                      <Clock className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-semibold font-makinas-square">開催予定</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Link */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
