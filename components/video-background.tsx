"use client"

import { useEffect, useState, useRef } from "react"

export default function VideoBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const retryCount = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      console.log("Video loaded")
      setIsLoaded(true)
      setHasError(false)

      // 自動再生を試行
      const playVideo = async () => {
        try {
          await video.play()
          setIsPlaying(true)
          console.log("Video started playing")
        } catch (error) {
          console.log("Autoplay failed, waiting for user interaction")

          // ユーザーインタラクションを待つ
          const handleInteraction = async () => {
            try {
              await video.play()
              setIsPlaying(true)
              console.log("Video started after user interaction")
            } catch (e) {
              console.error("Failed to play video after interaction:", e)
            }

            // イベントリスナーを削除
            document.removeEventListener("click", handleInteraction)
            document.removeEventListener("touchstart", handleInteraction)
            document.removeEventListener("keydown", handleInteraction)
          }

          document.addEventListener("click", handleInteraction, { once: true })
          document.addEventListener("touchstart", handleInteraction, { once: true })
          document.addEventListener("keydown", handleInteraction, { once: true })
        }
      }

      // 少し遅延してから再生を試行
      setTimeout(playVideo, 100)
    }

    const handleError = () => {
      console.error("Video failed to load")
      setHasError(true)
      setIsLoaded(false)

      // リトライ機能
      if (retryCount.current < 2) {
        retryCount.current++
        console.log(`Retrying video load (${retryCount.current}/2)`)
        setTimeout(() => {
          video.load()
        }, 2000)
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    // イベントリスナーを追加
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplaythrough", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    // 動画を読み込み
    video.load()

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplaythrough", handleLoadedData)
      video.removeEventListener("error", handleError)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        {!hasError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isLoaded && isPlaying ? "opacity-30" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.85) contrast(0.9)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-06-05T07-21-40_generation-y3gH8123m4HNVdo1LbQqq6VwtPnFSJ.mp4" type="video/mp4" />
            <source src="/videos/background-animation.webm" type="video/webm" />
          </video>
        )}

        {/* フォールバック背景 */}
        {(hasError || (!isPlaying && isLoaded)) && (
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              hasError || (!isPlaying && isLoaded) ? "opacity-30" : "opacity-0"
            }`}
            style={{
              backgroundImage: "url('/images/japan-map-wave.png')",
              filter: "brightness(0.85) contrast(0.9)",
            }}
          ></div>
        )}

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

      {/* 開発時のデバッグ情報 */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          <div>Loaded: {isLoaded ? "✓" : "✗"}</div>
          <div>Playing: {isPlaying ? "✓" : "✗"}</div>
          <div>Error: {hasError ? "✓" : "✗"}</div>
          <div>Retries: {retryCount.current}</div>
        </div>
      )}
    </>
  )
}
