"use client"

import { useState } from "react"
import QRCode from "react-qr-code"
import type { MedicalQRProfile } from "@/lib/types"

const emptyProfile: Omit<MedicalQRProfile, "id"> = {
  name: "",
  dateOfBirth: "",
  emergencyContact: "",
  emergencyPhone: "",
  notes: "",
  chronicConditions: "",
  medicalHistory: "",
  medications: "",
  allergies: "",
  vaccinations: "",
  familyHistory: "",
  healthContacts: "",
  testResults: "",
  advancedDirectives: "",
}

export function MedicalQRForm() {
  const [form, setForm] = useState(emptyProfile)
  const [qrData, setQrData] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const profile: MedicalQRProfile = {
      id: Date.now().toString(),
      ...form,
    }

    // JSON -> base64 -> query param
    const json = JSON.stringify(profile)
    const encoded = encodeURIComponent(btoa(json))

    // Works in dev (localhost/IP) and in production (Vercel)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const url = `${baseUrl}/medical-summary?data=${encoded}`

    setQrData(url)
  }

  function handleReset() {
    setForm(emptyProfile)
    setQrData(null)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name (optional)
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="e.g., John (nickname, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date of birth (optional)
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Emergency contact (optional)
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={form.emergencyContact}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Contact person"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Emergency phone (optional)
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={form.emergencyPhone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="555-123-4567"
            />
          </div>
        </div>

        <FieldArea
          label="General notes (optional)"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any additional relevant info."
        />

        {/* Extended medical fields */}
        <FieldArea
          label="Chronic conditions"
          name="chronicConditions"
          value={form.chronicConditions}
          onChange={handleChange}
          placeholder="Type 2 diabetes since 2015, hypertension, etc."
        />

        <FieldArea
          label="Medical history (conditions, surgeries, hospitalizations)"
          name="medicalHistory"
          value={form.medicalHistory}
          onChange={handleChange}
          placeholder="Appendectomy in 2018, pneumonia hospitalization in 2022, etc."
        />

        <FieldArea
          label="Current medications (name & dosage)"
          name="medications"
          value={form.medications}
          onChange={handleChange}
          placeholder="Metformin 850 mg BID, Losartan 50 mg daily, etc."
        />

        <FieldArea
          label="Allergies"
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          placeholder="Penicillin allergy, shellfish allergy, etc."
        />

        <FieldArea
          label="Vaccinations (approx. dates)"
          name="vaccinations"
          value={form.vaccinations}
          onChange={handleChange}
          placeholder="COVID-19 full series, influenza 2024, tetanus 2020, etc."
        />

        <FieldArea
          label="Family medical history"
          name="familyHistory"
          value={form.familyHistory}
          onChange={handleChange}
          placeholder="Father MI at 55, mother diabetes, etc."
        />

        <FieldArea
          label="Healthcare contacts (clinics, doctors, phone)"
          name="healthContacts"
          value={form.healthContacts}
          onChange={handleChange}
          placeholder="Community clinic X tel. 555-123-4567, Dr. Lopez tel. 555-987-6543, etc."
        />

        <FieldArea
          label="Relevant test results & procedures"
          name="testResults"
          value={form.testResults}
          onChange={handleChange}
          placeholder="Latest labs: HbA1c 7.2% (Jan 2025), chest X-ray normal (Dec 2024), etc."
        />

        <FieldArea
          label="Advance directives / living will"
          name="advancedDirectives"
          value={form.advancedDirectives}
          onChange={handleChange}
          placeholder="Resuscitation preference, legal contact, life support decisions, etc."
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Generate medical QR
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Clear form
          </button>
        </div>
      </form>

      {qrData && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">
            QR ready for medical staff
          </p>
          <QRCode value={qrData} size={180} />
          <p className="text-xs text-slate-500 text-center max-w-sm break-all">
            Scanning this QR opens the medical summary at:
            <br />
            {qrData}
          </p>
        </div>
      )}
    </div>
  )
}

type FieldAreaProps = {
  label: string
  name: keyof Omit<MedicalQRProfile, "id">
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
}

function FieldArea({
  label,
  name,
  value,
  onChange,
  placeholder,
}: FieldAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
        placeholder={placeholder}
      />
    </div>
  )
}
