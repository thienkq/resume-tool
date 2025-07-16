"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Download } from "lucide-react"

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

interface Award {
  id: string
  title: string
  issuer: string
  year: string
  description: string
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
  }
  professionalSummary: string
  experience: Experience[]
  skills: Skill[]
  education: Education[]
  awards: Award[]
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
    },
    professionalSummary: "",
    experience: [{ id: "1", company: "", position: "", duration: "", description: "", technologies: "" }],
    skills: [{ id: "1", name: "", years: "" }],
    education: [{ id: "1", institution: "", degree: "", year: "" }],
    awards: [{ id: "1", title: "", issuer: "", year: "", description: "" }],
  })

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

  const addAward = () => {
    const newAward: Award = {
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

  const updateAward = (id: string, field: keyof Award, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
    }))
  }

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: "", years: "" }],
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
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
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 20px;
        }
        
        .verified-icon {
            width: 16px;
            height: 16px;
            fill: currentColor;
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
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
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
        }
        
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
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
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
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
            opacity: 0.8;
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
                        <svg class="verified-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified Expert in Engineering
                    </div>
                    
                    <div class="info-item">
                        <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                        <span>Software Developer</span>
                    </div>
                    
                    ${
                      resumeData.personalInfo.location
                        ? `
                    <div class="info-item">
                        <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>${resumeData.personalInfo.location}</span>
                    </div>
                    `
                        : ""
                    }
                    
                    <div class="info-item">
                        <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"/>
                        </svg>
                        <span>CoderPush member since June 25, 2018</span>
                    </div>
                </div>
                
                <div class="header-right">
                    <div class="company-logo">
                        <img src="/coderpush-logo.png" alt="Company Logo" style="height: 40px;">
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
                    <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Bio
                </h2>
                <p class="bio-text">${resumeData.professionalSummary}</p>
            </div>
            `
                : ""
            }
            
            <div class="two-column">
                <div>
                    <h2 class="section-title">
                        <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                        </svg>
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
                        <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Experience
                    </h2>
                    <div class="experience-tags">
                        ${resumeData.skills
                          .filter((skill) => skill.name.trim())
                          .slice(0, 6)
                          .map(
                            (skill) => `
                            <span class="experience-tag">${skill.name}${skill.years ? ` - ${skill.years} years` : ""}</span>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            
            ${
              resumeData.experience.some((exp) => exp.company && exp.position)
                ? `
            <div class="work-experience">
                <div class="work-header">
                    <h2 class="work-title">
                        <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h6M9 7h6m-6 4h6m-6 4h6"/>
                        </svg>
                        Work Experience
                    </h2>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/>
                    </svg>
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
              resumeData.skills.some((skill) => skill.name.trim())
                ? `
            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    Skills
                </h2>
                <div class="skills-container">
                    ${resumeData.skills
                      .filter((skill) => skill.name.trim())
                      .map(
                        (skill) => `
                        <span class="skill-tag">${skill.name}</span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            `
                : ""
            }

            ${
              resumeData.awards.some((award) => award.title || award.issuer)
                ? `
            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
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

  const downloadHTML = () => {
    const htmlContent = generateResumeHTML()
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.personalInfo.fullName || "resume"}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <Button onClick={downloadHTML} size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>

            <div className="space-y-6">
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
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Skills</CardTitle>
                    <Button onClick={addSkill} size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="space-y-2 p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h5 className="font-medium text-sm">Skill {index + 1}</h5>
                        {resumeData.skills.length > 1 && (
                          <Button onClick={() => removeSkill(skill.id)} size="sm" variant="outline">
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Skill Name</Label>
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                            placeholder="React"
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Years</Label>
                          <Input
                            value={skill.years}
                            onChange={(e) => updateSkill(skill.id, "years", e.target.value)}
                            placeholder="3"
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
            </div>
          </div>
        </div>

        {/* Preview Panel - 3/5 width */}
        <div className="w-3/5 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="w-full min-h-[800px]" dangerouslySetInnerHTML={{ __html: generateResumeHTML() }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
