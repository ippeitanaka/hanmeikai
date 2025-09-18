"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, ArrowLeft, Save, Handshake, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import VideoBackground from "@/components/video-background"
import MainNav from "@/components/main-nav"

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publishedDate, setPublishedDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const [newsId, setNewsId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setNewsId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (newsId) {
      fetchNews()
    }
  }, [newsId])

  const fetchNews = async () => {
    if (!newsId) return

    try {
      const { data, error } = await supabase.from("news").select("*").eq("id", newsId).single()

      if (error) {
        console.error("Error fetching news:", error)
        setError("お知らせの取得に失敗しました。")
      } else if (data) {
        setTitle(data.title || "")
        setContent(data.content || "")
        setPublishedDate(data.published_date || "")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("エラーが発生しました。")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsId) return

    setLoading(true)
    setError("")

    try {
      const { error } = await supabase
        .from("news")
        .update({
          title: title.trim(),
          content: content.trim(),
          published_date: publishedDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newsId)

      if (error) {
        console.error("Update error:", error)
        setError(`お知らせの更新に失敗しました: ${error.message}`)
      } else {
        alert("お知らせを更新しました。")
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!newsId) return

    if (confirm("このお知らせを削除しますか？この操作は取り消せません。")) {
      try {
        const { error } = await supabase.from("news").delete().eq("id", newsId)

        if (error) {
          console.error("Delete error:", error)
          setError(`お知らせの削除に失敗しました: ${error.message}`)
        } else {
          alert("お知らせを削除しました。")
          router.push("/admin/dashboard")
        }
      } catch (error) {
        console.error("Error:", error)
        setError("エラーが発生しました。")
      }
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kizuna-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black relative overflow-hidden font-makinas-square">
      {/* Background Video */}
      <VideoBackground />

      {/* Navigation */}
      <MainNav currentPage="お知らせ管理" />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-kizuna-gold hover:text-kizuna-light-gold font-semibold transition-colors duration-300 font-makinas-square"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-2 tracking-wide drop-shadow-md font-makinas-square">お知らせ編集</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze mx-auto rounded-full mb-4"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-kizuna-gold">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-kizuna-gold mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300"
                placeholder="例: 絆命会公式LINEアカウント開設のお知らせ"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-kizuna-gold mb-2">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300 resize-none"
                placeholder="お知らせの内容を入力してください"
              />
            </div>

            {/* Published Date */}
            <div>
              <label
                htmlFor="publishedDate"
                className="block text-lg font-semibold text-kizuna-gold mb-2 flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2 text-kizuna-gold" />
                公開日 <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border-2 border-red-400 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Submit and Delete Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                削除
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    変更を保存
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
