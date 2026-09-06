"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

export default function NewEventPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.from("events").insert([
        {
          title,
          description,
          date,
          location,
        },
      ])

      if (error) {
        setError(`イベントの作成に失敗しました: ${error.message}`)
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
    <div className="min-h-screen bg-[#F7FBFC] text-[#112B3A]">

      {/* Navigation */}
      <AdminNav title="絆命会 管理画面" subtitle="イベント新規作成" />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-slate-700 hover:text-[#087C73] font-semibold transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#112B3A] mb-2">イベント新規作成</h1>
          
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,61,62,0.06)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-slate-700 mb-2">
                イベント名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: transition-all duration-300 text-base"
                placeholder="例: 第15回 絆命会総会"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-base sm:text-lg font-semibold text-slate-700 mb-2">
                イベント詳細 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: transition-all duration-300 resize-none text-base"
                placeholder="イベントの詳細を入力してください"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-base sm:text-lg font-semibold text-slate-700 mb-2 flex items-center"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#087C73]" />
                  開催日 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: transition-all duration-300 text-base"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-base sm:text-lg font-semibold text-slate-700 mb-2 flex items-center"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-[#087C73]" />
                  開催場所 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#112B3A] outline-none transition focus:border-[#12A491] focus:ring-4 focus:ring-[#12A491]/10 rounded-xl outline-none focus: transition-all duration-300 text-base"
                  placeholder="例: 大阪市内ホテル"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-red-700 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#12B89E] to-[#087C73] hover:from-[#0EA68F] hover:to-[#076B65] text-white font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm flex items-center text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    イベントを保存
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
