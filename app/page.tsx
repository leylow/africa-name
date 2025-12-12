"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NameGeneratorForm } from "@/components/name-generator-form"
import { NameOfTheDay } from "@/components/name-of-the-day"
import { NameCard } from "@/components/name-card"
import { AfricanProverb } from "@/components/african-proverb"
import { getNameOfTheDay, type AfricanName } from "@/lib/african-names-data"

export default function HomePage() {
  const [generatedName, setGeneratedName] = useState<AfricanName | null>(null)
  const nameOfTheDay = getNameOfTheDay()

  return (
    <div className="flex min-h-screen flex-col gradient-warm">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          <div className="mb-6 sm:mb-8">
            <AfricanProverb variant="accent" />
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Generator Form */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <NameGeneratorForm onGenerate={setGeneratedName} />

              {generatedName && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-foreground">Generated Name</h3>
                  <NameCard name={generatedName} />
                </div>
              )}
            </div>

            {/* Name of the Day */}
            <NameOfTheDay name={nameOfTheDay} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
