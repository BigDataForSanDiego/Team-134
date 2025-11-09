"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import type { MedicalQRProfile } from "@/lib/types"

export default function MedicalSummaryPage() {
  const searchParams = useSearchParams()
  const data = searchParams.get("data")

  let profile: MedicalQRProfile | null = null

  if (data) {
    try {
      const json = atob(decodeURIComponent(data))
      profile = JSON.parse(json) as MedicalQRProfile
    } catch {
      profile = null
    }
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <Card className="p-4">
          <h1 className="text-lg font-bold mb-2">Medical summary not available</h1>
          <p className="text-sm text-muted-foreground">
            The QR code does not contain a valid summary or the data was generated incorrectly.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Emergency Medical Summary</h1>

      <Card className="p-4 space-y-2">
        <div className="text-sm space-y-1">
          <p>
            <span className="font-semibold">Name: </span>
            {profile.name || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Date of birth: </span>
            {profile.dateOfBirth || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Emergency contact: </span>
            {profile.emergencyContact || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Emergency phone: </span>
            {profile.emergencyPhone || "Not specified"}
          </p>
        </div>
      </Card>

      <Section title="Chronic conditions" value={profile.chronicConditions} />
      <Section
        title="Medical history (conditions, surgeries, hospitalizations)"
        value={profile.medicalHistory}
      />
      <Section title="Current medications" value={profile.medications} />
      <Section title="Allergies" value={profile.allergies} />
      <Section title="Vaccinations" value={profile.vaccinations} />
      <Section title="Family medical history" value={profile.familyHistory} />
      <Section title="Healthcare contacts (clinics / doctors)" value={profile.healthContacts} />
      <Section title="Relevant test results & procedures" value={profile.testResults} />
      <Section title="Advance directives / living will" value={profile.advancedDirectives} />

      {profile.notes && <Section title="Additional notes" value={profile.notes} />}
    </div>
  )
}

function Section({ title, value }: { title: string; value?: string }) {
  return (
    <Card className="p-4">
      <h2 className="text-sm font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {value && value.trim().length > 0 ? value : "Not specified"}
      </p>
    </Card>
  )
}
