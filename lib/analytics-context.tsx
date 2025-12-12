"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AnalyticsData {
  totalGenerated: number
  totalFavorites: number
  generatedNames: Record<string, number>
  favoritedNames: Record<string, number>
  searchedRegions: Record<string, number>
}

interface AnalyticsContextType {
  analytics: AnalyticsData
  trackGeneration: (name: string, region: string) => void
  trackFavorite: (name: string) => void
  trackUnfavorite: (name: string) => void
}

const defaultAnalytics: AnalyticsData = {
  totalGenerated: 0,
  totalFavorites: 0,
  generatedNames: {},
  favoritedNames: {},
  searchedRegions: {},
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("africanNameAnalytics")
    if (stored) {
      try {
        setAnalytics(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse analytics:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("africanNameAnalytics", JSON.stringify(analytics))
    }
  }, [analytics, isLoaded])

  const trackGeneration = (name: string, region: string) => {
    setAnalytics((prev) => ({
      ...prev,
      totalGenerated: prev.totalGenerated + 1,
      generatedNames: {
        ...prev.generatedNames,
        [name]: (prev.generatedNames[name] || 0) + 1,
      },
      searchedRegions: {
        ...prev.searchedRegions,
        [region]: (prev.searchedRegions[region] || 0) + 1,
      },
    }))
  }

  const trackFavorite = (name: string) => {
    setAnalytics((prev) => ({
      ...prev,
      totalFavorites: prev.totalFavorites + 1,
      favoritedNames: {
        ...prev.favoritedNames,
        [name]: (prev.favoritedNames[name] || 0) + 1,
      },
    }))
  }

  const trackUnfavorite = (name: string) => {
    setAnalytics((prev) => ({
      ...prev,
      totalFavorites: Math.max(0, prev.totalFavorites - 1),
      favoritedNames: {
        ...prev.favoritedNames,
        [name]: Math.max(0, (prev.favoritedNames[name] || 0) - 1),
      },
    }))
  }

  return (
    <AnalyticsContext.Provider value={{ analytics, trackGeneration, trackFavorite, trackUnfavorite }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
