"use client"

import { Heart, Users, ArrowLeft, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import EnhancedVideoBackground from "@/components/enhanced-video-background"
import MainNav from "@/components/main-nav"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black relative overflow-hidden font-makinas-square">
      {/* Enhanced Background Video */}
      <EnhancedVideoBackground />

      {/* Navigation */}
      <MainNav currentPage="絆命会について" />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
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
          <div className="relative inline-block mb-8">
            <div className="w-40 h-24 mx-auto">
              <div className="absolute inset-0 bg-kizuna-gold/20 rounded-lg blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-kizuna-gold via-kizuna-light-gold to-kizuna-gold flex items-center justify-center shadow-2xl border-4 border-black rounded-lg overflow-hidden">
                <Image
                  src="/images/kizuna-logo-transparent.png"
                  alt="絆命会ロゴ"
                  width={152}
                  height={88}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-4 tracking-wide font-makinas-square">絆命会について</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-kizuna-gold">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-xl leading-relaxed text-kizuna-light-gold mb-6 font-makinas-square">
                <strong className="text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text text-2xl font-makinas-square">絆命会（はんめいかい）</strong>は、東洋医療専門学校
                救急救命士学科の卒業生によって組織された同窓会です。
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-makinas-square">
                在学中に培った"命をつなぐ"使命感と、仲間との"絆"を大切にしながら、世代を越えてつながり合える場を目指しています。
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-makinas-square">
                卒業後も、現場で活躍する仲間たちと情報交換を行ったり、後輩たちを支援する活動を通じて、救急救命士としての専門性や人間性をさらに高めることを目的としています。
              </p>
            </div>

            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-300 mb-6 font-makinas-square">
                研修会・交流会・学校行事への協力などを通じて、「救命の志」を共有する仲間との絆を深め、社会に貢献できる強いネットワークを築いていきましょう。
              </p>
            </div>

            <div className="bg-gradient-to-r from-kizuna-dark/90 to-black/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-kizuna-gold">
              <p className="text-lg leading-relaxed text-kizuna-light-gold font-medium text-center font-makinas-square">
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
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-kizuna-dark via-black to-kizuna-dark hover:from-black hover:via-kizuna-dark hover:to-black text-kizuna-light-gold font-bold py-4 px-12 rounded-full text-xl shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-kizuna-gold backdrop-blur-sm font-makinas-square"
          >
            <Users className="w-6 h-6 mr-3" />
            <span className="relative z-10">絆命会に参加する</span>
            <div className="absolute inset-0 bg-gradient-to-r from-kizuna-gold/20 to-kizuna-bronze/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
