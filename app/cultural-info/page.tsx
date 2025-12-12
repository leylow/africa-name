// CulturalInfoPage.tsx
"use client"

import { useState } from "react"
import { Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AfricanProverb } from "@/components/african-proverb"
import { culturalInfoData } from "@/lib/african-names-data"
import { cn } from "@/lib/utils"

export default function CulturalInfoPage() {
  const [activeTab, setActiveTab] = useState(culturalInfoData[0].id)
  const activeInfo = culturalInfoData.find((info) => info.id === activeTab)

  return (
    <div className="flex min-h-screen flex-col gradient-warm">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-4xl">
            {/* Header - responsive text */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Cultural Insights: The Stories Behind the Names
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground">
                Discover the rich traditions and meanings behind names from cultures across Africa.
              </p>
            </div>

            <div className="mt-4 sm:mt-6">
              <AfricanProverb variant="accent" />
            </div>

            {/* FIX APPLIED HERE: Ensure the outer container allows overflow-x-auto */}
            <div className="mt-6 sm:mt-8">
              <div className="relative -mx-4 sm:mx-0 overflow-x-auto scrollbar-hide">
                <div className="container mx-auto px-4 sm:px-0"> {/* Use container/padding fix here */}
                    <div className="flex gap-1 border-b border-border min-w-max sm:min-w-0">
                        {culturalInfoData.map((info) => (
                            <button
                                key={info.id}
                                onClick={() => setActiveTab(info.id)}
                                className={cn(
                                    "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors",
                                    activeTab === info.id
                                        ? "border-b-2 border-primary text-foreground"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {info.culture} {info.culture === "Akan" ? "Day Names" : "Traditions"}
                            </button>
                        ))}
                    </div>
                </div>
              </div>
            </div>

            {/* Content - responsive padding */}
            {activeInfo && (
              <Card className="mt-6 sm:mt-8">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{activeInfo.title}</h2>
                    </div>
                  </div>

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-foreground">
                    {activeInfo.description}
                  </p>

                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    {activeInfo.traditions.map((tradition, index) => (
                      <p key={index} className="text-sm sm:text-base text-muted-foreground">
                        {tradition}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Example Names</h3>
                    <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
                      {activeInfo.examples.map((example, index) => (
                        <div key={index} className="rounded-lg bg-muted/50 p-2.5 sm:p-3">
                          <p className="font-semibold text-sm sm:text-base text-foreground">{example.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{example.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/">
                    <Button className="mt-6 sm:mt-8 bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base">
                      Explore {activeInfo.culture} Names
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}