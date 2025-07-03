"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff } from "lucide-react"

interface PasswordProtectionProps {
  children: React.ReactNode
  correctPassword: string
}

export default function PasswordProtection({ children, correctPassword }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem("jobs-auth")
    if (savedAuth === correctPassword) {
      setIsAuthenticated(true)
    }
  }, [correctPassword])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      localStorage.setItem("jobs-auth", password)
      setError("")
    } else {
      setError("パスワードが正しくありません")
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setPassword("")
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 flex items-center justify-center p-4">
      <Card className={`w-full max-w-md shadow-2xl border-2 border-amber-400 ${isShaking ? "animate-pulse" : ""}`}>
        <CardHeader className="text-center bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-emerald-900" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">求人情報</CardTitle>
          <p className="text-emerald-100">会員専用ページです</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                パスワードを入力してください
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  className="pr-10 border-2 border-emerald-200 focus:border-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              アクセスする
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
