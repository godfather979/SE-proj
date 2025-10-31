"use client"

import { useState } from "react"
import type { Scheme } from "@/types/scheme"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function SchemeCard({ scheme }: { scheme: Scheme }) {
  const [open, setOpen] = useState(false)

  const eligibilityPoints = scheme.Eligibility
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
  const benefitPoints = scheme.Benefits
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <>
      <Card className="hover:shadow-lg transition overflow-hidden flex flex-col h-full">
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold mb-2 text-foreground line-clamp-2">{scheme.Title}</h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{scheme.Description}</p>

          <div className="space-y-4 grow">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase mb-2">Eligibility</p>
              <p className="text-sm text-foreground leading-relaxed">
                {eligibilityPoints.slice(0, 3).join(", ")}
                {eligibilityPoints.length > 3 && ` +${eligibilityPoints.length - 3} more`}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground uppercase mb-2">Benefits</p>
              <p className="text-sm text-foreground leading-relaxed">
                {benefitPoints.slice(0, 3).join(", ")}
                {benefitPoints.length > 3 && ` +${benefitPoints.length - 3} more`}
              </p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} className="mt-6 w-full" variant="default">
            Learn More
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{scheme.Title}</DialogTitle>
            <DialogDescription>{scheme.Description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Full Eligibility */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary text-xl">✓</span>
                Eligibility Criteria
              </h3>
              <ul className="space-y-2">
                {eligibilityPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Benefits */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary text-xl">★</span>
                Benefits
              </h3>
              <ul className="space-y-2">
                {benefitPoints.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
