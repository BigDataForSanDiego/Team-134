// Force Node runtime (más tolerante con fetch externos que Edge en algunos setups)
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"

type NWSAlert = {
  id: string
  properties?: {
    headline?: string
    event?: string
    severity?: string
    areaDesc?: string
    effective?: string
    onset?: string
    ends?: string
    expires?: string
    description?: string
    instruction?: string
    uri?: string
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")
    const start = searchParams.get("start") // ISO opcional
    const end = searchParams.get("end")     // ISO opcional

    if (!lat || !lon) {
      return NextResponse.json({ error: "lat and lon are required" }, { status: 400 })
    }

    // Endpoint: https://api.weather.gov/alerts
    // - Activos por punto: /alerts/active?point=LAT,LON
    // - Ventana histórica: /alerts?point=LAT,LON&start=...&end=...
    const base = "https://api.weather.gov/alerts"
    const qs = start && end
      ? `?point=${lat},${lon}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
      : `/active?point=${lat},${lon}`

    const url = `${base}${qs}`

    const res = await fetch(url, {
      headers: {
        // NWS requiere un User-Agent identificable (email del equipo)
        "User-Agent": "OpenHelp Hackathon (team@example.com)",
        "Accept": "application/geo+json",
      },
      // Revalida en cache a 2 min para no golpear tanto el API
      next: { revalidate: 120 },
    })

    // Si no es OK, intenta leer como texto y reenvía JSON de error
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json(
        { error: `NWS error ${res.status}`, details: text.slice(0, 500) },
        { status: 502 }
      )
    }

    // Intenta parseo seguro
    const data = await res.json().catch(async () => {
      const text = await res.text()
      throw new Error(`Invalid JSON from NWS: ${text.slice(0, 120)}`)
    })

    const features: NWSAlert[] = Array.isArray(data?.features) ? data.features : []

    const alerts = features.map((f) => ({
      id: f.id,
      title: f.properties?.headline || f.properties?.event || "Weather Alert",
      severity: f.properties?.severity,
      area: f.properties?.areaDesc,
      starts: f.properties?.effective || f.properties?.onset,
      ends: f.properties?.ends || f.properties?.expires,
      description: f.properties?.description,
      instruction: f.properties?.instruction,
      url: f.properties?.uri,
    }))

    return NextResponse.json({ alerts })
  } catch (err: any) {
    // Pase lo que pase, devolvemos JSON para evitar el "<!DOCTYPE ...>"
    return NextResponse.json(
      { error: "Internal error fetching alerts", details: String(err?.message || err) },
      { status: 500 }
    )
  }
}
