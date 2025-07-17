"use client"

import { useEffect, useState } from "react"
import MainNav from "@/components/main-nav"
import PasswordProtection from "@/components/password-protection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Building, MapPin, Briefcase, Eye, X, Calendar, User } from "lucide-react"
import { supabase, type Job } from "@/lib/supabase"

export default function JobsPage() {
  const [jobListings, setJobListings] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [previewPdf, setPreviewPdf] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching jobs:", error)
      } else {
        setJobListings(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const openJobPreview = (job: Job) => {
    setSelectedJob(job)
  }

  const closeJobPreview = () => {
    setSelectedJob(null)
  }

  const openPdfPreview = (pdfUrl: string) => {
    setPreviewPdf(pdfUrl)
  }

  const closePdfPreview = () => {
    setPreviewPdf(null)
  }

  return (
    <PasswordProtection correctPassword="toyo119">
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <MainNav currentPage="求人情報" />

        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-100 mb-4">求人情報</h1>
            <p className="text-emerald-200 text-lg">絆命会会員専用の求人情報です</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-100"></div>
            </div>
          ) : jobListings.length === 0 ? (
            <div className="text-center py-12">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-amber-400 max-w-md mx-auto">
                <CardContent className="p-8">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">現在、求人情報はありません</h3>
                  <p className="text-gray-600">新しい求人情報が追加されるまでお待ちください。</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {jobListings.map((job) => (
                <Card
                  key={job.id}
                  className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-amber-400 hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3 mb-6">
                      {job.company && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>
                      )}
                      {job.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.employment_type && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{job.employment_type}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>掲載日: {new Date(job.created_at).toLocaleDateString("ja-JP")}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        onClick={() => openJobPreview(job)}
                      >
                        <Eye className="w-4 h-4" />
                        詳細を見る
                      </Button>

                      {job.pdf_url && (
                        <Button
                          variant="outline"
                          className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 bg-transparent"
                          onClick={() => openPdfPreview(job.pdf_url)}
                        >
                          <FileText className="w-4 h-4" />
                          資料を見る
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-amber-400 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">お問い合わせ</h2>
                <p className="text-gray-700 mb-4">
                  求人情報に関するご質問やご相談がございましたら、お気軽にお問い合わせください。
                </p>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  onClick={() => window.open("https://lin.ee/Y8DHYjk", "_blank")}
                >
                  LINEでお問い合わせ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 求人詳細プレビューモーダル */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeJobPreview}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <X className="w-4 h-4" />
                  閉じる
                </Button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {selectedJob.company && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-gray-800">会社・組織名</h4>
                      </div>
                      <p className="text-gray-700">{selectedJob.company}</p>
                    </div>
                  )}

                  {selectedJob.location && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-gray-800">勤務地</h4>
                      </div>
                      <p className="text-gray-700">{selectedJob.location}</p>
                    </div>
                  )}

                  {selectedJob.employment_type && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-semibold text-gray-800">雇用形態</h4>
                      </div>
                      <p className="text-gray-700">{selectedJob.employment_type}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-semibold text-gray-800">掲載日</h4>
                    </div>
                    <p className="text-gray-700">{new Date(selectedJob.created_at).toLocaleDateString("ja-JP")}</p>
                  </div>
                </div>

                {selectedJob.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      求人概要
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
                    </div>
                  </div>
                )}

                {selectedJob.pdf_url && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">求人詳細資料</h4>
                    <div className="flex gap-3">
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                        onClick={() => {
                          openPdfPreview(selectedJob.pdf_url!)
                          closeJobPreview()
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        資料をプレビュー
                      </Button>
                      <Button
                        variant="outline"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 bg-transparent"
                        onClick={() => window.open(selectedJob.pdf_url, "_blank")}
                      >
                        <Download className="w-4 h-4" />
                        ダウンロード
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PDF プレビューモーダル */}
        {previewPdf && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">求人資料プレビュー</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(previewPdf, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    ダウンロード
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closePdfPreview}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                    閉じる
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4">
                <iframe
                  src={`${previewPdf}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border border-gray-300 rounded"
                  title="PDF Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PasswordProtection>
  )
}
