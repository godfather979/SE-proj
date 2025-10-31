"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import SchemeCard from "@/components/scheme-card"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { fetchSchemes } from "@/lib/api"
import type { Scheme } from "@/types/scheme"

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchSchemes()
      .then((data) => {
        setSchemes(data)
        setFilteredSchemes(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading schemes:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const filtered = schemes.filter(
      (scheme) =>
        scheme.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.Description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredSchemes(filtered)
  }, [searchQuery, schemes])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-primary/10 border-b border-border py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Government Schemes</h1>
          <p className="text-muted-foreground">Discover and explore all available government benefits</p>
        </div>
      </section>

      {/* Search and Content */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search schemes by name or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading schemes...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredSchemes.length} of {schemes.length} schemes
                </p>
              </div>

              {/* Schemes Grid */}
              {filteredSchemes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemes.map((scheme) => (
                    <SchemeCard key={scheme.SchemeID} scheme={scheme} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No schemes found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
