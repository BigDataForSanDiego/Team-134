"use client"

import { useState } from "react"
import { MapView } from "@/components/map-view"
import { ProfileView } from "@/components/profile-view"
import { MedicalHistory } from "@/components/medical-history"
import { NewsView } from "@/components/news-view"
import { ResourcesView } from "@/components/ui/resources-view"
import { Map, User, Heart, HandHeart, Newspaper } from "lucide-react"

type View = "map" | "profile" | "medical" | "resources" | "news"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>("map")

  const views = {
    map: { component: MapView, icon: Map, label: "Map" },
    profile: { component: ProfileView, icon: User, label: "Profile" },
    medical: { component: MedicalHistory, icon: Heart, label: "Medical" },
    resources: { component: ResourcesView, icon: HandHeart, label: "Resources" },
    news: { component: NewsView, icon: Newspaper, label: "News" },
  }

  const CurrentComponent = views[currentView].component

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-3 md:p-4 shadow-lg">
        <div className="mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-balance">OpenHelp</h1>
          <p className="text-xs md:text-sm opacity-90 mt-1">Find help near you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-0 md:pb-0">
        <div className="w-svw mx-auto p-0 md:p-0">
          <CurrentComponent />
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto flex items-center justify-around p-1.5 md:p-2">
          {(Object.keys(views) as View[]).map((view) => {
            const { icon: Icon, label } = views[view]
            const isActive = currentView === view
            return (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex flex-col items-center gap-0.5 md:gap-1 p-2 md:p-3 rounded-lg transition-all min-w-0 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "scale-110" : ""}`} />
                <span className="text-[10px] md:text-xs font-medium truncate max-w-full">
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
