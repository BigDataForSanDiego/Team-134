"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, UtensilsCrossed, Home, Heart, Shirt, Package, Calendar, MapPin, Clock } from "lucide-react"
import type { AssistanceRecord } from "@/lib/types"

const typeIcons = {
  food: UtensilsCrossed,
  shelter: Home,
  medical: Heart,
  clothing: Shirt,
  other: Package,
}

const typeLabels = {
  food: "Comida",
  shelter: "Refugio",
  medical: "Médico",
  clothing: "Ropa",
  other: "Otro",
}

interface HelpEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "food" | "medical" | "clothing" | "other"
  description: string
}

const upcomingEvents: HelpEvent[] = [
  {
    id: "1",
    title: "Distribución de Comida Caliente",
    date: "2025-01-25",
    time: "12:00 PM - 2:00 PM",
    location: "Centro Comunitario Downtown",
    type: "food",
    description: "Almuerzo gratuito para todos",
  },
  {
    id: "2",
    title: "Clínica Médica Gratuita",
    date: "2025-01-26",
    time: "9:00 AM - 4:00 PM",
    location: "Hospital San Diego",
    type: "medical",
    description: "Chequeos generales y vacunas",
  },
  {
    id: "3",
    title: "Donación de Ropa de Invierno",
    date: "2025-01-27",
    time: "10:00 AM - 5:00 PM",
    location: "Iglesia del Centro",
    type: "clothing",
    description: "Abrigos, mantas y zapatos",
  },
]

export function AssistanceHistory() {
  const [records, setRecords] = useState<AssistanceRecord[]>([])
  const [showEvents, setShowEvents] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("assistanceHistory")
    if (saved) {
      setRecords(JSON.parse(saved))
    } else {
      // Sample data
      const sampleRecords: AssistanceRecord[] = [
        {
          id: "1",
          date: "2025-01-18",
          type: "food",
          location: "Centro de Esperanza",
          description: "Desayuno y almuerzo",
        },
        {
          id: "2",
          date: "2025-01-17",
          type: "shelter",
          location: "Refugio San José",
          description: "Alojamiento nocturno",
        },
        {
          id: "3",
          date: "2025-01-15",
          type: "clothing",
          location: "Casa de Paz",
          description: "Abrigo de invierno y zapatos",
        },
      ]
      setRecords(sampleRecords)
      localStorage.setItem("assistanceHistory", JSON.stringify(sampleRecords))
    }
  }, [])

  return (
    <div className="space-y-4 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Historial de Ayudas</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Registro de asistencia recibida</p>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Agregar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 md:p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">{records.length}</div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Total de ayudas</div>
        </Card>
        <Card className="p-3 md:p-4 text-center">
          <div className="text-2xl md:text-3xl font-bold text-accent">
            {records.filter((r) => r.date.startsWith("2025-01")).length}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">Este mes</div>
        </Card>
      </div>

      <Card className="p-4 md:p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="font-bold text-base md:text-lg text-foreground">Próximos Eventos de Ayuda</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowEvents(!showEvents)}>
            {showEvents ? "Ocultar" : "Mostrar"}
          </Button>
        </div>

        {showEvents && (
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const Icon = typeIcons[event.type]
              return (
                <Card key={event.id} className="p-3 md:p-4 bg-background">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm md:text-base text-foreground">{event.title}</h4>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {typeLabels[event.type]}
                        </Badge>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Card>

      {records.length === 0 ? (
        <Card className="p-8 md:p-12 text-center">
          <Package className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">No hay registros de ayuda</h3>
          <p className="text-sm text-muted-foreground mb-4">Comienza a registrar la asistencia que recibes</p>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Agregar Registro
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          <h3 className="font-bold text-base md:text-lg text-foreground">Historial Reciente</h3>
          {records.map((record) => {
            const Icon = typeIcons[record.type]
            return (
              <Card key={record.id} className="p-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-sm md:text-base text-foreground">{record.description}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">{record.location}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {typeLabels[record.type]}
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
