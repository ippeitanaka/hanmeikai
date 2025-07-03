"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase, supabaseAdmin } from "@/lib/supabase"
import AdminNav from "@/components/admin-nav"
import Footer from "@/components/footer"

export default function NewJobPage() {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [description, setDescription] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [userEmail, setUserEmail] = useState("")
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/admin/login")
          return
        }

        setUserEmail(user.email || "")
        setAuthLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

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

      // Use supabaseAdmin for file upload to bypass RLS
      const { error: uploadError, data } = await supabaseAdmin.storage.from("job-pdfs").upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      if (!data) {
        throw new Error("Upload failed: No data returned")
      }

      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from("job-pdfs").getPublicUrl(filePath)

      return {
        url: publicUrl,
        filename: file.name,
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let pdfUrl = null
      let pdfFilename = null

      if (pdfFile) {
        setUploadProgress(50)
        const uploadResult = await uploadPDF(pdfFile)
        if (uploadResult) {
          pdfUrl = uploadResult.url
          pdfFilename = uploadResult.filename
        }
        setUploadProgress(75)
      }

      // Prepare data with proper null handling
      const jobData = {
        title: title.trim(),
        company: company.trim() || null,
        location: location.trim() || null,
        employment_type: employmentType || null,
        description: description.trim() || null,
        pdf_url: pdfUrl,
        pdf_filename: pdfFilename,
        is_active: true,
      }

      console.log("Inserting job data:", jobData)

      // Use supabaseAdmin for database insert to bypass RLS
      const { error, data } = await supabaseAdmin.from("jobs").insert([jobData]).select()

      setUploadProgress(100)

      if (error) {
        console.error("Error creating job:", error)
        throw new Error(`Database error: ${error.message}`)
      } else {
        console.log("Job created successfully:", data)
        alert("求人情報を作成しました。")
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Error:", error)
      alert(`エラーが発生しました: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
      <AdminNav title="求人情報 新規作成" userEmail={userEmail} showLogout={true} />

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
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-8">求人情報 新規作成</h1>

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
              <label htmlFor="pdf" className="block text-sm font-medium text-emerald-700 mb-2">
                求人詳細PDF
              </label>
              <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="pdf"
                      className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4 inline mr-2" />
                      PDFファイルを選択
                    </label>
                    <input type="file" id="pdf" accept=".pdf" onChange={handleFileChange} className="hidden" />
                    <p className="text-sm text-emerald-600 mt-2">最大10MBまで（任意）</p>
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
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {loading ? "作成中..." : "求人情報を作成"}
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
}
