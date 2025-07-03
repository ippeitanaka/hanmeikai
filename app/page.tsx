"use client"

import { useEffect, useState } from "react"
import { Heart, Users, MapPin, Handshake, Flame, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import AutoPlayVideoBackground from "@/components/auto-play-video-background"

export default function HomePage() {
  const [pulseAnimation, setPulseAnimation] = useState(0)

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 1) % 100)
    }, 50)

    return () => {
      clearInterval(pulseInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 relative overflow-hidden font-kiniro">
      {/* Enhanced Background Video */}
      <AutoPlayVideoBackground />

      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl border-b-4 border-amber-400">
        {/* 既存のナビゲーションコード */}
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
                <h1 className="text-3xl font-bold text-amber-100 tracking-wider drop-shadow-lg font-kiniro">絆命会</h1>
                <p className="text-emerald-200 font-medium font-kiniro">東洋医療専門学校 救急救命士学科 同窓会</p>
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
                    className="text-amber-100 hover:text-amber-300 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600/30 transition-all duration-300 border-b-2 border-transparent hover:border-amber-300 font-kiniro"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-b-2 font-kiniro ${
                      item.name === "ホーム"
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

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Logo */}
        <div className="text-center mb-16">
          <div className="relative inline-block group">
            {/* Logo Container with Animation - Responsive sizing */}
            <div className="relative w-full h-auto mx-auto">
              {/* PC版のロゴ (大きいサイズ) - 中〜大画面でのみ表示 */}
              <div className="hidden md:block relative w-[1000px] h-[600px] mx-auto max-w-full">
                {/* Subtle Glow Effects */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div
                  className="absolute inset-0 bg-amber-400/15 rounded-full blur-2xl opacity-25 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                {/* Rotating Border - Very subtle */}
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-700/15 opacity-20 animate-spin-slow" />
                <div className="absolute inset-8 rounded-full border border-dotted border-amber-500/15 opacity-15 animate-spin-reverse" />

                {/* Main Logo Image - PC版 */}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-all duration-700">
                  <Image
                    src="/images/kizuna-logo-transparent.png"
                    alt="絆命会 - 大阪から全国へ、命を救う使命を胸に"
                    width={1000}
                    height={600}
                    className="relative w-full h-full object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Enhanced Decorative particles - More spread out */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400/60 rounded-full shadow-lg"
                    style={{
                      top: `${8 + Math.sin(((pulseAnimation + i * 18) * Math.PI) / 180) * 42}%`,
                      left: `${50 + Math.cos(((pulseAnimation + i * 18) * Math.PI) / 180) * 50}%`,
                      opacity: 0.4 + Math.sin(((pulseAnimation + i * 15) * Math.PI) / 180) * 0.3,
                      animation: `float ${2 + i * 0.08}s infinite alternate`,
                    }}
                  />
                ))}

                {/* Additional outer particles */}
                {[...Array(16)].map((_, i) => (
                  <div
                    key={`outer-${i}`}
                    className="absolute w-1.5 h-1.5 bg-amber-400/50 rounded-full shadow-md"
                    style={{
                      top: `${3 + Math.sin(((pulseAnimation * 0.6 + i * 22.5) * Math.PI) / 180) * 47}%`,
                      left: `${50 + Math.cos(((pulseAnimation * 0.6 + i * 22.5) * Math.PI) / 180) * 54}%`,
                      opacity: 0.3 + Math.sin(((pulseAnimation * 0.6 + i * 20) * Math.PI) / 180) * 0.3,
                      animation: `float ${3 + i * 0.12}s infinite alternate`,
                    }}
                  />
                ))}
              </div>

              {/* スマホ版のロゴ (小さいサイズ) - 小画面でのみ表示 */}
              <div className="md:hidden relative w-full h-auto mx-auto px-4">
                {/* Subtle Glow Effects - スマホ版 */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl opacity-30 animate-pulse" />

                {/* Main Logo Image - スマホ版 */}
                <div className="relative transform group-hover:scale-105 transition-all duration-700">
                  <Image
                    src="/images/kizuna-logo-transparent.png"
                    alt="絆命会 - 大阪から全国へ、命を救う使命を胸に"
                    width={400}
                    height={240}
                    className="relative w-full h-auto object-contain drop-shadow-xl mx-auto"
                    priority
                  />
                </div>

                {/* スマホ版のパーティクル (少なめ) */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`mobile-${i}`}
                    className="absolute w-1.5 h-1.5 bg-emerald-400/60 rounded-full shadow-sm"
                    style={{
                      top: `${10 + Math.sin(((pulseAnimation + i * 45) * Math.PI) / 180) * 40}%`,
                      left: `${50 + Math.cos(((pulseAnimation + i * 45) * Math.PI) / 180) * 45}%`,
                      opacity: 0.4 + Math.sin(((pulseAnimation + i * 25) * Math.PI) / 180) * 0.3,
                      animation: `float ${1.5 + i * 0.1}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: Users,
              number: "2462名",
              label: "卒業生",
              desc: "全国で活躍中",
              bgClass: "bg-gradient-to-br from-emerald-400 to-emerald-600",
            },
            {
              icon: MapPin,
              number: "42",
              label: "都道府県",
              desc: "で活躍中",
              bgClass: "bg-gradient-to-br from-amber-400 to-amber-600",
            },
            {
              icon: Flame,
              number: "1523名",
              label: "消防職員",
              desc: "として活躍中",
              bgClass: "bg-gradient-to-br from-red-400 to-red-600",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-gradient-to-br from-white/90 via-stone-50/90 to-amber-50/90 backdrop-blur-sm rounded-2xl p-8 text-center border-4 border-emerald-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-amber-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 ${stat.bgClass} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-emerald-800 mb-2 font-kiniro">{stat.number}</h3>
                <p className="text-xl font-semibold text-emerald-700 mb-1 font-kiniro">{stat.label}</p>
                <p className="text-emerald-600 font-kiniro">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <a
            href="https://lin.ee/Y8DHYjk"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-600 hover:via-green-700 hover:to-green-600 text-white font-bold py-6 px-16 rounded-full text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-green-300 backdrop-blur-sm font-kiniro"
          >
            <MessageCircle className="w-8 h-8 mr-4" />
            <span className="relative z-10">絆命会公式LINE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-green-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.7; }
          100% { transform: translateY(-12px) scale(1.2); opacity: 1; }
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  )
}
