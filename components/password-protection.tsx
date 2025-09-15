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
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden font-makinas-square">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #B8A082 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #D4B896 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      
      <Card className={`w-full max-w-md shadow-2xl border-4 border-kizuna-gold backdrop-blur-sm bg-gradient-to-br from-black/95 via-gray-900/95 to-kizuna-dark/95 ${isShaking ? "animate-pulse" : ""}`}>
        <CardHeader className="text-center bg-gradient-to-r from-kizuna-dark to-black text-white rounded-t-lg border-b-2 border-kizuna-gold">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-kizuna-gold to-kizuna-bronze rounded-full flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8 text-black" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-kizuna-dark-gold via-kizuna-bronze to-kizuna-dark-gold bg-clip-text font-makinas-square">求人情報</CardTitle>
          <p className="text-kizuna-gold font-makinas-square">会員専用ページです</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-kizuna-gold font-makinas-square">
                パスワードを入力してください
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  className="pr-10 border-2 border-kizuna-gold/50 bg-black/50 text-white focus:border-kizuna-gold focus:ring-2 focus:ring-kizuna-gold/20 font-makinas-square"
                  required
                />
                                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-kizuna-gold hover:text-kizuna-light-gold"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-300 text-sm text-center bg-red-900/50 p-2 rounded border border-red-500 font-makinas-square">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-kizuna-gold to-kizuna-bronze hover:from-kizuna-bronze hover:to-kizuna-gold text-black font-bold py-3 transition-all duration-300 transform hover:scale-105 shadow-xl font-makinas-square"
            >
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
