"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Sarkari Saathi
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/schemes" className="text-foreground hover:text-primary transition">
            Browse Schemes
          </Link>
          <Link href="/admin" className="text-foreground hover:text-primary transition">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/" className="text-foreground hover:text-primary transition">
                Home
              </Link>
              <Link href="/schemes" className="text-foreground hover:text-primary transition">
                Browse Schemes
              </Link>
              <Link href="/admin" className="text-foreground hover:text-primary transition">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
