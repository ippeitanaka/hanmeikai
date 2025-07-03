/**
 * 動画ファイルが存在するかどうかを確認する関数
 * @param url 確認する動画ファイルのURL
 * @returns Promise<boolean> 動画ファイルが存在する場合はtrue、存在しない場合はfalse
 */
export async function checkVideoExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error("Video file check failed:", error)
    return false
  }
}

/**
 * 動画の読み込みと自動再生を行う関数
 * @param url 読み込む動画ファイルのURL
 * @returns Promise<HTMLVideoElement | null> 読み込みが成功した場合は動画要素、失敗した場合はnull
 */
export function createAndPlayVideo(url: string): Promise<HTMLVideoElement | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.autoplay = true
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.preload = "auto"
    video.setAttribute("webkit-playsinline", "true")

    video.onloadeddata = async () => {
      try {
        await video.play()
        resolve(video)
      } catch (error) {
        console.error("Video autoplay failed:", error)
        resolve(video) // 動画要素は返すが、再生は手動で行う必要がある
      }
    }

    video.onerror = () => {
      console.error("Video loading failed")
      resolve(null)
    }

    video.src = url
  })
}

/**
 * ブラウザが自動再生をサポートしているかチェックする関数
 * @returns Promise<boolean> 自動再生がサポートされている場合はtrue
 */
export async function checkAutoplaySupport(): Promise<boolean> {
  try {
    const video = document.createElement("video")
    video.muted = true
    video.playsInline = true
    video.setAttribute("webkit-playsinline", "true")

    // 小さなダミー動画データを使用してテスト
    video.src =
      "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAAAr1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAA"

    await video.play()
    return true
  } catch (error) {
    return false
  }
}
