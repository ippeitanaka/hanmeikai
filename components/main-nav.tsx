import Link from "next/link"
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

          <div className="hidden xl:flex space-x-6">
            {navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-amber-300 font-medium text-sm py-2 px-3 rounded-lg hover:bg-emerald-600/30 transition-all duration-300 border-b-2 border-transparent hover:border-amber-300"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-sm py-2 px-3 rounded-lg transition-all duration-300 border-b-2 ${
                    item.name === currentPage
                      ? "text-amber-300 bg-emerald-600/30 border-amber-300"
                      : "text-amber-100 hover:text-amber-300 hover:bg-emerald-600/30 border-transparent hover:border-amber-300"
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
                      className="text-amber-100 hover:text-amber-300 font-medium text-sm py-1 px-2 rounded hover:bg-emerald-600/30 transition-all duration-300"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium text-sm py-1 px-2 rounded transition-all duration-300 ${
                        item.name === currentPage
                          ? "text-amber-300 bg-emerald-600/30"
                          : "text-amber-100 hover:text-amber-300 hover:bg-emerald-600/30"
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
                      className="text-amber-100 hover:text-amber-300 font-medium text-sm py-1 px-2 rounded hover:bg-emerald-600/30 transition-all duration-300"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium text-sm py-1 px-2 rounded transition-all duration-300 ${
                        item.name === currentPage
                          ? "text-amber-300 bg-emerald-600/30"
                          : "text-amber-100 hover:text-amber-300 hover:bg-emerald-600/30"
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
