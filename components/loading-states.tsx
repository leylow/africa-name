"use client"

import { Frown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SearchingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">Searching...</h3>
      <div className="mt-3 sm:mt-4 flex items-center gap-2">
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-bounce rounded-full bg-primary" />
      </div>
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">Please wait while we find your name.</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="py-6 sm:py-8">
      <h3 className="mb-3 sm:mb-4 text-center text-base sm:text-lg font-semibold text-foreground">Loading Results</h3>
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
            <div className="flex-shrink-0 lg:w-48">
              <div className="h-7 sm:h-8 w-28 sm:w-32 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-3 sm:h-4 w-16 sm:w-20 animate-pulse rounded bg-muted" />
              <div className="mt-2 sm:mt-3 flex gap-2">
                <div className="h-5 sm:h-6 w-14 sm:w-16 animate-pulse rounded-full bg-muted" />
                <div className="h-5 sm:h-6 w-14 sm:w-16 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
            <div className="flex-1 space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 w-16 sm:w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 sm:h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 sm:h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-3 sm:mt-4 h-3 sm:h-4 w-20 sm:w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 sm:h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 sm:h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="py-6 sm:py-8">
      <h3 className="mb-3 sm:mb-4 text-center text-base sm:text-lg font-semibold text-foreground">No Results Found</h3>
      <Card className="bg-destructive/5 border-destructive/20">
        <CardContent className="flex flex-col items-center py-6 sm:py-8 px-4">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-destructive/10">
            <Frown className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
          </div>
          <h4 className="mt-3 sm:mt-4 font-semibold text-sm sm:text-base text-foreground">Error: Name not found</h4>
          <p className="mt-1.5 sm:mt-2 text-center text-xs sm:text-sm text-muted-foreground">
            We couldn't find the name you were looking for. Please check the spelling or try another name.
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="mt-3 sm:mt-4 bg-transparent text-sm">
              Search Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-16">
      <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl sm:text-4xl">💫</span>
      </div>
      <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-foreground">No favorites yet</h3>
      <p className="mt-1.5 sm:mt-2 text-center text-sm sm:text-base text-muted-foreground">
        Start exploring names and save your favorites here!
      </p>
      <Button asChild className="mt-3 sm:mt-4 text-sm">
        <a href="/">Explore Names</a>
      </Button>
    </div>
  )
}
