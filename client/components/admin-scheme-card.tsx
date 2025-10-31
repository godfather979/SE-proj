"use client"

import type { Scheme } from "@/types/scheme"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function AdminSchemeCard({
  scheme,
  onDelete,
}: {
  scheme: Scheme
  onDelete: (id: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{scheme.Title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{scheme.Description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(scheme.SchemeID)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold text-foreground/70 mb-1">Eligibility</p>
          <p className="text-foreground/80">{scheme.Eligibility}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground/70 mb-1">Benefits</p>
          <p className="text-foreground/80">{scheme.Benefits}</p>
        </div>
      </div>
    </Card>
  )
}
