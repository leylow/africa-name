"use client"

import { Copy, Share2, Download } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NameCardCompact } from "@/components/name-card-compact"
import { EmptyFavorites } from "@/components/loading-states"
import { AfricanProverb } from "@/components/african-proverb"
import { useFavorites } from "@/lib/favorites-context"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  const handleCopyAll = async () => {
    const text = favorites.map((n) => `${n.name} - ${n.meaning} (${n.ethnicity})`).join("\n")
    await navigator.clipboard.writeText(text)
  }

  const handleShare = () => {
    const text = `My favorite African names:\n${favorites.map((n) => n.name).join(", ")}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const handleDownload = () => {
    const text = favorites
      .map(
        (n) =>
          `Name: ${n.name}\nMeaning: ${n.meaning}\nOrigin: ${n.ethnicity}, ${n.country}\nPronunciation: ${n.pronunciation}\n`,
      )
      .join("\n---\n\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my-favorite-african-names.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col gradient-orange">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mx-auto max-w-5xl mb-4 sm:mb-6">
            <AfricanProverb variant="default" />
          </div>

          <Card className="mx-auto max-w-5xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Favorite Names</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                  Here are the beautiful names you've saved. Copy, share, or download them anytime.
                </p>
              </div>

              {favorites.length > 0 && (
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAll}
                      className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent"
                    >
                      <Copy className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Copy Name
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent"
                    >
                      <Share2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Share
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="bg-primary text-primary-foreground text-xs sm:text-sm"
                  >
                    <Download className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Download List
                  </Button>
                </div>
              )}

              {favorites.length === 0 ? (
                <EmptyFavorites />
              ) : (
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                  {favorites.map((name) => (
                    <NameCardCompact key={name.id} name={name} showRemove />
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
