import { Heart, Handshake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-kizuna-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--kizuna-beige) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--kizuna-gold) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
            <div className="relative group">
              <div className="w-16 h-16 bg-kizuna-beige/20 rounded-full flex items-center justify-center shadow-kizuna border-2 border-kizuna-beige/30 transform group-hover:scale-110 transition-all duration-300">
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
            <div>
              <h3 className="text-xl font-bold text-kizuna-sand tracking-wider font-makinas">絆命会</h3>
              <p className="text-kizuna-beige text-sm font-makinas">東洋医療専門学校 救急救命士学科 同窓会</p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="text-center md:text-right space-y-4">
            <Link
              href="/admin/login"
              className="text-kizuna-beige font-medium text-lg tracking-wide hover:text-kizuna-sand transition-colors duration-300 font-makinas"
            >
              © 2003 Hanmeikai. All rights reserved.
            </Link>
            <div className="w-32 h-0.5 bg-gradient-to-r from-kizuna-gold to-kizuna-beige mx-auto md:ml-auto md:mr-0 rounded-full"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-kizuna-gold/60 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${1.5 + (i * 0.1)}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}