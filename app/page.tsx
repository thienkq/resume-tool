"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Minus,
  Download,
  MapPin,
  User,
  GraduationCap,
  Zap,
  Briefcase,
  ChevronUp,
  Lightbulb,
  ShieldCheck,
  Code,
  Mail,
  Phone,
  Globe,
  Github,
} from "lucide-react"
// Removed: import html2pdf from "html2pdf.js"

interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string
  technologies: string
}

interface Education {
  id: string
  institution: string
  degree: string
  year: string
}

interface Skill {
  id: string
  name: string
  years: string
}

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    website: string
    github?: string // Added optional github
  }
  professionalSummary: string
  expertise: Skill[] // Changed to Skill[] for tag-like display
  experience: Experience[]
  skills: string // Changed to string for direct text input
  education: Education[]
  awards: any[] // Renamed Award to any to avoid redeclaration
}

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1 (123) 456-7890",
      location: "San Francisco, CA",
      website: "https://janedoe.dev",
      github: "https://github.com/janedoe", // Default for github
    },
    professionalSummary:
      "Highly motivated and results-oriented Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in full-stack development, cloud platforms, and agile methodologies. Passionate about building innovative solutions and contributing to high-performing teams.",
    expertise: [
      { id: "1", name: "Full-stack Development", years: "5" },
      { id: "2", name: "Cloud Platforms (AWS, Azure)", years: "3" },
      { id: "3", name: "Agile Methodologies", years: "5" },
      { id: "4", name: "Microservices Architecture", years: "2" },
      { id: "5", name: "RESTful APIs", years: "4" },
    ], // Default expertise as skills
    experience: [
      {
        id: "1",
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        duration: "Jan 2022 - Present",
        description: `• Led the development of a new microservices architecture, improving system scalability by 40% and reducing latency by 25%.
• Designed and implemented RESTful APIs using Node.js and Express, serving over 1 million daily requests.
• Mentored junior developers and conducted code reviews, ensuring high code quality and adherence to best practices.
• Collaborated with product managers and UX designers to translate requirements into technical specifications.`,
        technologies: "Node.js, React, TypeScript, AWS, Docker, Kubernetes, PostgreSQL",
      },
      {
        id: "2",
        company: "Innovate Corp.",
        position: "Software Engineer",
        duration: "Jun 2019 - Dec 2021",
        description: `• Developed and maintained features for a customer-facing web application using React and Redux.
• Optimized database queries and improved application performance, leading to a 15% reduction in load times.
• Participated in daily stand-ups, sprint planning, and retrospective meetings in an Agile environment.
• Wrote comprehensive unit and integration tests to ensure software reliability.`,
        technologies: "React, Redux, Python, Django, MySQL, Git",
      },
    ],
    skills:
      "Programming: Python, Java, JavaScript, C++\nFrameworks: React, Spring Boot, Node.js\nTools: Docker, Git, Jenkins, Postman\nTesting: Selenium, JUnit, Cypress\nCloud: AWS, Azure", // Default skills as a string with newlines
    education: [
      {
        id: "1",
        institution: "University of California, Berkeley",
        degree: "Master of Science in Computer Science",
        year: "2019",
      },
      {
        id: "2",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2017",
      },
    ],
    awards: [
      {
        id: "1",
        title: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services",
        year: "2023",
        description:
          "Validated expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
      },
      {
        id: "2",
        title: "Dean's List",
        issuer: "University of California, Berkeley",
        year: "2015, 2016, 2017",
        description: "Recognized for outstanding academic achievement.",
      },
    ],
  })

  const [verifiedBadgeText, setVerifiedBadgeText] = useState("Verified Expert in Engineering")
  const [professionalTitle, setProfessionalTitle] = useState("Software Developer")

  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(resumeData, null, 2))
  const [activeTab, setActiveTab] = useState<string>("form")

  const previewRef = useRef<HTMLDivElement>(null)

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: "",
      technologies: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const addExpertise = () => {
    setResumeData((prev) => ({
      ...prev,
      expertise: [...prev.expertise, { id: Date.now().toString(), name: "", years: "" }],
    }))
  }

  const removeExpertise = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((exp) => exp.id !== id),
    }))
  }

  const updateExpertise = (id: string, field: keyof Skill, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      expertise: prev.expertise.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addAward = () => {
    const newAward: any = {
      id: Date.now().toString(),
      title: "",
      issuer: "",
      year: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      awards: [...prev.awards, newAward],
    }))
  }

  const removeAward = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.filter((award) => award.id !== id),
    }))
  }

  const updateAward = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
    }))
  }

  const renderLucideIcon = (IconComponent: React.ElementType, className: string, size = 18) => {
    const iconMap: { [key: string]: string } = {
      CheckCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`,
      ShieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path>`,
      MapPin: `<path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>`,
      Code: `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`,
      Briefcase: `<rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>`,
      User: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>`,
      GraduationCap: `<path d="M21.43 10.92V8.5L12 2 2.57 8.5v2.42"></path><path d="M2.57 12.42v3.91L12 22l9.43-5.67v-3.91"></path><path d="M12 2v20"></path>`,
      Zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>`,
      ChevronUp: `<path d="m18 15-6-6-6 6"></path>`,
      Lightbulb: `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path>`,
      CalendarDays: `<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path>`,
      Mail: `<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>`,
      Phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-0.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-0.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>`,
      Globe: `<circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>`,
      Github: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.5-.4 7.1-1.7 7.1-7.5 0-1.6-.6-3-1.6-4-.1-.5-.8-1.9 0-2.4 0 0 1.2-.4 4 1.5 0 0 2.3-.6 4.5-.6.3 0 .7 0 1 0 2.2 0 4.5.6 4.5.6 0 .5-.7 1.9 0 2.4 1 1 1.6 2.4 1.6 4 0 5.8-3.6 7.1-7.1 7.5.4.3.8 1 1 2.2v4"></path><path d="M9 19c-2.3 0-4.5-1.3-4.5-4.5 0-3.2 2.2-4.5 4.5-4.5s4.5 1.3 4.5 4.5c0 3.2-2.2 4.5-4.5 4.5z"></path>`,
    }

    const pathData = iconMap[IconComponent.displayName || ""] || ""

    return `<svg class="${className}" width="${size}" height="${size}" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              ${pathData}
            </svg>`
  }

  const generateResumeHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: white;
            padding: 40px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .name {
            font-size: 2.5rem;
            font-weight: 900;
            color: #2563eb;
            margin-bottom: 12px;
            letter-spacing: -0.025em;
        }
        
        .verified-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #dcfce7;
            color: #166534;
            padding: 4px 4px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 1rem;
            color: #4b5563;
        }
        
        .info-icon {
            width: 18px;
            height: 18px;
            color: #6b7280;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid; /* Prevent section from breaking */
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            
        }
        .section-underline {
          border-bottom: 1px solid #cacfd8;
          padding-bottom: 5px;
        }
        
        .section-icon {
            width: 18px;
            height: 18px;
            color: #2563eb;
            flex-shrink: 0;
        }
        
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 24px;
        }
        
        .skill-tag {
            background: #dbeafe;
            color: #1d4ed8;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            border: 1px solid #bfdbfe;
        }
        
        .bio-text {
            font-size: 1rem;
            line-height: 1.7;
            color: #374151;
            margin-bottom: 32px;
            padding-bottom:10px;
            border-bottom: 1px solid #f3f4f6;
        }

        .two-column {
            display: grid;
            flex-wrap: wrap;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 20px;
        }

        .two-column > div {
            flex: 1 1 48%; /* Allow wrapping */
            box-sizing: border-box;
        }
        
        .experience-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .experience-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 0.75rem;
            font-weight: 500;
            border: 1px solid #d1d5db;
        }
        
        .work-experience {
            margin-top: 32px;
        }
        
        .work-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 0px;
        }
        
        .work-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
        }
        
        .timeline {
            position: relative;
            padding-left: 32px;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e5e7eb;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 32px;
            padding-bottom: 24px;
            page-break-inside: avoid; /* Prevent individual job entry from breaking */
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -28px;
            top: 4px;
            width: 12px;
            height: 12px;
            background: #2563eb;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 2px #2563eb;
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .job-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 4px;
        }
        
        .company-name {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 12px;
        }
        
        .job-duration {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
            white-space: nowrap;
        }
        
        .job-description {
            margin-bottom: 16px;
        }
        
        .job-description ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        
        .job-description li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            color: #4b5563;
            line-height: 1.6;
        }
        
        .job-description li::before {
            content: '•';
            position: absolute;
            left: 0;
            top: 0;
            color: #2563eb;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .job-description p {
            margin-bottom: 8px;
            color: #4b5563;
            line-height: 1.6;
        }
        
        .tech-stack {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }
        
        .tech-stack strong {
            color: #374151;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .header-left {
            flex: 1;
        }

        .header-right {
            flex-shrink: 0;
            margin-left: 40px;
        }

        .company-logo {
            opacity: 0.9;
        }

        .education-item {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
        }

        .education-item:last-child {
            border-bottom: none;
        }

        .education-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 4px;
        }

        .education-institution {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 4px;
            font-style: italic;
        }

        .education-year {
            font-size: 0.875rem;
            color: #9ca3af;
            font-weight: 500;
        }

        .award-item {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
            page-break-inside: avoid; /* Prevent individual award entry from breaking */
        }

        .award-item:last-child {
            border-bottom: none;
        }

        .award-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .award-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 4px;
        }

        .award-issuer {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 4px;
            font-style: italic;
        }

        .award-year {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
          white-space: nowrap;
        }

        .award-description {
            font-size: 0.875rem;
            color: #4b5563;
            line-height: 1.5;
        }

        .section-skill {
            page-break-before: always;
            break-before: page; /* For better browser support */
        }
        
        /* New styles for the two-column header layout */
        .header-main-content {
            display: flex;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
            gap: 20px; /* Space between columns */
            justify-content: space-between;
        }

        .header-main-content > div {
            flex: 1; /* Distribute space evenly */
            min-width: 250px; /* Minimum width before wrapping */
        }

        .header-main-content .left-column {
            display: flex;
            flex-direction: column;
        }

        .header-main-content .right-column {
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start */
        }

        .skills-list-text { /* New style for the skills section */
            font-size: 1rem;
            line-height: 1.7;
            color: #374151;
        }

        /* Print-specific styles for A4 and page breaks */
        @media print {
            @page {
                size: A4;
                margin: 10mm; /* Adjust margins as needed */
            }
            body {
                padding: 0;
                margin: 0;
                box-shadow: none;
                background-color: white;
            }
            .container {
                box-shadow: none;
                border-radius: 0;
                margin: 0;
                max-width: none;
                width: 100%;
            }
            .header, .content {
                padding: 20px; /* Adjust padding for print */
            }
            .section {
                margin-bottom: 20px; /* Adjust section spacing for print */
                page-break-after: auto; /* Force new page after each major section */
            }
            .section:last-child {
                page-break-after: auto; /* No page break after the very last section */
            }

            .section-skill {
                 page-break-before: always;
                break-before: page; /* For better browser support */
                 
            }
            
            /* Ensure images are visible in print */
            img {
                display: block;
                max-width: 100%;
                height: auto;
            }

           .two-column {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 40px;
                page-break-inside: avoid;
            }

            .two-column > div {
                flex: 1 1 48%;
                page-break-inside: avoid;
                break-inside: avoid;
            }

            /* Ensure header columns stay side-by-side in print */
            .header-main-content {
              display: grid !important;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              page-break-inside: avoid;
              break-inside: avoid;
            }

            .header-main-content .left-column,
            .header-main-content .right-column {
              display: block !important;
            }

            .job-header {
              display: grid !important;
              grid-template-columns: 1fr auto;
              align-items: start;
              margin-bottom: 8px;
              gap: 16px;
              page-break-inside: avoid;
              break-inside: avoid;
            }

        }

        @media (max-width: 768px) {
            .two-column {
                grid-template-columns: 1fr;
                gap: 24px;
            }
            
            .job-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .job-duration {
                margin-top: 4px;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .container {
                margin: 0;
                border-radius: 0;
            }
            
            body {
                padding: 0;
                background: white;
            }

            .header-main-content {
                flex-direction: column; /* Stack columns on small screens */
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="header-left">
                    <h1 class="name">${resumeData.personalInfo.fullName}</h1>
                    
                    <div class="verified-badge">
                        ${renderLucideIcon(ShieldCheck, "verified-icon", 16)}
                        ${verifiedBadgeText}
                    </div>
                    
                    <div class="header-main-content">
                        <div class="left-column">
                            <div class="info-item">
                                ${renderLucideIcon(Code, "info-icon", 18)}
                                <span>${professionalTitle}</span>
                            </div>
                            ${
                              resumeData.personalInfo.email
                                ? `
                            <div class="info-item">
                                ${renderLucideIcon(Mail, "info-icon", 18)}
                                <span>${resumeData.personalInfo.email}</span>
                            </div>
                            `
                                : ""
                            }
                            ${
                              resumeData.personalInfo.phone
                                ? `
                            <div class="info-item">
                                ${renderLucideIcon(Phone, "info-icon", 18)}
                                <span>${resumeData.personalInfo.phone}</span>
                            </div>
                            `
                                : ""
                            }
                        </div>
                        <div class="right-column">
                            ${
                              resumeData.personalInfo.location
                                ? `
                            <div class="info-item">
                                ${renderLucideIcon(MapPin, "info-icon", 18)}
                                <span>${resumeData.personalInfo.location}</span>
                            </div>
                            `
                                : ""
                            }
                            ${
                              resumeData.personalInfo.website
                                ? `
                            <div class="info-item">
                                ${renderLucideIcon(Globe, "info-icon", 18)}
                                <a href="${resumeData.personalInfo.website}" target="_blank" rel="noopener noreferrer">${resumeData.personalInfo.website}</a>
                            </div>
                            `
                                : ""
                            }
                            
                        </div>
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="company-logo">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7oW6XvR5vf46b40SEVtBgza4AV_5X1LqRA&s" alt="Company Logo" style="height: 50px;">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content">
            ${
              resumeData.professionalSummary
                ? `
            <div class="section">
                <h2 class="section-title">
                    ${renderLucideIcon(User, "section-icon", 18)}
                    Bio
                </h2>
                <p class="bio-text">${resumeData.professionalSummary}</p>
            </div>
            `
                : ""
            }
            
            <div class="two-column section">
                <div>
                    <h2 class="section-title">
                        ${renderLucideIcon(GraduationCap, "section-icon", 18)}
                        Education
                    </h2>
                    ${resumeData.education
                      .filter((edu) => edu.institution || edu.degree)
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <div class="education-title">${edu.degree || "Degree"}</div>
                            <div class="education-institution">${edu.institution || "Institution"}</div>
                            <div class="education-year">${edu.year || "Year"}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                
                <div>
                    <h2 class="section-title">
                        ${renderLucideIcon(Zap, "section-icon", 18)}
                        Expertise
                    </h2>
                    <div class="skills-container">
                        ${resumeData.expertise
                          .filter((exp) => exp.name.trim())
                          .map(
                            (exp) => `
                            <span class="skill-tag">${exp.name}${exp.years ? ` - ${exp.years} years` : ""}</span>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            
            ${
              resumeData.experience.some((exp) => exp.company && exp.position)
                ? `
            <div class="work-experience section">
                <div class="work-header section-underline">
                    <h2 class="work-title">
                        ${renderLucideIcon(Briefcase, "section-icon", 18)}
                        Work Experience
                    </h2>
                </div>
                
                <div class="timeline">
                    ${resumeData.experience
                      .filter((exp) => exp.company && exp.position)
                      .map(
                        (exp) => `
                        <div class="timeline-item">
                            <div class="job-header">
                                <div>
                                    <div class="job-title">${exp.position}</div>
                                    <div class="company-name">${exp.company}</div>
                                </div>
                                <div class="job-duration">${exp.duration || "2020 - PRESENT"}</div>
                            </div>
                            
                            ${
                              exp.description
                                ? `
                            <div class="job-description">
                                <ul>
                                    ${exp.description
                                      .split("\n")
                                      .filter((line) => line.trim())
                                      .map((line) => {
                                        const cleanLine = line.replace(/^[•\-*]\s*/, "").trim()
                                        return cleanLine ? `<li>${cleanLine}</li>` : ""
                                      })
                                      .filter((line) => line)
                                      .join("")}
                                </ul>
                            </div>
                            `
                                : ""
                            }
                            
                            <div class="tech-stack">
                                <strong>Technologies:</strong> ${exp.technologies || "Various technologies"}
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            `
                : ""
            }

            ${
              resumeData.skills
                ? `
            <div class="section section-skill">
                <h2 class="section-title section-underline">
                    ${renderLucideIcon(Lightbulb, "section-icon", 18)}
                    Skills
                </h2>
                <p class="skills-list-text">
                    ${resumeData.skills.replace(/\n/g, "<br>")}
                </p>
            </div>
            `
                : ""
            }

            ${
              resumeData.awards.some((award) => award.title || award.issuer)
                ? `
            <div class="section">
                <h2 class="section-title section-underline">
                    ${renderLucideIcon(Lightbulb, "section-icon", 18)}
                    Awards & Certificates
                </h2>
                ${resumeData.awards
                  .filter((award) => award.title || award.issuer)
                  .map(
                    (award) => `
                    <div class="award-item">
                      <div class="award-header">
                        <div>
                          <div class="award-title">${award.title || "Award Title"}</div>
                          <div class="award-issuer">${award.issuer || "Issuer"}</div>
                        </div>
                        <div class="award-year">${award.year || "Year"}</div>
                      </div>
                      ${award.description ? `<div class="award-description">${award.description}</div>` : ""}
                    </div>
                `,
                  )
                  .join("")}
            </div>
            `
                : ""
            }
        </div>
    </div>
</body>
</html>
    `.trim()
  }

  const exportToPDFWithPrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(generateResumeHTML())
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  const handleJsonLoad = () => {
    try {
      const parsedData: ResumeData = JSON.parse(jsonInput)
      // Validate that expertise is an array and skills is a string
      if (
        parsedData.personalInfo &&
        parsedData.experience &&
        typeof parsedData.skills === "string" && // Validate skills as string
        parsedData.education &&
        Array.isArray(parsedData.expertise)
      ) {
        setResumeData(parsedData)
        toast({
          title: "Success!",
          description: "Resume data loaded from JSON.",
          variant: "success",
        })
        setActiveTab("form")
      } else {
        throw new Error(
          "Invalid JSON structure. Please ensure it matches the resume data format, especially the 'expertise' field being an array and 'skills' being a string.",
        )
      }
    } catch (error: any) {
      toast({
        title: "Error loading JSON",
        description: error.message || "Please check your JSON syntax.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Editor Panel - 2/5 width */}
        <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-gray-600">Create a beautiful, professional resume</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={exportToPDFWithPrint}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  Export to PDF (Print)
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Form Editor</TabsTrigger>
                <TabsTrigger value="json">JSON Input</TabsTrigger>
              </TabsList>
              <TabsContent value="form" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                          }))
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="professionalTitle">Professional Title</Label>
                      <Input
                        id="professionalTitle"
                        value={professionalTitle}
                        onChange={(e) => setProfessionalTitle(e.target.value)}
                        placeholder="Software Developer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="verifiedBadgeText">Verified Badge Text</Label>
                      <Input
                        id="verifiedBadgeText"
                        value={verifiedBadgeText}
                        onChange={(e) => setVerifiedBadgeText(e.target.value)}
                        placeholder="Verified Expert in Engineering"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value },
                          }))
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value },
                          }))
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, location: e.target.value },
                          }))
                        }
                        placeholder="New York, NY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, website: e.target.value },
                          }))
                        }
                        placeholder="https://johndoe.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub Profile (Optional)</Label>
                      <Input
                        id="github"
                        value={resumeData.personalInfo.github || ""}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, github: e.target.value },
                          }))
                        }
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={resumeData.professionalSummary}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          professionalSummary: e.target.value,
                        }))
                      }
                      placeholder="Write a brief professional summary..."
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Expertise */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Expertise</CardTitle>
                      <Button onClick={addExpertise} size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Expertise
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.expertise.map((exp, index) => (
                      <div key={exp.id} className="space-y-2 p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-sm">Expertise {index + 1}</h5>
                          {resumeData.expertise.length > 1 && (
                            <Button onClick={() => removeExpertise(exp.id)} size="sm" variant="outline">
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Expertise Name</Label>
                            <Input
                              value={exp.name}
                              onChange={(e) => updateExpertise(exp.id, "name", e.target.value)}
                              placeholder="React"
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Years</Label>
                            <Input
                              value={exp.years}
                              onChange={(e) => updateExpertise(exp.id, "years", e.target.value)}
                              placeholder="3"
                              className="h-8"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Professional Experience</CardTitle>
                      <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="space-y-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience {index + 1}</h4>
                          {resumeData.experience.length > 1 && (
                            <Button
                              onClick={() => removeExperience(exp.id)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Minus className="w-4 h-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Duration</Label>
                            <Input
                              value={exp.duration}
                              onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                              placeholder="Jan 2020 - Present"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Technologies</Label>
                            <Input
                              value={exp.technologies}
                              onChange={(e) => updateExperience(exp.id, "technologies", e.target.value)}
                              placeholder="React, Node.js, PostgreSQL, AWS"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="skills">Skills (each line will be a new line in the resume)</Label>
                      <Textarea
                        id="skills"
                        value={resumeData.skills}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            skills: e.target.value,
                          }))
                        }
                        placeholder="Programming: Python, Java, JavaScript, C++
Frameworks: React, Spring Boot, Node.js
Tools: Docker, Git, Jenkins, Postman
Testing: Selenium, JUnit, Cypress
Cloud: AWS, Azure"
                        rows={5}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Education</CardTitle>
                      <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Education {index + 1}</h4>
                          {resumeData.education.length > 1 && (
                            <Button
                              onClick={() => removeEducation(edu.id)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Minus className="w-4 h-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                              placeholder="2020"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Awards & Certificates */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Awards & Certificates</CardTitle>
                      <Button onClick={addAward} size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.awards.map((award, index) => (
                      <div key={award.id} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Award {index + 1}</h4>
                          {resumeData.awards.length > 1 && (
                            <Button
                              onClick={() => removeAward(award.id)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Minus className="w-4 h-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={award.title}
                              onChange={(e) => updateAward(award.id, "title", e.target.value)}
                              placeholder="Award/Certificate Title"
                            />
                          </div>
                          <div>
                            <Label>Issuer</Label>
                            <Input
                              value={award.issuer}
                              onChange={(e) => updateAward(award.id, "issuer", e.target.value)}
                              placeholder="Issuing Organization"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={award.year}
                              onChange={(e) => updateAward(award.id, "year", e.target.value)}
                              placeholder="2023"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={award.description}
                              onChange={(e) => updateAward(award.id, "description", e.target.value)}
                              placeholder="Brief description (optional)"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="json" className="space-y-4">
                <Label htmlFor="json-input">Paste Resume JSON Here</Label>
                <Textarea
                  id="json-input"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={JSON.stringify(resumeData, null, 2)}
                  rows={25}
                  className="font-mono text-sm"
                />
                <Button onClick={handleJsonLoad} className="w-full">
                  Load JSON Data
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preview Panel - 3/5 width */}
        <div className="w-3/5 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <div
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
              ref={previewRef}
              style={{
                width: "210mm", // A4 width
                minHeight: "297mm", // A4 height
                margin: "0 auto",
                border: "1px solid #e0e0e0",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              }}
              dangerouslySetInnerHTML={{ __html: generateResumeHTML() }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
