"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export default function EnhancedVideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        // 動画を最初から再生
        videoRef.current.currentTime = 0
        await videoRef.current.play()
        setIsPlaying(true)
        console.log("Video started playing successfully")
      } catch (error) {
        console.error("Error starting video:", error)
        // 自動再生が失敗した場合、ユーザーインタラクション後に再試行
        const handleUserInteraction = async () => {
          try {
            if (videoRef.current) {
              await videoRef.current.play()
              setIsPlaying(true)
              document.removeEventListener("click", handleUserInteraction)
              document.removeEventListener("touchstart", handleUserInteraction)
            }
          } catch (retryError) {
            console.error("Retry video play failed:", retryError)
          }
        }

        document.addEventListener("click", handleUserInteraction, { once: true })
        document.addEventListener("touchstart", handleUserInteraction, { once: true })
      }
    }
  }, [])

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
    // 動画が読み込まれたら再生を開始
    setTimeout(() => {
      startVideo()
    }, 100)
  }, [startVideo])

  const handleVideoError = useCallback(() => {
    console.error("Video failed to load")
    setVideoError(true)
  }, [])

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // 動画の読み込み完了を監視
    video.addEventListener("loadeddata", handleVideoLoad)
    video.addEventListener("canplay", handleVideoLoad)
    video.addEventListener("error", handleVideoError)
    video.addEventListener("play", handleVideoPlay)
    video.addEventListener("pause", handleVideoPause)

    // 動画を強制的に読み込み
    video.load()

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleVideoLoad)
        video.removeEventListener("canplay", handleVideoLoad)
        video.removeEventListener("error", handleVideoError)
        video.removeEventListener("play", handleVideoPlay)
        video.removeEventListener("pause", handleVideoPause)
        video.pause()
        video.src = ""
      }
    }
  }, [handleVideoLoad, handleVideoError, handleVideoPlay, handleVideoPause])

  // 定期的に動画の再生状態をチェック
  useEffect(() => {
    const checkVideoStatus = () => {
      if (videoRef.current && videoLoaded && !videoError) {
        if (videoRef.current.paused && !isPlaying) {
          console.log("Video is paused, attempting to restart...")
          startVideo()
        }
      }
    }

    const interval = setInterval(checkVideoStatus, 5000) // 5秒ごとにチェック

    return () => clearInterval(interval)
  }, [videoLoaded, videoError, isPlaying, startVideo])

  return (
    <>
      {/* Background Video with improved autoplay */}
      <div className="fixed inset-0 w-full h-full z-0">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded && isPlaying ? "opacity-30" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.85) contrast(0.9)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-06-05T07-21-40_generation-y3gH8123m4HNVdo1LbQqq6VwtPnFSJ.mp4" type="video/mp4" />
            <source src="/videos/background-animation.webm" type="video/webm" />
          </video>
        )}

        {/* フォールバック背景（動画が読み込めない場合または再生されない場合） */}
        {(videoError || (!isPlaying && videoLoaded)) && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000"
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

      {/* デバッグ情報（開発時のみ表示） */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          <div>Video Loaded: {videoLoaded ? "✓" : "✗"}</div>
          <div>Video Playing: {isPlaying ? "✓" : "✗"}</div>
          <div>Video Error: {videoError ? "✓" : "✗"}</div>
        </div>
      )}
    </>
  )
}
