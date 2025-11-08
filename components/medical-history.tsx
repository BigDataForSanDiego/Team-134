"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Heart, Pill, AlertCircle, Syringe, Activity, Stethoscope } from "lucide-react"
import type { MedicalRecord } from "@/lib/types"

const typeIcons = {
  checkup: Heart,
  medication: Pill,
  emergency: AlertCircle,
  vaccination: Syringe,
}

const typeLabels = {
  checkup: "Check",
  medication: "medication",
  emergency: "Emergency",
  vaccination: "Vaccination",
}

const typeColors = {
  checkup: "default",
  medication: "secondary",
  emergency: "destructive",
  vaccination: "outline",
} as const

export function MedicalHistory() {
  const [records, setRecords] = useState<MedicalRecord[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("medicalHistory")
    if (saved) {
      setRecords(JSON.parse(saved))
    } else {
      // Sample data
      const sampleRecords: MedicalRecord[] = [
        {
          id: "1",
          date: "2025-01-10",
          type: "checkup",
          description: "general health check-up",
          provider: "community clinic",
          notes: "are in good health overall.",
        },
        {
          id: "2",
          date: "2024-12-15",
          type: "vaccination",
          description: "Vaccine for influenza",
          provider: "health department",
        },
      ]
      setRecords(sampleRecords)
      localStorage.setItem("medicalHistory", JSON.stringify(sampleRecords))
    }
  }, [])

  return (
    <div className="space-y-4 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Medical History</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Record of medical care received</p>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Add
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 md:p-4 text-center">
          <Activity className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-2" />
          <div className="text-xl md:text-2xl font-bold text-foreground">{records.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Register</div>
        </Card>
        <Card className="p-3 md:p-4 text-center">
          <Stethoscope className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-2" />
          <div className="text-xl md:text-2xl font-bold text-foreground">
            {records.filter((r) => r.type === "checkup").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Check-up</div>
        </Card>
        <Card className="p-3 md:p-4 text-center">
          <Syringe className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-2" />
          <div className="text-xl md:text-2xl font-bold text-foreground">
            {records.filter((r) => r.type === "vaccination").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Vaccines</div>
        </Card>
        <Card className="p-3 md:p-4 text-center">
          <Pill className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-2" />
          <div className="text-xl md:text-2xl font-bold text-foreground">
            {records.filter((r) => r.type === "medication").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Medicines</div>
        </Card>
      </div>

      {records.length === 0 ? (
        <Card className="p-8 md:p-12 text-center">
          <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">There's no medical register</h3>
          <p className="text-sm text-muted-foreground mb-4">Start recording your medical care</p>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Register
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
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
                        {record.provider && (
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">{record.provider}</p>
                        )}
                      </div>
                      <Badge variant={typeColors[record.type]} className="shrink-0">
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
                    {record.notes && (
                      <p className="text-xs md:text-sm text-foreground bg-muted p-2 md:p-3 rounded-md">
                        {record.notes}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Card className="p-4 md:p-6 bg-accent/10 border-accent">
        <h3 className="font-bold text-base md:text-lg mb-3 text-foreground">Health Reminders</h3>
        <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Keep track of all the medications you take and their doses
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Write down any allergies or adverse reactions to medications
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Record your chronic medical conditions and current treatments
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Share this information with health professionals when necessary
          </li>
        </ul>
      </Card>
    </div>
  )
}
