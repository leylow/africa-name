// app/analytics/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Heart, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnalytics } from "@/lib/analytics-context"
import { cn } from "@/lib/utils"

type TimeFilter = "7days" | "30days" | "all"

export default function AnalyticsPage() {
  const { status } = useSession() // We only need the status here for protection
  const router = useRouter()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("7days")

  // Destructure 'analytics' data AND the 'loading' state from the context
  const { analytics, loading: contextLoading } = useAnalytics() as any 

  // --- PROTECTION LOGIC ---
  
  // 1. Loading state: Show loader while session is loading OR while the context data is fetching
  if (status === 'loading' || contextLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background dark">
        <p className="text-xl text-foreground">
            {status === 'loading' ? 'Verifying session...' : 'Fetching user data...'}
        </p>
      </div>
    );
  }

  // 2. Unauthenticated state: Redirect to login immediately
  if (status === 'unauthenticated') {
    router.replace('/login');
    return null;
  }

  // 3. Authenticated & Data Loaded state: RENDER DASHBOARD
  
  // Data preparation (using || {} to handle initial empty state from the context)
  const topGenerated = Object.entries(analytics.generatedNames || {})
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, 5) as [string, number][]

  const topFavorited = Object.entries(analytics.favoritedNames || {})
    .filter(([, count]) => count > 0)
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .slice(0, 5) as [string, number][]

  const regionStats = Object.entries(analytics.searchedRegions || {})
    .sort(([, aCount], [, bCount]) => bCount - aCount) as [string, number][]
    
  const maxRegionSearches = Math.max(...Object.values(analytics.searchedRegions || {}), 1)
  const uniqueRegions = Object.keys(analytics.searchedRegions || {}).length

  return (
    <div className="flex min-h-screen flex-col bg-background dark">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                Explore insights into name generation trends.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["7days", "30days", "all"] as TimeFilter[]).map((filter) => (
                <Button
                  key={filter}
                  variant={timeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter(filter)}
                  className={cn("text-xs sm:text-sm", timeFilter === filter && "bg-primary text-primary-foreground")}
                >
                  {filter === "7days" ? "Last 7 Days" : filter === "30days" ? "Last 30 Days" : "All Time"}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="mb-6 sm:mb-8 grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Names Generated</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-bold text-foreground">
                  {analytics.totalGenerated?.toLocaleString() || '0'}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-green-500">
                  +15.2%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Favorites</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-bold text-foreground">
                  {analytics.totalFavorites?.toLocaleString() || '0'}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-green-500">
                  +9.8%
                </p>
              </CardContent>
            </Card>
            <Card className="xs:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-muted-foreground">Unique Regions Searched</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-bold text-foreground">{uniqueRegions || 0}</p>
                <p className="mt-1 text-xs sm:text-sm text-green-500">+2.1%</p>
              </CardContent>
            </Card>
          </div>

          {/* Lists - responsive grid */}
          <div className="mb-6 sm:mb-8 grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Most Generated Names */}
            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Most Generated Names
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {topGenerated.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No names generated yet. Start exploring!</p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {topGenerated.map(([name, count], index) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-sm sm:text-base text-foreground">
                          <span className="mr-2 sm:mr-3 text-muted-foreground">{index + 1}</span>
                          {name}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">{count.toLocaleString()} gen.</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Most Favorited Names */}
            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  Most Favorited Names
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {topFavorited.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No favorites yet. Save some names!</p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {topFavorited.map(([name, count]) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm sm:text-base text-foreground">
                          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-red-500 text-red-500" />
                          {name}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">{count.toLocaleString()} fav.</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Region Stats */}
          <Card>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Most Searched Regions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {regionStats.length === 0 ? (
                <p className="text-sm text-muted-foreground">No region data yet. Generate some names!</p>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {regionStats.map(([region, count]) => (
                    <div key={region}>
                      <div className="mb-1.5 sm:mb-2 flex items-center justify-between">
                        <span className="text-sm sm:text-base text-foreground">{region}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {count.toLocaleString()} searches
                        </span>
                      </div>
                      <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${(count / maxRegionSearches) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}