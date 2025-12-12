"use client"

import { Volume2, Star, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/lib/favorites-context"
import { useAnalytics } from "@/lib/analytics-context"
import type { AfricanName } from "@/lib/african-names-data"
import { cn } from "@/lib/utils"

interface NameCardProps {
  name: AfricanName
  showCulturalSignificance?: boolean
  className?: string
}

export function NameCard({ name, showCulturalSignificance = true, className }: NameCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { trackFavorite, trackUnfavorite } = useAnalytics()
  const favorited = isFavorite(name.id)

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(name.id)
      trackUnfavorite(name.name)
    } else {
      addFavorite(name)
      trackFavorite(name.name)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${name.name} - ${name.meaning} (${name.ethnicity}, ${name.country})`)
  }

  const handleShare = () => {
    const text = `Check out this African name: ${name.name} - ${name.meaning} (${name.ethnicity}, ${name.country})`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(name.name)
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
          {/* Name Section */}
          <div className="flex-shrink-0 lg:w-48">
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">{name.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-muted-foreground hover:text-primary"
                onClick={speakName}
              >
                <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Pronounce name</span>
              </Button>
            </div>
            <p className="mt-1 text-xs sm:text-sm italic text-primary">{name.pronunciation}</p>
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                {name.country}
              </Badge>
              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                {name.ethnicity}
              </Badge>
              <Badge variant="secondary" className="bg-accent text-accent-foreground capitalize text-xs">
                {name.gender}
              </Badge>
            </div>
          </div>

          {/* Meaning Section */}
          <div className="flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Meaning</h4>
            <p className="mt-1 text-sm sm:text-base text-foreground">{name.meaning}</p>

            {showCulturalSignificance && (
              <>
                <h4 className="mt-3 sm:mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  Cultural Significance
                </h4>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">{name.culturalSignificance}</p>
              </>
            )}
          </div>
        </div>

        {/* Actions - responsive button layout */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-1 sm:gap-2 border-t border-border pt-3 sm:pt-4">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3">
            <Copy className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
          >
            <Share2 className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Share</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleFavorite}
            className={cn("text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3", favorited && "text-primary")}
          >
            <Star className={cn("mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4", favorited && "fill-current")} />
            <span className="hidden xs:inline">{favorited ? "Saved" : "Save"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
