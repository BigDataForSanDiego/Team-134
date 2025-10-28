"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Calendar, AlertCircle, Info, Megaphone } from "lucide-react"
import { mockNews } from "@/lib/mock-data"

const categoryIcons = {
  resource: Info,
  event: Calendar,
  alert: AlertCircle,
  update: Megaphone,
}

const categoryLabels = {
  resource: "Recurso",
  event: "Evento",
  alert: "Alerta",
  update: "Actualización",
}

const categoryColors = {
  resource: "default",
  event: "secondary",
  alert: "destructive",
  update: "outline",
} as const

export function NewsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Newspaper className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Noticias y Recursos</h2>
          <p className="text-sm text-muted-foreground">Información actualizada sobre servicios disponibles</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockNews.map((news) => {
          const Icon = categoryIcons[news.category]
          return (
            <Card
              key={news.id}
              className={`p-4 ${news.category === "alert" ? "border-destructive bg-destructive/5" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    news.category === "alert" ? "bg-destructive/10" : "bg-primary/10"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${news.category === "alert" ? "text-destructive" : "text-primary"}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-base text-foreground leading-tight">{news.title}</h3>
                    <Badge variant={categoryColors[news.category]} className="shrink-0">
                      {categoryLabels[news.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(news.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">{news.content}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-primary/5 border-primary">
        <h3 className="font-bold text-lg mb-3 text-foreground">Líneas de Ayuda</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-sm font-medium text-foreground">Emergencias</span>
            <span className="text-lg font-bold text-primary">911</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-sm font-medium text-foreground">Crisis Mental</span>
            <span className="text-lg font-bold text-primary">(555) 000-1111</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-sm font-medium text-foreground">Información</span>
            <span className="text-lg font-bold text-primary">(555) 000-2222</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
