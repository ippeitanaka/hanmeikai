import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getSeoConfig } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "絆命会 | 東洋医療専門学校 救急救命士学科 同窓会",
  description:
    "東洋医療専門学校 救急救命士学科の卒業生による同窓会「絆命会」の公式ホームページです。イベント情報、お知らせ、求人情報などをお届けします。",
  keywords: "絆命会,東洋医療専門学校,救急救命士,同窓会,大阪,消防,救急,医療",
  authors: [{ name: "絆命会" }],
  creator: "絆命会",
  publisher: "絆命会",
  robots: "index, follow",
  openGraph: {
    title: "絆命会 | 東洋医療専門学校 救急救命士学科 同窓会",
    description: "東洋医療専門学校 救急救命士学科の卒業生による同窓会「絆命会」の公式ホームページ",
    url: "https://kizunakai.com",
    siteName: "絆命会",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "絆命会ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "絆命会 | 東洋医療専門学校 救急救命士学科 同窓会",
    description: "東洋医療専門学校 救急救命士学科の卒業生による同窓会「絆命会」の公式ホームページ",
    images: ["/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code", // 必要に応じて設定
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const seo = getSeoConfig("default")
  return (
    <html lang="ja">
      <head>
        {/* 追加のファビコン設定 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA対応 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="絆命会" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />

        {/* 検索エンジン最適化 */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://kizunakai.com" />
        {/* Google Site Verification */}
        {seo.googleSiteVerification && (
          <meta name="google-site-verification" content={seo.googleSiteVerification} />
        )}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
