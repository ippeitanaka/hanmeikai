"use client"

import { useVideoAutoplay } from "@/hooks/use-video-autoplay"
import { useState, useEffect } from "react"

export default function AutoPlayVideoBackground() {
  const { videoRef, isPlaying, isLoaded, hasError, canAutoplay, videoExists } = useVideoAutoplay(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-06-05T07-21-40_generation-y3gH8123m4HNVdo1LbQqq6VwtPnFSJ.mp4",
  )
  const [showFallback, setShowFallback] = useState(false)

  // フォールバック表示のタイミングを制御
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoExists || !isLoaded || hasError || !isPlaying) {
        setShowFallback(true)
      }
    }, 2000) // 2秒後にフォールバックを表示

    if (videoExists && isLoaded && isPlaying) {
      setShowFallback(false)
    }

    return () => clearTimeout(timer)
  }, [videoExists, isLoaded, hasError, isPlaying])

  return (
    <>
      {/* Background Video with enhanced autoplay */}
      <div className="fixed inset-0 w-full h-full z-0">
        {videoExists && !hasError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            webkit-playsinline="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isLoaded && isPlaying ? "opacity-30" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.85) contrast(0.9)",
            }}
          >
            {/* ソースは動的に設定されるため、ここでは空にする */}
          </video>
        )}

        {/* フォールバック背景 */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            !videoExists || hasError || showFallback ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: "url('/images/japan-map-wave.png')",
            filter: "brightness(0.85) contrast(0.9)",
          }}
        ></div>

        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100/30 via-amber-50/20 to-stone-200/30"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-2 z-1">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #059669 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #d97706 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* 動画が見つからない場合の通知（開発時のみ） */}
      {!videoExists && process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 z-50 bg-yellow-600/90 text-white p-3 rounded-lg text-sm max-w-xs">
          <p className="mb-2">⚠️ 背景動画ファイルが見つかりません</p>
          <p className="text-xs">フォールバック背景画像を表示しています</p>
        </div>
      )}

      {/* 自動再生が無効な場合のユーザー向けメッセージ */}
      {videoExists && !canAutoplay && !isPlaying && isLoaded && !hasError && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs">
          <p className="mb-2">🎬 背景動画を再生するには画面をタップしてください</p>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(console.error)
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs transition-colors"
          >
            動画を再生
          </button>
        </div>
      )}

      {/* 再生状態インジケーター（開発時のみ） */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-500" : "bg-red-500"}`}></div>
            <span>{isPlaying ? "Playing" : "Paused"}</span>
          </div>
          <div>Video Exists: {videoExists ? "✓" : "✗"}</div>
          <div>Loaded: {isLoaded ? "✓" : "✗"}</div>
          <div>Error: {hasError ? "✓" : "✗"}</div>
          <div>Autoplay: {canAutoplay ? "✓" : "✗"}</div>
          <div>Fallback: {showFallback ? "✓" : "✗"}</div>
        </div>
      )}
    </>
  )
}
