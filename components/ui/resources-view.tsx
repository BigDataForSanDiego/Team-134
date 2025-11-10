"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  HandHeart,
  Home,
  Briefcase,
  ClipboardCheck,
  ChevronRight,
  Info,
  Users,
  CalendarDays,
} from "lucide-react"

type ApiJob = {
  id: string
  title: string
  company: string
  neighborhood: string
  lat: number
  lng: number
  schedule: string
  payMin: number
  payMax: number
  requiredSkills: string[]
  niceToHave: string[]
  tags: string[]
  description: string
  score?: number
  reasons?: string[]
}

export function ResourcesView() {
  const [skillsText, setSkillsText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ApiJob[]>([])

  async function fetchRecs(text: string) {
    const clean = text.trim()
    if (!clean) return

    setError(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({ skills: clean, limit: "12" })
      const res = await fetch(`/api/jobs?${params.toString()}`)
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to load job recommendations")
      }
      const data = (await res.json()) as ApiJob[]
      setResults(data)
    } catch (e: any) {
      setError(e.message || "Error loading job recommendations")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  function useExample(text: string) {
    setSkillsText(text)
    fetchRecs(text)
  }

  return (
    <div className="space-y-5 pb-24 md:pb-8">
      {/* Page header */}
      <header className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Resources</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Three quick ways to get help: <span className="font-medium text-foreground">health</span>,{" "}
          <span className="font-medium text-foreground">housing</span>, and{" "}
          <span className="font-medium text-foreground">work</span>.
        </p>
      </header>

      {/* STEP 1 – Health coverage */}
      <Card className="p-4 md:p-6 border-blue-200 bg-blue-50/60">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="rounded-full bg-blue-100 p-2 text-blue-700">
              <HandHeart className="h-6 w-6" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Health coverage (Medi-Cal)</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Many people with{" "}
                <span className="font-semibold text-foreground">little or no income</span> in California can get{" "}
                <span className="font-semibold text-foreground">free or low-cost health care</span> through Medi-Cal.
              </p>
            </div>

            <ul className="text-sm md:text-base text-muted-foreground space-y-1">
              <li>• No income is OK.</li>
              <li>• A shelter or mailing address in California is OK.</li>
              <li>• You can usually get help at clinics or county offices.</li>
            </ul>

            <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-2">
              <a
                href="https://www.dhcs.ca.gov/Medi-Cal/Pages/qualify.aspx"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto text-base font-semibold">
                  Check if I qualify
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>

              <a
                href="https://benefitscal.com/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="w-full sm:w-auto text-base">
                  Apply on BenefitsCal
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="mt-2 flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>This is general information only. Final approval is decided by the county.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* STEP 2 – Housing */}
      <Card className="p-4 md:p-6 border-emerald-200 bg-emerald-50/70">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="rounded-full bg-emerald-600 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
              <Home className="h-6 w-6" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Find housing help</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                If you&apos;re unhoused or at risk of losing housing, you can enter the{" "}
                <span className="font-semibold text-foreground">coordinated entry</span> system for shelter or rental
                programs.
              </p>
            </div>

            <ul className="text-sm md:text-base text-muted-foreground space-y-1">
              <li>• Try to bring any ID you have.</li>
              <li>• A shelter address or PO box helps.</li>
              <li>• Explain your current situation (where you sleep, health needs, safety issues).</li>
            </ul>

            <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-2">
              <a
                href="https://sdhc.org/homelessness-solutions/get-help/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto text-base font-semibold">
                  Housing help in San Diego
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.211.org/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="w-full sm:w-auto text-base">
                  Call 2-1-1 for more help
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* STEP 3 – Jobs from your skills */}
      <Card className="p-4 md:p-6 border-violet-200 bg-violet-50/60">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="rounded-full bg-violet-600 text-white w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="rounded-full bg-violet-100 p-2 text-violet-700">
              <Briefcase className="h-6 w-6" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Job ideas from your skills</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Use simple words. Tell us what you can do (cook, clean, talk to people, lift boxes). We&apos;ll suggest
                basic jobs in San Diego.
              </p>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="text-sm md:text-base text-foreground font-semibold">
                Describe your skills
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm md:text-base min-h-[80px] bg-white"
                placeholder="Example: I can cook for groups, clean rooms, work as a cashier, and help in a warehouse. I am reliable."
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <Button
                  onClick={() => fetchRecs(skillsText)}
                  disabled={loading || !skillsText.trim()}
                  className="w-full sm:w-auto text-base font-semibold"
                >
                  {loading ? "Finding jobs..." : "Get job ideas"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    useExample("cooking cleaning cashier landscaping warehouse reliable")
                  }
                  disabled={loading}
                  className="w-full sm:w-auto text-sm md:text-base"
                >
                  Try an example
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-1 text-xs md:text-sm">
                <QuickChip
                  label="Kitchen + cleaning"
                  onClick={() => useExample("cooking cleaning reliable")}
                />
                <QuickChip
                  label="Store / cashier"
                  onClick={() => useExample("cashier customer service friendly punctual")}
                />
                <QuickChip
                  label="Warehouse / lifting"
                  onClick={() => useExample("warehouse stocking loading unloading reliable")}
                />
                <QuickChip
                  label="Outdoor work"
                  onClick={() => useExample("landscaping yard work outdoor teamwork")}
                />
              </div>

              {error && (
                <p className="mt-2 text-xs md:text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Results */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => (
                <JobCard key={r.id} job={r} />
              ))}
              {!loading && !error && results.length === 0 && (
                <p className="text-sm md:text-base text-muted-foreground">
                  No matches yet. Type a few skills above and tap{" "}
                  <span className="font-semibold text-foreground">Get job ideas</span>.
                </p>
              )}
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
              <ClipboardCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>Jobs are simulated, but locations and pay ranges are tuned for San Diego.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Community section */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="rounded-full bg-sky-100 p-2 text-sky-700 mt-1">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Community support and events</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Free meals, health checkups, and help with documents. Times are examples for now.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <GroupCard
                title="Saturday Free Meals"
                time="Saturdays • 11:30 AM – 1:00 PM"
                place="Downtown Outreach Center"
                desc="Hot lunch and hygiene kits while supplies last."
              />
              <GroupCard
                title="Mobile Clinic – Basic Checkups"
                time="Tuesdays • 2:00 PM – 5:00 PM"
                place="Park and 12th St."
                desc="Blood pressure, basic triage, referrals for Medi-Cal enrollment."
              />
              <GroupCard
                title="Document Help and Mailing Address"
                time="Wednesdays • 10:00 AM – 12:00 PM"
                place="Community Legal Aid, 2nd floor"
                desc="Get help with IDs, benefit forms, and set up a mailing address."
              />
              <GroupCard
                title="Warm Clothing Distribution"
                time="This Friday • 5:00 PM – 7:00 PM"
                place="Center of Hope"
                desc="Coats, socks, blankets. First come, first served."
              />
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <p>This is a demo list. Later we can connect it to real events in San Diego.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function QuickChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs md:text-sm text-violet-800 hover:bg-violet-50 active:bg-violet-100 transition"
    >
      {label}
    </button>
  )
}

