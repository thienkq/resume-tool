"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ResumeData } from '@/lib/types'
import ResumePreview from '@/components/ResumePreview'

function PrintPDFContent() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [verifiedBadgeText, setVerifiedBadgeText] = useState('')
  const [professionalTitle, setProfessionalTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      const dataParam = searchParams.get('data')
      
      if (dataParam) {
        const printData = JSON.parse(decodeURIComponent(dataParam))
        setResumeData(printData.resumeData)
        setVerifiedBadgeText(printData.verifiedBadgeText || '')
        setProfessionalTitle(printData.professionalTitle || '')
      }
    } catch (error) {
      console.error('Error loading resume data:', error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  if (loading || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Loading Resume...</h1>
          <p className="text-gray-600">Preparing your resume for PDF generation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white" data-resume-content>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-size: 14px;
          line-height: 1.4;
        }
        
        * {
          box-shadow: none !important;
        }
        
        .max-w-4xl {
          max-width: none !important;
          margin: 0 !important;
          padding: 20px !important;
        }
        
        .print-section {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 16px;
        }
        
        .print-experience-item {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 16px;
        }
        
        /* Ensure proper spacing and typography */
        h1 { font-size: 28px; margin-bottom: 8px; }
        h2 { font-size: 20px; margin-bottom: 12px; }
        h3 { font-size: 16px; margin-bottom: 8px; }
        p { margin-bottom: 8px; }
        
        /* Contact info styling */
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        /* Skills styling */
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .skill-tag {
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
      `}</style>
      
      <ResumePreview
        resumeData={resumeData}
        verifiedBadgeText={verifiedBadgeText}
        professionalTitle={professionalTitle}
      />
    </div>
  )
}

export default function PrintPDFPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Loading Resume...</h1>
          <p className="text-gray-600">Preparing your resume for PDF generation</p>
        </div>
      </div>
    }>
      <PrintPDFContent />
    </Suspense>
  )
}
