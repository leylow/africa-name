// Header.tsx (Corrected with NextAuth Session Logic)
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sun, Moon, Menu, X, User } from "lucide-react" // Added User icon
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react" // IMPORTANT: Added useSession and signOut

const staticNavLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/cultural-info", label: "Cultural Info" },
  { href: "/about", label: "About" },
  { href: "/favorites", label: "Favorites" },
  // NOTE: Analytics link is intentionally omitted here; it will be added conditionally below
]

export function Header() {
  const { data: session, status } = useSession() // Get session status
  const isAuthenticated = status === 'authenticated'

  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 1. Build Dynamic Nav Links
  // Only include 'Analytics' if the user is authenticated.
  const navLinks = isAuthenticated
    ? [...staticNavLinks, { href: "/analytics", label: "Analytics" }]
    : staticNavLinks

  // 2. Define Auth Buttons/Links component based on status
  const AuthControls = ({ isMobile = false }) => (
    <>
      {isAuthenticated ? (
        // SHOW: My Account (User Avatar) and Log Out
        <>
          <Link href="/account">
            <Button size={isMobile ? "sm" : "icon"} className={cn("rounded-full", isMobile ? "w-full justify-start" : "h-9 w-9 sm:h-10 sm:w-10")}>
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                {isMobile && <span className="ml-2 font-medium">My Account</span>}
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="outline" 
            className={cn(isMobile ? "w-full" : "hidden md:inline-flex bg-transparent text-xs sm:text-sm")}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Log Out
          </Button>
        </>
      ) : (
        // SHOW: Sign Up and Log In
        <>
          <Link href="/signup">
            <Button size="sm" className={cn(isMobile ? "w-full" : "hidden md:inline-flex text-xs sm:text-sm")}>
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className={cn(isMobile ? "w-full bg-transparent" : "hidden md:inline-flex bg-transparent text-xs sm:text-sm")}>
              Log In
            </Button>
          </Link>
        </>
      )}
    </>
  )

  // Show a simpler version during loading to prevent layout shifting
  if (status === 'loading') {
    // Return a basic header skeleton while the session check is in progress
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-md">
            <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
                <div className="text-xl font-bold text-foreground">AfriNamer</div>
                <div className="w-16 h-8 bg-muted rounded animate-pulse"></div>
            </div>
        </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-base sm:text-lg font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground hidden xs:inline">AfriNamer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 xl:px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full">
            {theme === "light" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Desktop Auth Buttons (md+ only) */}
          <div className="hidden md:flex items-center gap-2">
            <AuthControls isMobile={false} />
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - full width dropdown */}
      <nav
        className={cn(
          "flex-col gap-1 border-t border-border/40 px-4 py-3 lg:hidden bg-card/95 backdrop-blur-md",
          mobileMenuOpen ? "flex" : "hidden",
        )}
      >
        {/* Links */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "w-full px-3 py-2.5 text-sm font-medium transition-colors rounded-md",
              pathname === link.href
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {link.label}
          </Link>
        ))}
        
        {/* Mobile Auth Buttons (visible in mobile menu) */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border/40 md:hidden">
          <AuthControls isMobile={true} />
        </div>
      </nav>
    </header>
  )
}