"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Save, ArrowLeft, Download, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabase, type Job } from "@/lib/supabase"
import AdminNav from "@/components/admin-nav"
import Footer from "@/components/footer"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null)
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [description, setDescription] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetchJob()
  }, [params.id])

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error fetching job:", error)
        alert("求人情報の取得に失敗しました。")
        router.push("/admin/dashboard")
        return
      }

      setJob(data)
      setTitle(data.title)
      setCompany(data.company)
      setLocation(data.location)
      setEmploymentType(data.employment_type)
      setDescription(data.description || "")
    } catch (error) {
      console.error("Error:", error)
      alert("エラーが発生しました。")
      router.push("/admin/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
    } else {
      alert("PDFファイルのみアップロード可能です。")
    }
  }

  const uploadPDF = async (file: File): Promise<{ url: string; filename: string } | null> => {
    try {
      const fileExt = "pdf"
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from("job-pdfs").upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return null
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("job-pdfs").getPublicUrl(filePath)

      return {
        url: publicUrl,
        filename: file.name,
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    }
  }

  const deletePDF = async () => {
    if (!job?.pdf_url) return

    if (confirm("現在のPDFファイルを削除しますか？")) {
      try {
        // Extract file path from URL
        const urlParts = job.pdf_url.split("/")
        const fileName = urlParts[urlParts.length - 1]

        const { error } = await supabase.storage.from("job-pdfs").remove([fileName])

        if (!error) {
          // Update database to remove PDF references
          const { error: updateError } = await supabase
            .from("jobs")
            .update({ pdf_url: null, pdf_filename: null })
            .eq("id", params.id)

          if (!updateError) {
            setJob({ ...job, pdf_url: null, pdf_filename: null })
            alert("PDFファイルを削除しました。")
          }
        }
      } catch (error) {
        console.error("Error deleting PDF:", error)
        alert("PDFファイルの削除に失敗しました。")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let pdfUrl = job?.pdf_url
      let pdfFilename = job?.pdf_filename

      if (pdfFile) {
        setUploadProgress(50)
        const uploadResult = await uploadPDF(pdfFile)
        if (uploadResult) {
          pdfUrl = uploadResult.url
          pdfFilename = uploadResult.filename
        }
        setUploadProgress(75)
      }

      const { error } = await supabase
        .from("jobs")
        .update({
          title,
          company,
          location,
          employment_type: employmentType,
          description: description || null,
          pdf_url: pdfUrl,
          pdf_filename: pdfFilename,
        })
        .eq("id", params.id)

      setUploadProgress(100)

      if (error) {
        console.error("Error updating job:", error)
        alert("求人情報の更新に失敗しました。")
      } else {
        alert("求人情報を更新しました。")
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("エラーが発生しました。")
    } finally {
      setSaving(false)
      setUploadProgress(0)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-700 text-lg">求人情報が見つかりません。</p>
          <Link href="/admin/dashboard" className="text-emerald-600 hover:text-emerald-800 mt-4 inline-block">
            管理画面に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
      <AdminNav title="求人情報 編集" userEmail="" showLogout={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            管理画面に戻る
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-4 border-emerald-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-8">求人情報 編集</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-emerald-700 mb-2">
                求人タイトル *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="例: 救急救命士募集"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-emerald-700 mb-2">
                会社・組織名
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="例: 大阪市消防局"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-emerald-700 mb-2">
                  勤務地
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="例: 大阪府大阪市"
                />
              </div>

              <div>
                <label htmlFor="employmentType" className="block text-sm font-medium text-emerald-700 mb-2">
                  雇用形態
                </label>
                <select
                  id="employmentType"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">選択してください</option>
                  <option value="正社員">正社員</option>
                  <option value="契約社員">契約社員</option>
                  <option value="アルバイト・パート">アルバイト・パート</option>
                  <option value="派遣">派遣</option>
                  <option value="業務委託">業務委託</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-emerald-700 mb-2">
                求人概要
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="求人の概要や特徴を入力してください（任意）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">求人詳細PDF</label>

              {job.pdf_url && (
                <div className="mb-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-emerald-700">{job.pdf_filename || "求人詳細.pdf"}</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={job.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded flex items-center transition-colors"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        表示
                      </a>
                      <button
                        type="button"
                        onClick={deletePDF}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded flex items-center transition-colors"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="pdf"
                      className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4 inline mr-2" />
                      {job.pdf_url ? "PDFファイルを変更" : "PDFファイルを選択"}
                    </label>
                    <input type="file" id="pdf" accept=".pdf" onChange={handleFileChange} className="hidden" />
                    <p className="text-sm text-emerald-600 mt-2">最大10MBまで</p>
                  </div>
                  {pdfFile && (
                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-emerald-700">選択されたファイル: {pdfFile.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {saving ? "更新中..." : "求人情報を更新"}
              </button>
              <Link
                href="/admin/dashboard"
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )

  async function updateJob(
    id: string,
    title: string,
    company: string,
    location: string,
    employmentType: string,
    description: string | null,
    pdfUrl: string | null,
    pdfFilename: string | null,
  ) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({
          title,
          company: company || null,
          location: location || null,
          employment_type: employmentType || null,
          description: description || null,
          pdf_url: pdfUrl,
          pdf_filename: pdfFilename,
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error("Supabase error updating job", error)
        return { error }
      }

      return { data }
    } catch (error) {
      console.error("Error updating job", error)
      return { error }
    }
  }
}
