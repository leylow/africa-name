"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { regions, countriesByRegion, getRandomName } from "@/lib/african-names-data"
import { useAnalytics } from "@/lib/analytics-context"
import type { AfricanName } from "@/lib/african-names-data"
import { cn } from "@/lib/utils"

interface NameGeneratorFormProps {
  onGenerate: (name: AfricanName) => void
}

export function NameGeneratorForm({ onGenerate }: NameGeneratorFormProps) {
  const [region, setRegion] = useState<string>("West Africa")
  const [country, setCountry] = useState<string>("Any")
  const [gender, setGender] = useState<string>("female")
  const [isGenerating, setIsGenerating] = useState(false)
  const { trackGeneration } = useAnalytics()

  const availableCountries = countriesByRegion[region] || []

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const generatedName = getRandomName(region, country, gender)
    if (generatedName) {
      trackGeneration(generatedName.name, region)
      onGenerate(generatedName)
    }
    setIsGenerating(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Generate a Name</CardTitle>
        <CardDescription className="text-sm">
          Explore the rich diversity of African names and their meanings.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4 sm:space-y-6">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-primary">Region</label>
            <Select
              value={region}
              onValueChange={(val) => {
                setRegion(val)
                setCountry("Any")
              }}
            >
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-primary">Country</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                {availableCountries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-primary">Gender</label>
          <div className="flex gap-2">
            {["male", "female", "unisex"].map((g) => (
              <Button
                key={g}
                type="button"
                variant={gender === g ? "default" : "outline"}
                className={cn(
                  "flex-1 capitalize text-xs sm:text-sm h-9 sm:h-10",
                  gender === g && "bg-primary text-primary-foreground",
                )}
                onClick={() => setGender(g)}
              >
                {g === "unisex" ? "Unisex" : g.charAt(0).toUpperCase() + g.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-11 text-sm sm:text-base"
        >
          {isGenerating ? "Generating..." : "Generate Name"}
        </Button>
      </CardContent>
    </Card>
  )
}
