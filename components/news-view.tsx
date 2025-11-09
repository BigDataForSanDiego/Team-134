"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WeatherAlert } from "@/lib/types"
import {
  AlertTriangle,
  ShieldCheck,
  CloudRain,
  Wind,
  ThermometerSnowflake,
  ThermometerSun,
} from "lucide-react"

const SD_LAT = 32.7157
const SD_LON = -117.1611

// --- Filtering rules ---
const EXCLUDE_RE = new RegExp(
  [
    "beach",
    "surf",
    "rip current",
    "marine",
    "small craft",
    "gale",
    "hazardous seas",
    "high surf",
    "coastal hazard",
  ].join("|"),
  "i"
)

const INCLUDE_RE = new RegExp(
  [
    "cold",
    "freeze",
    "wind chill",
    "winter",
    "snow",
    "blizzard",
    "frost",
    "heat",
    "excessive heat",
    "hot",
    "rain",
    "storm",
    "thunder",
    "lightning",
    "flood",
    "flash flood",
    "wind",
    "high wind",
    "air quality",
    "smoke",
    "wildfire",
    "dense fog",
    "visibility",
  ].join("|"),
  "i"
)

function isRelevant(a: WeatherAlert): boolean {
  const t = `${a.title ?? ""} ${a.description ?? ""} ${a.instruction ?? ""}`
  if (EXCLUDE_RE.test(t)) return false
  return INCLUDE_RE.test(t)
}

function needsShelter(a: WeatherAlert): boolean {
  const t = `${a.title ?? ""} ${a.description ?? ""} ${a.instruction ?? ""}`.toLowerCase()
  return /(cold|freeze|wind chill|winter|snow|blizzard|rain|storm|flood|high wind|excessive heat|heat index)/.test(
    t
  )
}

function severityStyles(sev?: string) {
  const s = (sev || "").toLowerCase()
  if (s.includes("extreme"))
    return {
      badge: "bg-red-700 text-white",
      card: "border-red-400 bg-red-50",
    }
  if (s.includes("severe"))
    return {
      badge: "bg-red-600 text-white",
      card: "border-red-300 bg-red-50",
    }
  if (s.includes("moderate"))
    return {
      badge: "bg-amber-500 text-white",
      card: "border-amber-300 bg-amber-50",
    }
  if (s.includes("minor"))
    return {
      badge: "bg-yellow-500 text-white",
      card: "border-yellow-300 bg-yellow-50",
    }
  return {
    badge: "bg-slate-500 text-white",
    card: "border-slate-200 bg-slate-50",
  }
}

export function NewsView() {
  const [active, setActive] = useState<WeatherAlert[]>([])
  const [recent, setRecent] = useState<WeatherAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // Active
        const resA = await fetch(`/api/weather/alerts?lat=${SD_LAT}&lon=${SD_LON}`)
        if (!(resA.headers.get("content-type") || "").includes("application/json")) {
          throw new Error("Active alerts: non-JSON response")
        }
        const jsonA = await resA.json()
        const activeFiltered: WeatherAlert[] = (jsonA.alerts || []).filter(isRelevant)

        // Last 30 days
        const now = new Date()
        const end = now.toISOString()
        const startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
        const start = startDate.toISOString()

        const resH = await fetch(
          `/api/weather/alerts?lat=${SD_LAT}&lon=${SD_LON}&start=${encodeURIComponent(
            start
          )}&end=${encodeURIComponent(end)}`
        )
        if (!(resH.headers.get("content-type") || "").includes("application/json")) {
          throw new Error("History alerts: non-JSON response")
        }
        const jsonH = await resH.json()
        const recentFiltered: WeatherAlert[] = (jsonH.alerts || []).filter(isRelevant)

        setActive(activeFiltered)
        setRecent(recentFiltered)
      } catch (e: any) {
        setError(e.message || "Failed to load alerts")
        setActive([])
        setRecent([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl md:text-2xl font-bold">News and resources</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Updated information on available services
        </p>
      </header>

      {loading && <div className="text-sm text-muted-foreground">Loading weather alerts…</div>}
      {error && <div className="text-sm text-destructive">Weather alerts error: {error}</div>}

      {/* Urgent (active) */}
      {!loading && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold">Urgent weather alerts (today)</h3>

          {active.length === 0 ? (
            <Card className="p-3 border-emerald-300 bg-emerald-50">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-emerald-600/90 p-1.5 text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-800">
                    No urgent alerts for today.
                  </p>
                  <p className="text-xs text-emerald-700/80">
                    Conditions look safe right now. We’ll keep this updated.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            active.map((a) => <AlertCard key={a.id} a={a} showShelterCta={needsShelter(a)} />)
          )}
        </section>
      )}

      {/* Recent (last 30 days) */}
      {!loading && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold">Recent weather alerts (last 30 days)</h3>
          {recent.length === 0 ? (
            <Card className="p-3 bg-slate-50">
              <p className="text-sm text-muted-foreground">No relevant recent alerts found.</p>
            </Card>
          ) : (
            recent.map((a) => <AlertCard key={`${a.id}-recent`} a={a} />)
          )}
        </section>
      )}

      {/* …below puedes dejar tus cards de recursos/noticias existentes… */}
    </div>
  )
}

function AlertCard({ a, showShelterCta = false }: { a: WeatherAlert; showShelterCta?: boolean }) {
  const styles = severityStyles(a.severity)
  const icon = pickIcon(a)

  return (
    <Card className={`p-4 ${styles.card} ${styles.card.includes("border-") ? "" : "border"} `}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-white/70 p-1.5 text-red-700 ring-1 ring-red-300">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-red-700 leading-snug">{a.title}</h4>
            <div className="text-xs text-muted-foreground mt-1">
              {a.starts && <>Starts: {new Date(a.starts).toLocaleString()} • </>}
              {a.ends && <>Ends: {new Date(a.ends).toLocaleString()}</>}
              {a.url && (
                <>
                  {" • "}
                  <a className="underline" href={a.url} target="_blank" rel="noreferrer">
                    Details
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {a.severity && (
          <span className={`text-xs rounded px-2 py-0.5 h-fit ${styles.badge}`}>{a.severity}</span>
        )}
      </div>

      {a.description && (
        <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{a.description}</p>
      )}
      {a.instruction && (
        <p className="text-sm text-slate-900 mt-2 font-medium whitespace-pre-wrap">
          {a.instruction}
        </p>
      )}

      {showShelterCta && (
        <Button
          className="mt-3"
          onClick={() => {
            // Ajusta a tu navegación (tabs). Aquí redirigimos simple:
            window.location.href = "/?tab=map"
          }}
        >
          Find nearby shelters
        </Button>
      )}
    </Card>
  )
}

function pickIcon(a: WeatherAlert) {
  const t = `${a.title ?? ""} ${a.description ?? ""}`.toLowerCase()
  if (/(cold|freeze|frost|wind chill|winter|snow|blizzard)/.test(t))
    return <ThermometerSnowflake className="h-4 w-4" />
  if (/(heat|excessive heat|hot)/.test(t)) return <ThermometerSun className="h-4 w-4" />
  if (/(rain|storm|flood|flash flood|thunder|lightning)/.test(t))
    return <CloudRain className="h-4 w-4" />
  if (/(wind|high wind)/.test(t)) return <Wind className="h-4 w-4" />
  return <AlertTriangle className="h-4 w-4" />
}
