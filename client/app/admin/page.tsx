"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import SchemeForm from "@/components/scheme-form"
import AdminSchemeCard from "@/components/admin-scheme-card"
import type { Scheme } from "@/types/scheme"
import { fetchSchemes, addScheme, deleteScheme } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ToastMessage {
  text: string
  type: "success" | "error"
}

export default function AdminPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  useEffect(() => {
    loadSchemes()
  }, [])

  const loadSchemes = async () => {
    setLoading(true)
    try {
      const data = await fetchSchemes()
      setSchemes(data)
    } catch (error) {
      console.error("Error loading schemes:", error)
      showToast({ text: "Failed to load schemes", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: ToastMessage) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500) // disappears after 2.5s
  }

  const handleAddScheme = async (formData: Omit<Scheme, "id">) => {
    try {
      const newScheme = await addScheme(formData)
      setSchemes([newScheme, ...schemes])
      showToast({ text: "Scheme added successfully!", type: "success" })
    } catch (error) {
      console.error("Error adding scheme:", error)
      showToast({ text: "Failed to add scheme. Please try again.", type: "error" })
    }
  }

  const handleDeleteScheme = async (id: string) => {
    try {
      await deleteScheme(id)
      setSchemes(schemes.filter((s) => s.SchemeID !== id))
      showToast({ text: "Scheme has been removed", type: "success" })
    } catch (error) {
      console.error("Error deleting scheme:", error)
      showToast({ text: "Failed to delete scheme", type: "error" })
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />

      {/* Toast popup */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } transition-all`}
        >
          {toast.text}
        </div>
      )}

      {/* Header */}
      <section className="bg-primary/10 border-b border-border py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage government schemes</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="add">Add New Scheme</TabsTrigger>
              <TabsTrigger value="manage">Manage Schemes ({schemes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="add">
              <div className="bg-card border border-border rounded-lg p-8">
                <SchemeForm onSubmit={handleAddScheme} />
              </div>
            </TabsContent>

            <TabsContent value="manage">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <p className="text-muted-foreground">Loading schemes...</p>
                  </div>
                ) : schemes.length > 0 ? (
                  schemes.map((scheme) => (
                    <AdminSchemeCard key={scheme.SchemeID} scheme={scheme} onDelete={handleDeleteScheme} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <p className="text-muted-foreground">No schemes added yet. Create one to get started!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
