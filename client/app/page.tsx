"use client"

import Link from "next/link"
import { ArrowRight, Lightbulb, Users, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-6 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Sarkari Saathi</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Your trusted companion to discover and access government benefits effortlessly
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Government schemes in India often remain underutilized due to lack of awareness and complex application
            processes. Sarkari Saathi bridges this gap by bringing all government benefits to your fingertips with clear
            information and guided application support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/schemes">
              <Button size="lg" className="gap-2">
                Explore Schemes <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Platform Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Scheme Discovery",
                description:
                  "Browse comprehensive catalog of central and state government schemes with detailed eligibility criteria",
              },
              {
                icon: Zap,
                title: "Simplified Process",
                description: "Step-by-step guided application process to reduce complexity and increase success rates",
              },
              {
                icon: Users,
                title: "Personalized Recommendations",
                description: "AI-powered system suggests relevant schemes based on your profile and requirements",
              },
              {
                icon: Shield,
                title: "Secure & Verified",
                description: "All schemes verified from official government sources with authentic information",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="p-6 border border-border rounded-lg hover:bg-background/50 transition">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-primary/10 border border-primary/20 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Benefits?</h2>
          <p className="text-foreground/70 mb-8">
            Start exploring available government schemes and discover benefits you're eligible for.
          </p>
          <Link href="/schemes">
            <Button size="lg">Browse All Schemes</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
