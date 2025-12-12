// src/components/providers/ClientProviders.tsx
"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

// Import all your existing client contexts
import { ThemeProvider } from "@/lib/theme-context"
import { FavoritesProvider } from "@/lib/favorites-context"
import { AnalyticsProvider } from "@/lib/analytics-context"

// Import the required AuthProvider we just created
import { AuthProvider } from "@/context/AuthContext" 

interface ClientProvidersProps {
  children: React.ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    // Wrap all client-side contexts here
    <ThemeProvider>
      <FavoritesProvider>
        <AnalyticsProvider>
          {/* Place AuthProvider around the SessionProvider and children */}
          <AuthProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}