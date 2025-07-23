export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  technologies: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  year: string
}

export interface Skill {
  id: string
  name: string
  years: string
}

export interface Award {
  id: string
  title: string
  issuer: string
  year: string
  description: string
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website: string
  github?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  expertise: Skill[]
  experience: Experience[]
  skills: string
  education: Education[]
  awards: Award[]
}
