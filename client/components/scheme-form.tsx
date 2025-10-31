"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { Scheme } from "@/types/scheme"

interface SchemeFormProps {
  onSubmit: (data: Omit<Scheme, "id">) => Promise<void>
}

export default function SchemeForm({ onSubmit }: SchemeFormProps) {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Eligibility: "",
    Benefits: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.Title.trim() ||
      !formData.Description.trim() ||
      !formData.Eligibility.trim() ||
      !formData.Benefits.trim()
    ) {
      setError("All fields are required")
      return
    }

    setLoading(true)
    try {
      await onSubmit(formData)
      setFormData({ Title: "", Description: "", Eligibility: "", Benefits: "" })
    } catch (err) {
      setError("Failed to add scheme. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Scheme Title *</label>
        <Input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Enter scheme name"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
        <Textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Describe the scheme and its objectives"
          rows={4}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Eligibility Criteria *</label>
        <Textarea
          name="Eligibility"
          value={formData.Eligibility}
          onChange={handleChange}
          placeholder="List eligibility requirements"
          rows={3}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Benefits *</label>
        <Textarea
          name="Benefits"
          value={formData.Benefits}
          onChange={handleChange}
          placeholder="List benefits (comma-separated)"
          rows={3}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Adding Scheme...
          </>
        ) : (
          "Add Scheme"
        )}
      </Button>
    </form>
  )
}