function JobCard({ job }: { job: ApiJob }) {
  const score = job.score ?? 0
  let scoreLabel = "Match"
  let scoreColor = "bg-slate-100 text-slate-700"

  if (score >= 4.5) {
    scoreLabel = "Strong match"
    scoreColor = "bg-emerald-100 text-emerald-800"
  } else if (score >= 3) {
    scoreLabel = "Good match"
    scoreColor = "bg-blue-100 text-blue-800"
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm md:text-base font-semibold text-foreground">
            {job.title}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground">
            {job.company} • {job.neighborhood}
          </p>
        </div>
        {score > 0 && (
          <span
            className={`text-[10px] md:text-xs rounded-full px-2.5 py-0.5 font-medium ${scoreColor}`}
          >
            {scoreLabel}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs md:text-sm text-muted-foreground">
        {job.schedule} • ${job.payMin.toFixed(2)}–${job.payMax.toFixed(2)}/hr
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] md:text-xs rounded-full bg-slate-100 px-2.5 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="mt-2 text-xs md:text-sm text-slate-700">
        {job.description}
      </p>

      {!!job.reasons?.length && (
        <ul className="mt-2 text-[11px] md:text-xs text-slate-600 list-disc pl-4 space-y-0.5">
          {job.reasons.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GroupCard({
  title,
  time,
  place,
  desc,
}: {
  title: string
  time: string
  place: string
  desc: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <h4 className="text-sm md:text-base font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs md:text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{time}</span> • {place}
      </p>
      <p className="mt-2 text-xs md:text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
