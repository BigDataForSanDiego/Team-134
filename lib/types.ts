export interface Shelter {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  capacity: number
  availableBeds: number
  services: string[]
  hours: string
  description: string
}

export interface UserProfile {
  id: string
  name: string
  dateOfBirth: string
  emergencyContact?: string
  emergencyPhone?: string
  notes?: string
}

export interface MedicalRecord {
  id: string
  date: string
  type: "checkup" | "medication" | "emergency" | "vaccination"
  description: string
  provider?: string
  notes?: string
}

export interface AssistanceRecord {
  id: string
  date: string
  type: "food" | "shelter" | "medical" | "clothing" | "other"
  location: string
  description: string
}

export interface NewsItem {
  id: string
  title: string
  date: string
  category: "resource" | "event" | "alert" | "update"
  content: string
  link?: string
}
