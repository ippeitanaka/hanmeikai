import Link from "next/link"
import Image from "next/image"
import { Heart, Handshake } from "lucide-react"

type NavItem = {
  name: string
  href: string
  isExternal: boolean
}

type MainNavProps = {
  currentPage: string
}

export default function MainNav({ currentPage }: MainNavProps) {
  const navItems: NavItem[] = [
    { name: "ホーム", href: "/", isExternal: false },
    { name: "絆命会について", href: "/about", isExternal: false },
    { name: "イベント", href: "/events", isExternal: false },
    { name: "お知らせ", href: "/news", isExternal: false },
    { name: "求人情報", href: "/jobs", isExternal: false },
    { name: "お問い合わせ", href: "https://lin.ee/Y8DHYjk", isExternal: true },
  ]

  return (
    <nav className="relative z-50 bg-gradient-to-r from-black via-kizuna-dark to-black shadow-2xl border-b-4 border-kizuna-gold font-makinas-square">
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

          <div className="hidden xl:flex space-x-6">
            {navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kizuna-gold hover:text-kizuna-light-gold font-medium text-sm py-2 px-3 rounded-lg hover:bg-kizuna-dark/30 transition-all duration-300 border-b-2 border-transparent hover:border-kizuna-gold font-makinas-square"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-sm py-2 px-3 rounded-lg transition-all duration-300 border-b-2 font-makinas-square ${
                    item.name === currentPage
                      ? "text-kizuna-light-gold bg-kizuna-dark/30 border-kizuna-gold"
                      : "text-kizuna-gold hover:text-kizuna-light-gold hover:bg-kizuna-dark/30 border-transparent hover:border-kizuna-gold"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* 中画面用の2行レイアウト */}
          <div className="hidden lg:block xl:hidden">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4">
                {navItems.slice(0, 3).map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kizuna-gold hover:text-kizuna-light-gold font-medium text-sm py-1 px-2 rounded hover:bg-kizuna-dark/30 transition-all duration-300 font-makinas-square"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium text-sm py-1 px-2 rounded transition-all duration-300 font-makinas-square ${
                        item.name === currentPage
                          ? "text-kizuna-light-gold bg-kizuna-dark/30"
                          : "text-kizuna-gold hover:text-kizuna-light-gold hover:bg-kizuna-dark/30"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </div>
              <div className="flex space-x-4">
                {navItems.slice(3).map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kizuna-gold hover:text-kizuna-light-gold font-medium text-sm py-1 px-2 rounded hover:bg-kizuna-dark/30 transition-all duration-300 font-makinas-square"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium text-sm py-1 px-2 rounded transition-all duration-300 font-makinas-square ${
                        item.name === currentPage
                          ? "text-kizuna-light-gold bg-kizuna-dark/30"
                          : "text-kizuna-gold hover:text-kizuna-light-gold hover:bg-kizuna-dark/30"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
