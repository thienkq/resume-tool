import React, { forwardRef } from 'react'
import { ResumeData } from '@/lib/types'
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  User, 
  Briefcase, 
  GraduationCap,
  Award,
  Code,
  Lightbulb,
  ShieldCheck
} from 'lucide-react'

interface ResumePreviewProps {
  resumeData: ResumeData
  verifiedBadgeText: string
  professionalTitle: string
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData, verifiedBadgeText, professionalTitle }, ref) => {
    const formatSkills = (skills: string) => {
      return skills
        .split('\n')
        .map((line) => {
          const parts = line.split(':')
          if (parts.length > 1) {
            const category = parts[0].trim()
            const skillList = parts.slice(1).join(':').trim()
            return { category, skillList }
          }
          return { category: '', skillList: line.trim() }
        })
        .filter((item) => item.skillList)
    }

    return (
      <div ref={ref} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white p-8 pb-0">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black text-green-600 tracking-tight">
                {resumeData.personalInfo.fullName}
              </h1>
              {verifiedBadgeText && (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7oW6XvR5vf46b40SEVtBgza4AV_5X1LqRA&s" 
              alt="Company Logo" 
              className="h-12 w-auto opacity-90"
            />
          </div>
          
          <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
            {professionalTitle && (
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>{professionalTitle}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Professional Summary */}
          {resumeData.professionalSummary && (
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                <User className="w-5 h-5 text-green-600" />
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed border-b border-gray-200 pb-6">
                {resumeData.professionalSummary}
              </p>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Education */}
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Education
              </h2>
              {resumeData.education
                .filter((edu) => edu.institution || edu.degree)
                .map((edu) => (
                  <div key={edu.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="font-semibold text-green-600 mb-1">
                      {edu.degree || 'Degree'}
                    </div>
                    <div className="text-gray-600 italic mb-1">
                      {edu.institution || 'Institution'}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {edu.year || 'Year'}
                    </div>
                  </div>
                ))}
            </div>

            {/* Expertise */}
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                <Lightbulb className="w-5 h-5 text-green-600" />
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.expertise.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 uppercase tracking-wider">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Work Experience
                </h2>
              </div>
              
              <div className="relative pl-6">
                {/* Timeline line */}
                <div className="absolute left-1.5 top-2 bottom-0 w-0.5 border-l-2 border-dashed border-gray-300"></div>
                
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="relative mb-6 last:mb-0">
                    {/* Timeline dot */}
                    <div className="absolute -left-5 top-2 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-md"></div>
                    
                    <div className="bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-base font-bold text-green-600 mb-2">{exp.company}</div>
                        </div>
                        <div className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                          {exp.duration}
                        </div>
                      </div>
                      
                      {exp.description && (
                        <div className="mb-4">
                          <div 
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: exp.description.replace(/•/g, '<div class="flex items-start gap-2 mb-1"><span class="text-gray-400 mt-1">•</span><span>')
                                .replace(/\n/g, '</span></div>')
                            }}
                          />
                        </div>
                      )}
                      
                      {exp.technologies && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Tech Stack: </span>
                          <span className="text-gray-600">{exp.technologies}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && (
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                <Code className="w-5 h-5 text-green-600" />
                Technical Skills
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {formatSkills(resumeData.skills).map((skillGroup, index) => (
                  <div key={index} className="mb-2">
                    {skillGroup.category ? (
                      <>
                        <span className="font-semibold">{skillGroup.category}:</span>{' '}
                        <span>{skillGroup.skillList}</span>
                      </>
                    ) : (
                      <span>{skillGroup.skillList}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                <Award className="w-5 h-5 text-green-600" />
                Certifications & Awards
              </h2>
              {resumeData.awards.map((award) => (
                <div key={award.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
                      <div className="text-gray-600 italic">{award.issuer}</div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                      {award.year}
                    </div>
                  </div>
                  {award.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview
