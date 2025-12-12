"use client"

import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/lib/favorites-context"
import { useAnalytics } from "@/lib/analytics-context"
import type { AfricanName } from "@/lib/african-names-data"
import { cn } from "@/lib/utils"

interface NameCardCompactProps {
  name: AfricanName
  showRemove?: boolean
  className?: string
}

export function NameCardCompact({ name, showRemove = false, className }: NameCardCompactProps) {
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

  return (
    <Card className={cn("group relative overflow-hidden transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{name.name}</h3>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
              Meaning: {name.meaning.split(".")[0]}.
            </p>
            <Badge variant="secondary" className="mt-2 sm:mt-3 bg-primary/10 text-primary text-xs">
              Origin: {name.ethnicity}
            </Badge>
          </div>
          {showRemove ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex-shrink-0 sm:opacity-0 transition-opacity sm:group-hover:opacity-100"
              onClick={handleToggleFavorite}
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only">Remove from favorites</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex-shrink-0"
              onClick={handleToggleFavorite}
            >
              <Star
                className={cn(
                  "h-3.5 w-3.5 sm:h-4 sm:w-4",
                  favorited ? "fill-primary text-primary" : "text-muted-foreground",
                )}
              />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
