"use client"

import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { AfricanName } from "@/lib/african-names-data"

interface NameOfTheDayProps {
  name: AfricanName
}

export function NameOfTheDay({ name }: NameOfTheDayProps) {
  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(name.name)
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-3 sm:mb-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
        Name of the Day
      </h2>
      <Card className="overflow-hidden">
        <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1709237104643-3e11922ce515?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWZyaWNhbiUyMHRyYWRpdGlvbmFsJTIwY2FydmluZyUyMHByb2ZpbGUlMjBvY2hyZSUyMGJyb3duJTIwZGV0YWlsZWQlMjBkaWdpdGFsJTIwYXJ0fGVufDB8fDB8fHww"
            alt="African art"
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {name.country}, {name.ethnicity} people
          </p>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{name.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              onClick={speakName}
            >
              <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Pronounce name</span>
            </Button>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-sm sm:text-base text-foreground">
              <span className="font-semibold">Meaning:</span> {name.meaning.split(".")[0]}.
            </p>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">Cultural Notes:</span> {name.culturalSignificance}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
