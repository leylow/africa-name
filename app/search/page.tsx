"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { NameCard } from "@/components/name-card"
import { SearchingLoader, SkeletonCard, ErrorState } from "@/components/loading-states"
import { AfricanProverb } from "@/components/african-proverb"
import { searchNames, type AfricanName } from "@/lib/african-names-data"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<AfricanName[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setShowSkeleton(false)
    setHasSearched(true)

    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSearching(false)
    setShowSkeleton(true)

    await new Promise((resolve) => setTimeout(resolve, 600))
    const searchResults = searchNames(searchQuery)
    setResults(searchResults)
    setShowSkeleton(false)
  }

  const handleRetry = () => {
    setQuery("")
    setResults([])
    setHasSearched(false)
  }

  return (
    <div className="flex min-h-screen flex-col gradient-warm">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            {/* Hero Section - responsive text */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Discover the Meaning of <span className="text-primary">African Names</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground">
                Explore the rich cultural heritage and stories behind thousands of names.
              </p>
            </div>

            <div className="mt-4 sm:mt-6">
              <AfricanProverb variant="default" />
            </div>

            {/* Search Input - responsive height */}
            <div className="relative mt-6 sm:mt-8">
              <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter a name..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-10 sm:h-12 pl-10 sm:pl-12 text-sm sm:text-lg"
              />
            </div>

            {/* Results Section */}
            <div className="mt-6 sm:mt-8">
              {isSearching && <SearchingLoader />}
              {showSkeleton && <SkeletonCard />}
              {!isSearching && !showSkeleton && hasSearched && results.length === 0 && (
                <ErrorState onRetry={handleRetry} />
              )}
              {!isSearching && !showSkeleton && results.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-center text-base sm:text-lg font-semibold text-foreground">
                    Search Result{results.length > 1 ? "s" : ""}
                  </h3>
                  {results.map((name) => (
                    <NameCard key={name.id} name={name} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
