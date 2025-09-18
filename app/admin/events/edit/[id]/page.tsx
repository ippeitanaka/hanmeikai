"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, ArrowLeft, Save, Handshake, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Footer from "@/components/footer"

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const [eventId, setEventId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setEventId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  const fetchEvent = async () => {
    if (!eventId) return

    try {
      const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single()

      if (error) {
        console.error("Error fetching event:", error)
        setError("イベントの取得に失敗しました。")
      } else if (data) {
        setTitle(data.title || "")
        setDescription(data.description || "")
        setDate(data.date || "")
        setLocation(data.location || "")
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
    if (!eventId) return

    setLoading(true)
    setError("")

    try {
      const { error } = await supabase
        .from("events")
        .update({
          title: title.trim(),
          description: description.trim(),
          date,
          location: location.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", eventId)

      if (error) {
        console.error("Update error:", error)
        setError(`イベントの更新に失敗しました: ${error.message}`)
      } else {
        alert("イベントを更新しました。")
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
    if (!eventId) return

    if (confirm("このイベントを削除しますか？この操作は取り消せません。")) {
      try {
        const { error } = await supabase.from("events").delete().eq("id", eventId)

        if (error) {
          console.error("Delete error:", error)
          setError(`イベントの削除に失敗しました: ${error.message}`)
        } else {
          alert("イベントを削除しました。")
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-kizuna-dark to-black relative overflow-hidden font-makinas-square">
      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-black via-kizuna-dark to-black shadow-2xl border-b-4 border-kizuna-gold font-makinas-square">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-kizuna-gold via-kizuna-bronze to-kizuna-gold rounded-full flex items-center justify-center shadow-2xl border-4 border-kizuna-dark">
                  <Handshake className="w-8 h-8 text-kizuna-dark" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text tracking-wider font-makinas">絆命会 管理画面</h1>
                <p className="text-kizuna-gold text-sm font-makinas">イベント編集</p>
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
            className="inline-flex items-center text-kizuna-gold hover:text-kizuna-cream font-semibold transition-colors duration-300 font-makinas"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ダッシュボードに戻る
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text mb-2 font-makinas">イベント編集</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-kizuna-gold to-kizuna-bronze mx-auto rounded-full"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-kizuna-dark/90 rounded-2xl p-8 shadow-2xl border-4 border-kizuna-gold">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-kizuna-gold mb-2 font-makinas">
                イベント名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300 font-makinas"
                placeholder="例: 第15回 絆命会総会"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-semibold text-kizuna-gold mb-2 font-makinas">
                イベント詳細 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300 resize-none font-makinas"
                placeholder="イベントの詳細を入力してください"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-lg font-semibold text-kizuna-gold mb-2 flex items-center font-makinas">
                  <Calendar className="w-5 h-5 mr-2 text-kizuna-gold" />
                  開催日 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300 font-makinas"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-lg font-semibold text-kizuna-gold mb-2 flex items-center font-makinas"
                >
                  <MapPin className="w-5 h-5 mr-2 text-kizuna-gold" />
                  開催場所 <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-kizuna-gold rounded-lg focus:outline-none focus:border-kizuna-light-gold focus:ring-2 focus:ring-kizuna-gold/40 bg-black text-white transition-all duration-300 font-makinas"
                  placeholder="例: 大阪市内ホテル"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-makinas">{error}</p>
              </div>
            )}

            {/* Submit and Delete Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center font-makinas"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                削除
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-kizuna-dark font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center font-makinas"
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
