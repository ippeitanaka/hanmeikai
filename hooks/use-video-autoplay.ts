"use client"

import { useEffect, useState, useRef, useCallback } from "react"

export function useVideoAutoplay(videoSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [canAutoplay, setCanAutoplay] = useState(false)
  const [videoExists, setVideoExists] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 3
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // 動画ファイルの存在確認
  const checkVideoExists = useCallback(async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" })
      return response.ok
    } catch (error) {
      console.error("Video file check failed:", error)
      return false
    }
  }, [])

  // 自動再生可能性をテスト
  const testAutoplay = useCallback(async () => {
    try {
      const testVideo = document.createElement("video")
      testVideo.muted = true
      testVideo.playsInline = true
      testVideo.autoplay = true

      // 小さなテスト用動画データ
      const testVideoData =
        "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAAAr1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAA"

      testVideo.src = testVideoData
      await testVideo.play()
      setCanAutoplay(true)
      console.log("Autoplay is supported")
    } catch (error) {
      setCanAutoplay(false)
      console.log("Autoplay is not supported")
    }
  }, [])

  const attemptPlay = useCallback(async () => {
    if (!videoRef.current || playPromiseRef.current || !videoExists) return

    try {
      const video = videoRef.current

      // 動画の準備ができているかチェック
      if (video.readyState < 2) {
        console.log("Video not ready, waiting...")
        return
      }

      // 既に再生中の場合はスキップ
      if (!video.paused) {
        setIsPlaying(true)
        return
      }

      video.currentTime = 0
      playPromiseRef.current = video.play()
      await playPromiseRef.current

      setIsPlaying(true)
      retryCountRef.current = 0
      console.log("Video playing successfully")
    } catch (error) {
      console.error("Video play attempt failed:", error)

      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++
        console.log(`Retrying video play (${retryCountRef.current}/${maxRetries})`)
        setTimeout(attemptPlay, 1000 + retryCountRef.current * 500)
      } else {
        console.log("Max retries reached, setting up user interaction listener")
        setupUserInteractionListener()
      }
    } finally {
      playPromiseRef.current = null
    }
  }, [videoExists])

  const setupUserInteractionListener = useCallback(() => {
    const handleUserInteraction = async () => {
      if (videoRef.current && !isPlaying && videoExists) {
        try {
          await videoRef.current.play()
          setIsPlaying(true)
          console.log("Video started after user interaction")
        } catch (error) {
          console.error("User interaction video play failed:", error)
        }
      }

      // イベントリスナーを削除
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      document.removeEventListener("scroll", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction, { once: true, passive: true })
    document.addEventListener("touchstart", handleUserInteraction, { once: true, passive: true })
    document.addEventListener("keydown", handleUserInteraction, { once: true, passive: true })
    document.addEventListener("scroll", handleUserInteraction, { once: true, passive: true })
  }, [isPlaying, videoExists])

  const handleVideoLoad = useCallback(() => {
    console.log("Video loaded successfully")
    setIsLoaded(true)
    setHasError(false)

    // 少し遅延を入れて再生を試行
    setTimeout(() => {
      if (canAutoplay && videoExists) {
        attemptPlay()
      } else if (videoExists) {
        setupUserInteractionListener()
      }
    }, 200)
  }, [attemptPlay, canAutoplay, videoExists, setupUserInteractionListener])

  const handleVideoError = useCallback((e: Event) => {
    const video = e.target as HTMLVideoElement
    const error = video.error

    if (error) {
      console.error("Video error:", {
        code: error.code,
        message: error.message,
        MEDIA_ERR_ABORTED: error.MEDIA_ERR_ABORTED,
        MEDIA_ERR_NETWORK: error.MEDIA_ERR_NETWORK,
        MEDIA_ERR_DECODE: error.MEDIA_ERR_DECODE,
        MEDIA_ERR_SRC_NOT_SUPPORTED: error.MEDIA_ERR_SRC_NOT_SUPPORTED,
      })
    }

    setHasError(true)
    setIsLoaded(false)
    setVideoExists(false)
  }, [])

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true)
    console.log("Video play event fired")
  }, [])

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false)
    console.log("Video pause event fired")

    // 意図しない一時停止の場合は再生を試行（少し遅延を入れる）
    if (isLoaded && !hasError && videoRef.current && videoExists) {
      setTimeout(() => {
        if (videoRef.current && videoRef.current.paused && !hasError) {
          console.log("Attempting to restart paused video")
          attemptPlay()
        }
      }, 1000)
    }
  }, [isLoaded, hasError, attemptPlay, videoExists])

  const handleCanPlay = useCallback(() => {
    console.log("Video can play")
    if (!isPlaying && canAutoplay && videoExists) {
      attemptPlay()
    }
  }, [isPlaying, canAutoplay, attemptPlay, videoExists])

  // 初期化時に動画ファイルの存在確認
  useEffect(() => {
    const initializeVideo = async () => {
      console.log("Checking if video exists:", videoSrc)
      const exists = await checkVideoExists(videoSrc)
      setVideoExists(exists)

      if (!exists) {
        console.warn("Video file not found:", videoSrc)
        setHasError(true)
        return
      }

      console.log("Video file exists, proceeding with autoplay test")
      await testAutoplay()
    }

    initializeVideo()
  }, [videoSrc, checkVideoExists, testAutoplay])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoExists) return

    // イベントリスナーを追加
    video.addEventListener("loadeddata", handleVideoLoad)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("canplaythrough", handleVideoLoad)
    video.addEventListener("error", handleVideoError)
    video.addEventListener("play", handleVideoPlay)
    video.addEventListener("pause", handleVideoPause)

    // 動画ソースを設定して読み込み
    if (videoExists) {
      video.src = videoSrc
      video.load()
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleVideoLoad)
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("canplaythrough", handleVideoLoad)
        video.removeEventListener("error", handleVideoError)
        video.removeEventListener("play", handleVideoPlay)
        video.removeEventListener("pause", handleVideoPause)

        // 再生を停止してソースをクリア
        if (!video.paused) {
          video.pause()
        }
        video.removeAttribute("src")
        video.load()
      }
    }
  }, [videoSrc, videoExists, handleVideoLoad, handleCanPlay, handleVideoError, handleVideoPlay, handleVideoPause])

  // 定期的な再生状態チェック（動画が存在する場合のみ）
  useEffect(() => {
    if (!isLoaded || hasError || !videoExists) return

    const checkInterval = setInterval(() => {
      if (videoRef.current && videoRef.current.paused && !isPlaying && !playPromiseRef.current) {
        console.log("Video unexpectedly paused, attempting restart")
        attemptPlay()
      }
    }, 5000)

    return () => clearInterval(checkInterval)
  }, [isLoaded, hasError, isPlaying, attemptPlay, videoExists])

  // ページの可視性変更を監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        return
      } else {
        if (videoRef.current && videoRef.current.paused && isLoaded && !hasError && videoExists) {
          setTimeout(attemptPlay, 500)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [attemptPlay, isLoaded, hasError, videoExists])

  return {
    videoRef,
    isPlaying,
    isLoaded,
    hasError,
    canAutoplay,
    videoExists,
    attemptPlay,
  }
}
