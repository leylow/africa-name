// app/login/page.tsx
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, User as UserIcon, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
        setError("Please enter both email/username and password.");
        return;
    }
    
    setIsSubmitting(true)

    // Use NextAuth.js signIn
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    setIsSubmitting(false)

    if (result?.error) {
      // Handles the 'CredentialsSignin' error after server validation failure
      console.error("Login Error:", result.error)
      setError("Invalid credentials. Please check your email and password.")
    } else {
      // SUCCESSFUL LOGIN: Redirect to the home page (/)
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2D1810] bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80')] bg-cover bg-center p-4">
      <Card className="w-full max-w-[95%] sm:max-w-md border-0 bg-card/90 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-5 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold italic text-foreground">Welcome Back</h1>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground">
              Log in to explore African names and their meanings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            
            {/* Error Message Display */}
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-300 rounded-lg" role="alert">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-sm">
                Email or Username
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 sm:pl-10 h-10 sm:h-11 text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 sm:pl-10 pr-10 h-10 sm:h-11 text-sm"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link href="/forgot-password" className="text-xs sm:text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-11 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}