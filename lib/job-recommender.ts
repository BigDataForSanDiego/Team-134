// lib/job-recommender.ts

export type JobTemplate = {
  id: string
  title: string
  tags: string[]
  requiredSkills: string[]
  niceToHave?: string[]
  blurb: string
}

export type Recommendation = JobTemplate & {
  score: number
  reasons: string[]
}

// 1) SKILLS TAXONOMY (synonyms → canonical skill)
const SKILL_SYNONYMS: Record<string, string> = {
  // cooking
  cook: "cooking",
  cooking: "cooking",
  "food prep": "cooking",
  kitchen: "cooking",
  "line cook": "cooking",
  chef: "cooking",

  // cleaning / janitorial
  clean: "cleaning",
  cleaning: "cleaning",
  janitor: "cleaning",
  janitorial: "cleaning",
  sanitize: "cleaning",

  // cashier / retail
  cashier: "cashier",
  register: "cashier",
  "point of sale": "cashier",
  "pos": "cashier",
  "customer service": "customer_service",
  "stocking": "stocking",

  // landscaping / outdoor
  landscaping: "landscaping",
  yard: "landscaping",
  gardening: "landscaping",
  groundskeeping: "landscaping",
  shovel: "landscaping",
  rake: "landscaping",

  // warehouse / labor
  warehouse: "warehouse",
  picker: "warehouse",
  packer: "warehouse",
  shipping: "warehouse",
  loading: "warehouse",
  unloading: "warehouse",
  forklift: "warehouse",

  // soft skills
  reliable: "reliable",
  punctual: "punctual",
  teamwork: "teamwork",
  "team player": "teamwork",
  friendly: "friendly",
  bilingual: "bilingual",
}

// 2) JOB TEMPLATES
export const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: "kitchen-asst",
    title: "Kitchen Assistant (Shelter / Community Center)",
    tags: ["Cooking", "Food Prep", "Part-time"],
    requiredSkills: ["cooking", "cleaning"],
    niceToHave: ["customer_service", "reliable", "punctual"],
    blurb:
      "Helps prepare meals, basic food handling, and cleaning. Often no resume required.",
  },
  {
    id: "janitorial",
    title: "Janitorial / Facilities Helper",
    tags: ["Cleaning", "Evenings", "Entry-level"],
    requiredSkills: ["cleaning"],
    niceToHave: ["reliable", "punctual", "teamwork"],
    blurb:
      "Basic facility cleaning and light maintenance with supervision.",
  },
  {
    id: "cashier",
    title: "Cashier / Convenience Store",
    tags: ["Customer Service", "Cash Handling"],
    requiredSkills: ["cashier", "customer_service"],
    niceToHave: ["reliable", "friendly", "bilingual"],
    blurb:
      "Greet customers, operate a simple POS. Short paid training usually provided.",
  },
  {
    id: "landscaping",
    title: "Landscaping Crew",
    tags: ["Outdoor", "Teamwork"],
    requiredSkills: ["landscaping"],
    niceToHave: ["cleaning", "teamwork", "reliable"],
    blurb:
      "Yard cleanup, raking, simple planting. Tools and training provided.",
  },
  {
    id: "warehouse",
    title: "Warehouse Associate (Picker/Packer)",
    tags: ["Entry-level", "Shifts", "Training"],
    requiredSkills: ["warehouse"],
    niceToHave: ["stocking", "teamwork", "reliable"],
    blurb:
      "Pick/pack items, basic inventory and shipping support. Safety training on site.",
  },
]

// 3) NORMALIZATION
function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
}

function mapToCanonicalSkills(tokens: string[]): string[] {
  const mapped = new Set<string>()
  // exact word matches and simple 2-word scans
  for (let i = 0; i < tokens.length; i++) {
    const w1 = tokens[i]
    const w2 = i < tokens.length - 1 ? `${w1} ${tokens[i + 1]}` : ""

    if (SKILL_SYNONYMS[w2]) mapped.add(SKILL_SYNONYMS[w2])
    if (SKILL_SYNONYMS[w1]) mapped.add(SKILL_SYNONYMS[w1])
  }
  return Array.from(mapped)
}

// 4) SCORING
export function recommendJobs(freeText: string, topN = 4): Recommendation[] {
  const tokens = tokenize(freeText)
  const skills = mapToCanonicalSkills(tokens)

  const softSkills = new Set(["reliable", "punctual", "teamwork", "friendly", "bilingual"])

  const recs: Recommendation[] = JOB_TEMPLATES.map((job) => {
    let score = 0
    const reasons: string[] = []

    // required skills (weight 2)
    const reqMatched = job.requiredSkills.filter((s) => skills.includes(s))
    score += reqMatched.length * 2
    if (reqMatched.length) reasons.push(`Matches required: ${reqMatched.join(", ")}`)

    // nice to have (weight 1)
    const niceMatched = (job.niceToHave || []).filter((s) => skills.includes(s))
    score += niceMatched.length * 1
    if (niceMatched.length) reasons.push(`Nice-to-have: ${niceMatched.join(", ")}`)

    // soft skill boost
    const softMatched = skills.filter((s) => softSkills.has(s))
    if (softMatched.length) {
      score += 0.5 * softMatched.length
      reasons.push(`Soft skills: ${softMatched.join(", ")}`)
    }

    return { ...job, score, reasons }
  })

  // sort by score desc, then by #reasons
  recs.sort((a, b) => (b.score - a.score) || (b.reasons.length - a.reasons.length))

  return recs.slice(0, topN)
}
