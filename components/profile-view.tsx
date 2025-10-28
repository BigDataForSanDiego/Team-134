"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Save, Award as IdCard } from "lucide-react"
import type { UserProfile } from "@/lib/types"

export function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("userProfile")
    if (saved) {
      setProfile(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile))
    setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Mi Perfil</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Información personal</p>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            size="lg"
            className="w-full md:w-auto"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar
              </>
            ) : (
              "Editar"
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <IdCard className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-base text-foreground mb-2">Registro de Usuario</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tu perfil está registrado localmente en este dispositivo. Esta información te ayudará a acceder a
                  servicios de ayuda más rápidamente.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Perfil activo desde {new Date().toLocaleDateString("es-ES")}</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm md:text-base">
              Nombre Completo
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
              placeholder="Tu nombre"
              className="text-base h-11 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm md:text-base">
              Fecha de Nacimiento
            </Label>
            <Input
              id="dob"
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              disabled={!isEditing}
              className="text-base h-11 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency" className="text-sm md:text-base">
              Contacto de Emergencia
            </Label>
            <Input
              id="emergency"
              value={profile.emergencyContact || ""}
              onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
              disabled={!isEditing}
              placeholder="Nombre del contacto"
              className="text-base h-11 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyPhone" className="text-sm md:text-base">
              Teléfono de Emergencia
            </Label>
            <Input
              id="emergencyPhone"
              type="tel"
              value={profile.emergencyPhone || ""}
              onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
              disabled={!isEditing}
              placeholder="(555) 123-4567"
              className="text-base h-11 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm md:text-base">
              Notas Adicionales
            </Label>
            <Textarea
              id="notes"
              value={profile.notes || ""}
              onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
              disabled={!isEditing}
              placeholder="Alergias, medicamentos, información importante..."
              className="text-base min-h-24"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-accent/10 border-accent">
        <h3 className="font-bold text-base md:text-lg mb-3 text-foreground">Información Importante</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Tu información se guarda solo en tu dispositivo
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Mantén actualizado tu contacto de emergencia
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            Esta información puede ayudar en caso de emergencia médica
          </li>
        </ul>
      </Card>
    </div>
  )
}
