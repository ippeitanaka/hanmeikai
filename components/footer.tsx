import { Heart, Handshake } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 border-t-4 border-amber-400">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #059669 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #d97706 2px, transparent 2px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-900 transform group-hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <Handshake className="w-6 h-6 text-emerald-900" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-30 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-100 tracking-wider">絆命会</h3>
              <p className="text-emerald-200 text-sm">東洋医療専門学校 救急救命士学科 同窓会</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <Link
              href="/admin/login"
              className="text-amber-100 font-medium text-lg tracking-wide hover:text-amber-200 transition-colors duration-300 cursor-default"
            >
              © 2003 Hanmeikai. All rights reserved.
            </Link>
            <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-400 mx-auto md:ml-auto md:mr-0 mt-2 rounded-full"></div>

            {/* 求人情報メニューを追加 */}
            <div className="mt-4">
              <Link
                href="/jobs"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-emerald-900 font-semibold rounded-lg shadow-lg hover:from-amber-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 border-2 border-emerald-900"
              >
                <span className="mr-2">🔒</span>
                求人情報
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
