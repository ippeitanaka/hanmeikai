"use client"

import { Heart, Users, ArrowLeft, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import EnhancedVideoBackground from "@/components/enhanced-video-background"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 relative overflow-hidden">
      {/* Enhanced Background Video */}
      <EnhancedVideoBackground />

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
                      item.name === "絆命会について"
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
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
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
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
              <Image
                src="/images/new-kizuna-logo.png"
                alt="絆命会ロゴ"
                width={128}
                height={128}
                className="relative w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-emerald-800 mb-4 tracking-wide">絆命会について</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-white/95 via-stone-50/95 to-amber-50/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-emerald-700">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                <strong className="text-emerald-800 text-2xl">絆命会（はんめいかい）</strong>は、東洋医療専門学校
                救急救命士学科の卒業生によって組織された同窓会です。
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                在学中に培った"命をつなぐ"使命感と、仲間との"絆"を大切にしながら、世代を越えてつながり合える場を目指しています。
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                卒業後も、現場で活躍する仲間たちと情報交換を行ったり、後輩たちを支援する活動を通じて、救急救命士としての専門性や人間性をさらに高めることを目的としています。
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                研修会・交流会・学校行事への協力などを通じて、「救命の志」を共有する仲間との絆を深め、社会に貢献できる強いネットワークを築いていきましょう。
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-100/90 to-amber-100/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-emerald-300">
              <p className="text-lg leading-relaxed text-emerald-800 font-medium text-center">
                絆命会は、みなさん一人ひとりの参加と協力によって育っていく組織です。より良い会を共につくっていけるよう、ご理解とご協力をよろしくお願いいたします。
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="https://lin.ee/Y8DHYjk"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-600 hover:via-green-700 hover:to-green-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-green-300 backdrop-blur-sm"
          >
            <Users className="w-6 h-6 mr-3" />
            <span className="relative z-10">絆命会に参加する</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-green-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
