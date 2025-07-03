"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

export default function NewNewsPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publishedDate, setPublishedDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.from("news").insert([
        {
          title,
          content,
          published_date: publishedDate,
        },
      ])

      if (error) {
        setError(`お知らせの作成に失敗しました: ${error.message}`)
      } else {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      setError("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
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
      <AdminNav title="絆命会 管理画面" subtitle="お知らせ新規作成" />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-semibold transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">お知らせ新規作成</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border-4 border-emerald-700">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-emerald-700 mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-base"
                placeholder="例: 絆命会公式LINEアカウント開設のお知らせ"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-base sm:text-lg font-semibold text-emerald-700 mb-2">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 resize-none text-base"
                placeholder="お知らせの内容を入力してください"
              />
            </div>

            {/* Published Date */}
            <div>
              <label
                htmlFor="publishedDate"
                className="block text-base sm:text-lg font-semibold text-emerald-700 mb-2 flex items-center"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-emerald-600" />
                公開日 <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-base"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    お知らせを保存
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
