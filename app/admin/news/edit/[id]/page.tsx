"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, ArrowLeft, Save, Handshake, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

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
      <div className="min-h-screen bg-[#F7FBFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#112B3A]">
      {/* Navigation */}
      <AdminNav title="絆命会 管理画面" subtitle="お知らせ編集" />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-slate-700 hover:text-[#087C73] font-semibold transition-colors duration-300 font-makinas"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#112B3A] mb-2 font-makinas">お知らせ編集</h1>
          
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,61,62,0.06)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-slate-700 mb-2 font-makinas">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: text-[#112B3A] transition-all duration-300 font-makinas"
                placeholder="例: 絆命会公式LINEアカウント開設のお知らせ"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-slate-700 mb-2 font-makinas">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: text-[#112B3A] transition-all duration-300 resize-none font-makinas"
                placeholder="お知らせの内容を入力してください"
              />
            </div>

            {/* Published Date */}
            <div>
              <label
                htmlFor="publishedDate"
                className="block text-lg font-semibold text-slate-700 mb-2 flex items-center font-makinas"
              >
                <Calendar className="w-5 h-5 mr-2 text-slate-700" />
                公開日 <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: text-[#112B3A] transition-all duration-300 font-makinas"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-red-700 font-makinas">{error}</p>
              </div>
            )}

            {/* Submit and Delete Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm flex items-center font-makinas"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                削除
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-kizuna-dark font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center font-makinas"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-kizuna-dark mr-3"></div>
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
