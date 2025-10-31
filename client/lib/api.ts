import type { Scheme } from "@/types/scheme"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function fetchSchemes(): Promise<Scheme[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search_schemes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch schemes")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching schemes:", error)
    throw error
  }
}

export async function addScheme(scheme: Omit<Scheme, "id">): Promise<Scheme> {
  try {
    const response = await fetch(`${API_BASE_URL}/manage_scheme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheme),
    })

    if (!response.ok) {
      throw new Error("Failed to add scheme")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding scheme:", error)
    throw error
  }
}

export async function deleteScheme(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/manage_scheme/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete scheme")
    }
  } catch (error) {
    console.error("Error deleting scheme:", error)
    throw error
  }
}
