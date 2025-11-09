// app/api/jobs/route.ts
import { NextRequest } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"

export type JobRow = {
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
}

let JOBS_CACHE: JobRow[] | null = null

function parseCSV(text: string): JobRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const [header, ...rows] = lines
  const out: JobRow[] = []

  for (const line of rows) {
    const parts = line.split(",")
    if (parts.length < 13) continue

    const [
      id,
      title,
      company,
      neighborhood,
      lat,
      lng,
      schedule,
      payMin,
      payMax,
      requiredSkills,
      niceToHave,
      tags,
      description,
    ] = parts

    out.push({
      id,
      title,
      company,
      neighborhood,
      lat: Number(lat),
      lng: Number(lng),
      schedule,
      payMin: Number(payMin),
      payMax: Number(payMax),
      requiredSkills: requiredSkills ? requiredSkills.split(";").filter(Boolean) : [],
      niceToHave: niceToHave ? niceToHave.split(";").filter(Boolean) : [],
      tags: tags ? tags.split(";").filter(Boolean) : [],
      description,
    })
  }
  return out
}

async function loadJobs(): Promise<JobRow[]> {
  if (JOBS_CACHE) return JOBS_CACHE
  const csvPath = path.join(process.cwd(), "public", "jobs-sd.csv")
  const text = await fs.readFile(csvPath, "utf8")
  JOBS_CACHE = parseCSV(text)
  return JOBS_CACHE
}

// --- simple skill mapping and scoring ----

const SKILL_SYNONYMS: Record<string, string> = {
  // cooking
  cook: "cooking",
  cooking: "cooking",
  kitchen: "cooking",
  "line": "cooking",
  // cleaning
  clean: "cleaning",
  cleaning: "cleaning",
  janitor: "cleaning",
  janitorial: "cleaning",
  // cashier / retail
  cashier: "cashier",
  register: "cashier",
  "pos": "cashier",
  // customer service
  customer: "customer_service",
  "customer service": "customer_service",
  // landscaping
  landscaping: "landscaping",
  yard: "landscaping",
  gardening: "landscaping",
  groundskeeping: "landscaping",
  // warehouse / labor
  warehouse: "warehouse",
  picker: "warehouse",
  packer: "warehouse",
  shipping: "warehouse",
  loading: "warehouse",
  unloading: "warehouse",
  // stocking
  stocking: "stocking",
  stocker: "stocking",
  // soft skills
  reliable: "reliable",
  punctual: "punctual",
  teamwork: "teamwork",
  "team": "teamwork",
  friendly: "friendly",
  bilingual: "bilingual",
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
}

function mapToCanonicalSkills(text: string): string[] {
  const tokens = tokenize(text)
  const set = new Set<string>()

  for (let i = 0; i < tokens.length; i++) {
    const w1 = tokens[i]
    const w2 = i < tokens.length - 1 ? `${w1} ${tokens[i + 1]}` : ""

    if (SKILL_SYNONYMS[w2]) set.add(SKILL_SYNONYMS[w2])
    if (SKILL_SYNONYMS[w1]) set.add(SKILL_SYNONYMS[w1])
  }

  return Array.from(set)
}

function scoreJob(job: JobRow, skills: string[]) {
  let score = 0
  const reasons: string[] = []

  const reqMatched = job.requiredSkills.filter((s) => skills.includes(s))
  const niceMatched = job.niceToHave.filter((s) => skills.includes(s))

  if (reqMatched.length) {
    score += reqMatched.length * 2
    reasons.push(`Matches required skills: ${reqMatched.join(" ")}`)
  }

  if (niceMatched.length) {
    score += niceMatched.length * 1
    reasons.push(`Matches additional skills: ${niceMatched.join(" ")}`)
  }

  const softSet = new Set(["reliable", "punctual", "teamwork", "friendly", "bilingual"])
  const softMatched = skills.filter((s) => softSet.has(s))
  if (softMatched.length) {
    score += 0.5 * softMatched.length
    reasons.push(`Soft skills: ${softMatched.join(" ")}`)
  }

  return { score, reasons }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const skillsText = (url.searchParams.get("skills") || "").trim()
    const limit = Number(url.searchParams.get("limit") || 12)

    const jobs = await loadJobs()

    // If no skills provided, just return some jobs
    if (!skillsText) {
      return Response.json(jobs.slice(0, limit), {
        headers: { "Cache-Control": "public, max-age=120" },
      })
    }

    const skills = mapToCanonicalSkills(skillsText)

    const scored = jobs
      .map((job) => {
        const { score, reasons } = scoreJob(job, skills)
        return { job, score, reasons }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || b.reasons.length - a.reasons.length)
      .slice(0, limit)
      .map((r) => ({
        ...r.job,
        score: Number(r.score.toFixed(1)),
        reasons: r.reasons,
      }))

    return Response.json(scored, {
      headers: { "Cache-Control": "public, max-age=60" },
    })
  } catch (e: any) {
    return new Response(`jobs API error: ${e?.message || e}`, { status: 500 })
  }
}
