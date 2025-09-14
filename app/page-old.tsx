"use client"

import { useEffect, useState } from "react"
import { Heart, Users, MapPin, Handshake, Flame, MessageCircle, Calendar, Briefcase, Newspaper, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import AutoPlayVideoBackground from "@/components/auto-play-video-background"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-kizuna relative overflow-hidden font-kiniro">
      {/* Enhanced Background Video */}
      <AutoPlayVideoBackground />

      {/* Navigation */}
      <nav className="relative z-50 glass-effect border-b border-kizuna-beige/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="relative group">
                <div className="w-16 h-16 bg-kizuna-dark rounded-full flex items-center justify-center shadow-kizuna border-2 border-kizuna-beige/20 transform group-hover:scale-110 transition-all duration-300">
                  <Image 
                    src="/icon-192.png" 
                    alt="絆命会ロゴ" 
                    width={40} 
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="absolute inset-0 bg-kizuna-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className={`transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                <h1 className="text-2xl font-bold text-kizuna-dark tracking-wider drop-shadow-sm font-kiniro">絆命会</h1>
                <p className="text-kizuna-sage font-medium font-kiniro text-sm">東洋医療専門学校 救急救命士学科 同窓会</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-8">
              {[
                { name: "ホーム", href: "/", isExternal: false },
                { name: "絆命会について", href: "/about", isExternal: false },
                { name: "求人情報", href: "/jobs", isExternal: false },
                { name: "イベント", href: "/events", isExternal: false },
                { name: "お知らせ", href: "/news", isExternal: false },
                { name: "お問い合わせ", href: "https://lin.ee/Y8DHYjk", isExternal: true },
              ].map((item, index) =>
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-kizuna-dark hover:text-kizuna-charcoal font-semibold py-2 px-4 rounded-lg hover:bg-kizuna-beige/20 transition-all duration-300 border-b-2 border-transparent hover:border-kizuna-gold font-kiniro transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-b-2 font-kiniro transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} ${
                      item.name === "ホーム"
                        ? "text-kizuna-dark bg-kizuna-beige/30 border-kizuna-gold"
                        : "text-kizuna-dark hover:text-kizuna-charcoal hover:bg-kizuna-beige/20 border-transparent hover:border-kizuna-gold"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Main Hero Content */}
          <div className="text-center space-y-8">
            {/* Logo Section */}
            <div className={`relative inline-block transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                {/* Background Glow Effects */}
                <div className="absolute inset-0 bg-kizuna-gold/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-4 bg-kizuna-beige/15 rounded-full blur-2xl opacity-75" />
                
                {/* Logo Container */}
                <div className="relative w-full h-full transform hover:scale-105 transition-all duration-500">
                  <div className="w-full h-full bg-kizuna-dark/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-kizuna-beige/20">
                    <Image
                      src="/icon-512.png"
                      alt="絆命会ロゴ"
                      width={280}
                      height={280}
                      className="rounded-full shadow-kizuna-lg"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-kizuna-gold/40 rounded-full animate-pulse"
                      style={{
                        top: `${20 + (i * 10)}%`,
                        left: `${10 + (i * 10)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + (i * 0.2)}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className={`space-y-4 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-kizuna-dark leading-tight">
                <span className="text-gradient-kizuna font-kiniro">絆命会</span>
              </h1>
              <p className="text-xl md:text-2xl text-kizuna-charcoal font-medium font-kiniro">
                東洋医療専門学校 救急救命士学科 同窓会
              </p>
            </div>

            {/* Mission Statement */}
            <div className={`max-w-3xl mx-auto space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-lg md:text-xl text-kizuna-sage leading-relaxed font-kiniro">
                大阪から全国へ、命を救う使命を胸に。<br />
                救急救命士として共に歩む仲間たちと、絆を深め、未来を創造する。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link 
                href="/about"
                className="group relative inline-flex items-center gap-2 bg-kizuna-dark text-kizuna-sand px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-kizuna-charcoal transform hover:scale-105 shadow-kizuna"
              >
                <span className="font-kiniro">絆命会について</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/events"
                className="group relative inline-flex items-center gap-2 bg-transparent text-kizuna-dark px-8 py-4 rounded-full font-semibold border-2 border-kizuna-dark transition-all duration-300 hover:bg-kizuna-dark hover:text-kizuna-sand transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-kiniro">イベント情報</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
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
