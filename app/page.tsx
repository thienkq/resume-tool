"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Download } from "lucide-react"

// Import types
import { ResumeData, Experience, Education, Skill, Award } from "@/lib/types"

// Import form components
import PersonalInfoForm from "@/components/forms/PersonalInfoForm"
import ExperienceForm from "@/components/forms/ExperienceForm"
import EducationForm from "@/components/forms/EducationForm"
import SkillsForm from "@/components/forms/SkillsForm"
import AwardsForm from "@/components/forms/AwardsForm"
import ResumePreview from "@/components/ResumePreview"

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      location: "San Francisco, CA",
      website: "https://janedoe.dev",
      github: "https://github.com/janedoe",
      phone: "+1 (123) 456-7890",
    },
    professionalSummary:
      "Highly motivated and results-oriented Software Engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in full-stack development, cloud platforms, and agile methodologies. Passionate about building innovative solutions and contributing to high-performing teams.",
    expertise: [
      { id: "1", name: "Full-stack Development", years: "5" },
      { id: "2", name: "Cloud Platforms (AWS, Azure)", years: "3" },
      { id: "3", name: "Agile Methodologies", years: "5" },
      { id: "4", name: "Microservices Architecture", years: "2" },
      { id: "5", name: "RESTful APIs", years: "4" },
    ],
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
      "Programming: Python, Java, JavaScript, C++\\nFrameworks: React, Spring Boot, Node.js\\nTools: Docker, Git, Jenkins, Postman\\nTesting: Selenium, JUnit, Cypress\\nCloud: AWS, Azure",
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

  // Personal Info handlers
  const updatePersonalInfo = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const updateProfessionalSummary = (value: string) => {
    setResumeData(prev => ({ ...prev, professionalSummary: value }))
  }

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Math.random().toString(36).substr(2, 9)}`,
      company: "",
      position: "",
      duration: "",
      description: "",
      technologies: "",
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Math.random().toString(36).substr(2, 9)}`,
      institution: "",
      degree: "",
      year: "",
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  // Expertise handlers
  const addExpertise = () => {
    setResumeData(prev => ({
      ...prev,
      expertise: [...prev.expertise, { id: `skill-${Math.random().toString(36).substr(2, 9)}`, name: "", years: "" }],
    }))
  }

  const removeExpertise = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(exp => exp.id !== id),
    }))
  }

  const updateExpertise = (id: string, field: keyof Skill, value: string) => {
    setResumeData(prev => ({
      ...prev,
      expertise: prev.expertise.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  // Awards handlers
  const addAward = () => {
    const newAward: Award = {
      id: `award-${Math.random().toString(36).substr(2, 9)}`,
      title: "",
      issuer: "",
      year: "",
      description: "",
    }
    setResumeData(prev => ({
      ...prev,
      awards: [...prev.awards, newAward],
    }))
  }

  const removeAward = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.filter(award => award.id !== id),
    }))
  }

  const updateAward = (id: string, field: keyof Award, value: string) => {
    setResumeData(prev => ({
      ...prev,
      awards: prev.awards.map(award => 
        award.id === id ? { ...award, [field]: value } : award
      ),
    }))
  }

  // Skills handler
  const updateSkills = (value: string) => {
    setResumeData(prev => ({ ...prev, skills: value }))
  }

  // JSON handlers
  const applyJsonChanges = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      setResumeData(parsedData)
      toast({
        title: "Success",
        description: "Resume data updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive",
      })
    }
  }

  const updateJsonFromData = () => {
    setJsonInput(JSON.stringify(resumeData, null, 2))
  }

  // Export handler
  const exportToPDF = () => {
    if (typeof window !== 'undefined') {
      // Use window.print() which is more reliable than opening new windows
      const originalTitle = document.title
      document.title = `${resumeData.personalInfo.fullName} - Resume`
      
      // Hide everything except the resume preview
      const resumeElement = previewRef.current
      if (resumeElement) {
        // Create print styles
        const printStyles = document.createElement('style')
        printStyles.textContent = `
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; }
            body { margin: 0; padding: 20px; }
            .no-print { display: none !important; }
          }
        `
        document.head.appendChild(printStyles)
        
        // Add print class to resume
        resumeElement.classList.add('print-area')
        
        // Trigger print
        window.print()
        
        // Cleanup
        document.head.removeChild(printStyles)
        resumeElement.classList.remove('print-area')
        document.title = originalTitle
        
        toast({
          title: "Print Dialog Opened",
          description: "Choose 'Save as PDF' to download your resume.",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-xl text-gray-600">Create a professional resume in minutes</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="form">Form Editor</TabsTrigger>
              <TabsTrigger value="json">JSON Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <Button onClick={exportToPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms/JSON */}
            <div className="space-y-6">
              <TabsContent value="form" className="space-y-6 mt-0">
                <PersonalInfoForm
                  personalInfo={resumeData.personalInfo}
                  professionalSummary={resumeData.professionalSummary}
                  professionalTitle={professionalTitle}
                  verifiedBadgeText={verifiedBadgeText}
                  onPersonalInfoChange={updatePersonalInfo}
                  onProfessionalSummaryChange={updateProfessionalSummary}
                  onProfessionalTitleChange={setProfessionalTitle}
                  onVerifiedBadgeTextChange={setVerifiedBadgeText}
                />

                <ExperienceForm
                  experience={resumeData.experience}
                  onAdd={addExperience}
                  onRemove={removeExperience}
                  onUpdate={updateExperience}
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <EducationForm
                    education={resumeData.education}
                    onAdd={addEducation}
                    onRemove={removeEducation}
                    onUpdate={updateEducation}
                  />

                  <AwardsForm
                    awards={resumeData.awards}
                    onAdd={addAward}
                    onRemove={removeAward}
                    onUpdate={updateAward}
                  />
                </div>

                <SkillsForm
                  expertise={resumeData.expertise}
                  skills={resumeData.skills}
                  onExpertiseAdd={addExpertise}
                  onExpertiseRemove={removeExpertise}
                  onExpertiseUpdate={updateExpertise}
                  onSkillsChange={updateSkills}
                />
              </TabsContent>

              <TabsContent value="json" className="mt-0">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={applyJsonChanges}>Apply Changes</Button>
                    <Button variant="outline" onClick={updateJsonFromData}>
                      Sync from Form
                    </Button>
                  </div>
                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="min-h-[600px] font-mono text-sm"
                    placeholder="Edit your resume data in JSON format..."
                  />
                </div>
              </TabsContent>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <TabsContent value="preview" className="mt-0">
                <ResumePreview
                  ref={previewRef}
                  resumeData={resumeData}
                  verifiedBadgeText={verifiedBadgeText}
                  professionalTitle={professionalTitle}
                />
              </TabsContent>
              
              {/* Always visible preview on desktop when not on preview tab */}
              <div className={`${activeTab === 'preview' ? 'hidden' : 'hidden lg:block'}`}>
                <ResumePreview
                  resumeData={resumeData}
                  verifiedBadgeText={verifiedBadgeText}
                  professionalTitle={professionalTitle}
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
