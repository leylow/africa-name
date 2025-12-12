"use client"

import { useState, useEffect } from "react"
import { Quote, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Proverb {
  original: string
  translation: string
  language: string
  country: string
}

export const africanProverbs: Proverb[] = [
  {
    original: "Orúkọ rere san ju wúrà àti fàdákà lọ",
    translation: "A good name is better than gold and silver",
    language: "Yoruba",
    country: "Nigeria",
  },
  {
    original: "Aha ajọọ anụ ọhụrụ bụ nke ọ na-aza",
    translation: "The name you answer defines who you become",
    language: "Igbo",
    country: "Nigeria",
  },
  {
    original: "Jina zuri ni urithi mzuri",
    translation: "A good name is a good inheritance",
    language: "Swahili",
    country: "East Africa",
  },
  {
    original: "Lebitso lebe ke seromo",
    translation: "A bad name is a curse",
    language: "Sesotho",
    country: "Lesotho",
  },
  {
    original: "Din da aka ba ka shi ne makomar ka",
    translation: "The name given to you is your destiny",
    language: "Hausa",
    country: "Nigeria",
  },
  {
    original: "Igama lihle lingcono kunengcebo",
    translation: "A beautiful name is better than riches",
    language: "Zulu",
    country: "South Africa",
  },
  {
    original: "Dzina rakanaka rinopfuura sirivha nendarama",
    translation: "A good name surpasses silver and gold",
    language: "Shona",
    country: "Zimbabwe",
  },
  {
    original: "Edin pa ye sen sika",
    translation: "A good name is worth more than gold",
    language: "Akan (Twi)",
    country: "Ghana",
  },
  {
    original: "Muntu ni izina rye",
    translation: "A person is their name",
    language: "Kinyarwanda",
    country: "Rwanda",
  },
  {
    original: "Isem lifi ko necem li",
    translation: "Your name is your soul's garment",
    language: "Amharic",
    country: "Ethiopia",
  },
  {
    original: "Asa nni mmusuo a, yεfre no kwasea",
    translation: "If a child has no blessing, they call him a fool — names carry power",
    language: "Akan (Twi)",
    country: "Ghana",
  },
  {
    original: "Umuntu ngumuntu ngabantu",
    translation: "A person is a person through other people — we are named by our community",
    language: "Zulu",
    country: "South Africa",
  },
  {
    original: "Mwana asingachemerwe haakure",
    translation: "A child who is not called by name will not grow — names give life",
    language: "Shona",
    country: "Zimbabwe",
  },
  {
    original: "Omo tí a kò fún lórúkọ, kò lè jẹ́ ẹni tí ó wà",
    translation: "A child without a name cannot become who they truly are",
    language: "Yoruba",
    country: "Nigeria",
  },
  {
    original: "Nkoa dɛn na wɔfrɛ wo?",
    translation: "What name do they call you? — for your name reveals your story",
    language: "Akan (Twi)",
    country: "Ghana",
  },
]

interface AfricanProverbProps {
  variant?: "default" | "dark" | "accent"
  className?: string
  showRefresh?: boolean
}

export function AfricanProverb({ variant = "default", className, showRefresh = true }: AfricanProverbProps) {
  const [currentProverb, setCurrentProverb] = useState<Proverb | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Pick a random proverb on mount
    const randomIndex = Math.floor(Math.random() * africanProverbs.length)
    setCurrentProverb(africanProverbs[randomIndex])
  }, [])

  const handleRefresh = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * africanProverbs.length)
      setCurrentProverb(africanProverbs[randomIndex])
      setIsAnimating(false)
    }, 300)
  }

  if (!currentProverb) return null

  const variantStyles = {
    default: "bg-card/80 backdrop-blur-sm border border-border",
    dark: "bg-[#2a1f0d]/80 backdrop-blur-sm border border-[#3d2e14]",
    accent: "bg-primary/10 border border-primary/20",
  }

  const textStyles = {
    default: {
      original: "text-foreground",
      translation: "text-muted-foreground",
      language: "text-primary",
      icon: "text-primary",
    },
    dark: {
      original: "text-[#c9a227]",
      translation: "text-gray-300",
      language: "text-[#e8b923]",
      icon: "text-[#c9a227]",
    },
    accent: {
      original: "text-foreground",
      translation: "text-muted-foreground",
      language: "text-primary",
      icon: "text-primary",
    },
  }

  const styles = textStyles[variant]

  return (
    <div className={cn("rounded-xl p-3 sm:p-5", variantStyles[variant], className)}>
      <div className="flex items-start gap-2 sm:gap-3">
        <Quote className={cn("h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-1", styles.icon)} />
        <div
          className={cn("flex-1 space-y-1.5 sm:space-y-2", isAnimating && "opacity-0 transition-opacity duration-300")}
        >
          <p className={cn("font-serif text-sm sm:text-lg italic leading-relaxed", styles.original)}>
            "{currentProverb.original}"
          </p>
          <p className={cn("text-xs sm:text-sm leading-relaxed", styles.translation)}>"{currentProverb.translation}"</p>
          <p className={cn("text-xs font-medium", styles.language)}>
            — {currentProverb.language} proverb ({currentProverb.country})
          </p>
        </div>
        {showRefresh && (
          <button
            onClick={handleRefresh}
            className={cn(
              "p-1.5 sm:p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10",
              styles.icon,
            )}
            aria-label="Show another proverb"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isAnimating && "animate-spin")} />
          </button>
        )}
      </div>
    </div>
  )
}
