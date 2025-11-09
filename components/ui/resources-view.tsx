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
    setError(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({ skills: text, limit: "12" })
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

  return (
    <div className="space-y-6 pb-4">
      <header className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Resources</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Programs and tools that can help you get health coverage, housing, work opportunities, and local support.
        </p>
      </header>

      {/* 1) Health & Housing eligibility */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <HandHeart className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold">You may qualify for Medi-Cal</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Many unhoused neighbors qualify for{" "}
              <span className="font-medium text-foreground">low or no-cost health coverage</span> in California.
              Common eligibility factors include very low or no income and CA residency.
            </p>

            <ul className="mt-3 text-xs md:text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>
                What you may need: a way to verify identity, California address (shelter or mailing address ok), and
                income status (can be 0 dollars).
              </li>
              <li>Enrollment help is usually available at clinics, county offices, and community orgs.</li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.dhcs.ca.gov/Medi-Cal/Pages/qualify.aspx"
                target="_blank"
                rel="noreferrer"
              >
                <Button>
                  Start Medi-Cal screening
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>

              <a
                href="https://benefitscal.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline">
                  Apply on BenefitsCal
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4" />
              <p>This is informational only. Exact eligibility depends on county review and program rules.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Home className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold">Housing assistance</h3>
              <p className="text-sm text-muted-foreground mt-1">
                If you&apos;re currently unhoused or at risk, you may qualify for coordinated entry, emergency
                shelter, or rental programs.
              </p>
              <ul className="mt-3 text-xs md:text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>
                  What helps: a local contact address (shelter or PO box), ID if available, and any documents showing
                  current situation.
                </li>
                <li>Every county routes through a coordinated entry system for fair access to housing resources.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://sdhc.org/homelessness-solutions/get-help/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>
                    Find housing help San Diego
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="https://www.211.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">
                    Call 2 1 1 for local resources
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2) Job recommender using CSV + API */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold">Job ideas from your skills</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tell us what you can do cooking, cleaning, repairs, customer service, basic computer use. We&apos;ll match
              you with simple jobs in San Diego.
            </p>

            <div className="mt-4">
              <label className="text-xs md:text-sm text-foreground font-medium">
                Describe your skills
              </label>
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm min-h-[80px]"
                placeholder="e.g., I can cook for groups, clean rooms, work as a cashier, and do simple landscaping."
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  onClick={() => fetchRecs(skillsText)}
                  disabled={loading || !skillsText.trim()}
                >
                  {loading ? "Finding matches..." : "Get recommendations"}
                </Button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => (
                <JobCard
                  key={r.id}
                  job={r}
                />
              ))}
              {!loading && !error && results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No matches yet. Describe your skills above and tap Get recommendations.
                </p>
              )}
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <ClipboardCheck className="mt-0.5 h-4 w-4" />
              <p>
                Jobs are simulated 
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3) Community groups & events (mock) */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold">Community support and events</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Find local groups that offer meals, supplies, health checkups, or legal aid.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                place="Community Legal Aid 2nd floor"
                desc="Get help with IDs, benefit forms, and set up a mailing address."
              />
              <GroupCard
                title="Warm Clothing Distribution"
                time="This Friday • 5:00 PM – 7:00 PM"
                place="Center of Hope"
                desc="Coats, socks, blankets. First come, first served."
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <p>This is a demo list. We can connect it to real feeds later.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function JobCard({ job }: { job: ApiJob }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-foreground">
          {job.title}{" "}
          <span className="font-normal text-muted-foreground">– {job.company}</span>
        </h4>
        {typeof job.score === "number" && (
          <span className="text-xs rounded bg-slate-100 px-2 py-0.5">
            Score {job.score.toFixed(1)}
          </span>
        )}
      </div>

      <p className="mt-0.5 text-xs text-muted-foreground">
        {job.neighborhood} • {job.schedule} • ${job.payMin.toFixed(2)}–${job.payMax.toFixed(2)}/hr
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span key={t} className="text-xs rounded-full bg-slate-100 px-2.5 py-0.5">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {job.description}
      </p>

      {!!job.reasons?.length && (
        <ul className="mt-2 text-xs text-slate-600 list-disc pl-5 space-y-0.5">
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
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs md:text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{time}</span> • {place}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
