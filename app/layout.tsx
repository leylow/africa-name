// layout.tsx (FIXED)

import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
// Import the new client-side wrapper component
import ClientProviders from "@/components/providers/ClientProviders" 

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AfriNamer - African Name Generator & Meaning Explorer",
  description:
    "Discover the rich cultural heritage and meanings behind thousands of African names. Generate names by region, country, gender, and explore naming traditions.",
  keywords: [
    "African names",
    "name generator",
    "name meanings",
    "Yoruba names",
    "Akan names",
    "Zulu names",
    "Swahili names",
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E85A32" },
    { media: "(prefers-color-scheme: dark)", color: "#2D1810" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {/* Use the client-side wrapper to contain all context logic */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}