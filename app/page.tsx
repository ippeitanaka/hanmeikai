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
    <div className="min-h-screen bg-gradient-kizuna relative overflow-hidden font-makinas">
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
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text tracking-wider drop-shadow-sm font-makinas">絆命会</h1>
                <p className="text-kizuna-gold font-medium font-makinas text-sm">東洋医療専門学校 救急救命士学科 同窓会</p>
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
                    className={`text-kizuna-gold hover:text-kizuna-cream font-semibold py-2 px-4 rounded-lg hover:bg-kizuna-dark/20 transition-all duration-300 border-b-2 border-transparent hover:border-kizuna-gold font-makinas transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-b-2 font-makinas transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} ${
                      item.name === "ホーム"
                        ? "text-kizuna-cream bg-kizuna-dark/30 border-kizuna-gold"
                        : "text-kizuna-gold hover:text-kizuna-cream hover:bg-kizuna-dark/20 border-transparent hover:border-kizuna-gold"
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
              <div className="relative w-full max-w-4xl mx-auto h-80 lg:h-96">
                {/* Background Glow Effects */}
                <div className="absolute inset-0 bg-kizuna-gold/20 rounded-2xl blur-3xl animate-pulse" />
                <div className="absolute inset-4 bg-kizuna-beige/15 rounded-xl blur-2xl opacity-75" />
                
                {/* Logo Container - 横長のライナー状 */}
                <div className="relative w-full h-full transform hover:scale-105 transition-all duration-500">
                  <div className="w-full h-full bg-kizuna-dark/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-kizuna-beige/20 px-8">
                    <Image
                      src="/icon-512.png"
                      alt="絆命会ロゴ"
                      width={350}
                      height={350}
                      className="rounded-xl shadow-kizuna-lg object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-kizuna-gold/40 rounded-full animate-pulse"
                      style={{
                        top: `${20 + (i * 12)}%`,
                        left: `${5 + (i * 15)}%`,
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text leading-tight">
                <span className="text-gradient-kizuna font-makinas">絆命会</span>
              </h1>
              <p className="text-xl md:text-2xl text-kizuna-gold font-medium font-makinas">
                東洋医療専門学校 救急救命士学科 同窓会
              </p>
            </div>

            {/* Mission Statement */}
            <div className={`max-w-3xl mx-auto space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-lg md:text-xl text-kizuna-sage leading-relaxed font-makinas">
                大阪から全国へ、命を救う使命を胸に。<br />
                救急救命士として共に歩む仲間たちと、絆を深め、未来を創造する。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link 
                href="/about"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze text-kizuna-dark px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:from-kizuna-bronze hover:to-kizuna-gold transform hover:scale-105 shadow-kizuna"
              >
                <span className="font-makinas">絆命会について</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/events"
                className="group relative inline-flex items-center gap-2 bg-transparent text-kizuna-gold px-8 py-4 rounded-full font-semibold border-2 border-kizuna-gold transition-all duration-300 hover:bg-kizuna-gold hover:text-kizuna-dark transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-makinas">イベント情報</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-kizuna-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 font-makinas">
              私たちの活動
            </h2>
            <p className="text-lg text-kizuna-gold max-w-2xl mx-auto font-makinas">
              救急救命士として培った絆を大切に、様々な活動を通じて成長し続けています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "同窓会活動",
                description: "定期的な集会やイベントを通じて、卒業生同士の絆を深めています。",
                color: "bg-kizuna-dark"
              },
              {
                icon: Briefcase,
                title: "求人情報",
                description: "救急救命士として活躍できる職場の情報を共有し、キャリア支援を行います。",
                color: "bg-kizuna-charcoal"
              },
              {
                icon: Heart,
                title: "地域貢献",
                description: "地域の安全と健康を守るため、様々なボランティア活動に参加しています。",
                color: "bg-kizuna-sage"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`group glass-effect rounded-2xl p-8 transition-all duration-500 hover:shadow-kizuna-lg transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-kizuna-sand" />
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 font-makinas">
                    {feature.title}
                  </h3>
                  <p className="text-kizuna-gold leading-relaxed font-makinas">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "イベント情報", href: "/events", icon: Calendar, description: "最新のイベント情報" },
              { title: "お知らせ", href: "/news", icon: Newspaper, description: "重要なお知らせ" },
              { title: "求人情報", href: "/jobs", icon: Briefcase, description: "求人・転職情報" },
              { title: "お問い合わせ", href: "https://lin.ee/Y8DHYjk", icon: MessageCircle, description: "LINEでお気軽に" }
            ].map((link, index) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  className={`group glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-kizuna transform hover:scale-105 border border-kizuna-beige/20 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-kizuna-gold to-kizuna-bronze rounded-lg flex items-center justify-center group-hover:from-kizuna-bronze group-hover:to-kizuna-gold transition-colors">
                      <IconComponent className="w-6 h-6 text-kizuna-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text transition-colors font-makinas">
                        {link.title}
                      </h3>
                      <p className="text-sm text-kizuna-gold font-makinas">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}