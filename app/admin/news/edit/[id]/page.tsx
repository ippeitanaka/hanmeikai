"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Calendar, ArrowLeft, Save, Handshake, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"

export default function EditNewsPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publishedDate, setPublishedDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const newsId = params.id as string

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*").eq("id", newsId).single()

      if (error) {
        setError("お知らせの取得に失敗しました。")
      } else if (data) {
        setTitle(data.title)
        setContent(data.content)
        setPublishedDate(data.published_date)
      }
    } catch (error) {
      setError("エラーが発生しました。")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase
        .from("news")
        .update({
          title,
          content,
          published_date: publishedDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", newsId)

      if (error) {
        setError(`お知らせの更新に失敗しました: ${error.message}`)
      } else {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      setError("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("このお知らせを削除しますか？")) {
      try {
        const { error } = await supabase.from("news").delete().eq("id", newsId)

        if (error) {
          setError(`お知らせの削除に失敗しました: ${error.message}`)
        } else {
          router.push("/admin/dashboard")
        }
      } catch (error) {
        setError("エラーが発生しました。")
      }
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #059669 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #d97706 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-900">
                  <Handshake className="w-8 h-8 text-emerald-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-100 tracking-wider">絆命会 管理画面</h1>
                <p className="text-emerald-200 text-sm">お知らせ編集</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">お知らせ編集</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-emerald-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-emerald-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                placeholder="例: 絆命会公式LINEアカウント開設のお知らせ"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-lg font-semibold text-emerald-700 mb-2">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 resize-none"
                placeholder="お知らせの内容を入力してください"
              />
            </div>

            {/* Published Date */}
            <div>
              <label
                htmlFor="publishedDate"
                className="block text-lg font-semibold text-emerald-700 mb-2 flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                公開日 <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit and Delete Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                削除
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
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
