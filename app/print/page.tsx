"use client"

import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/types'
import ResumePreview from '@/components/ResumePreview'

export default function PrintPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [verifiedBadgeText, setVerifiedBadgeText] = useState('')
  const [professionalTitle, setProfessionalTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Get data from localStorage
      const storedData = localStorage.getItem('resumePrintData')
      
      if (storedData) {
        const printData = JSON.parse(storedData)
        setResumeData(printData.resumeData)
        setVerifiedBadgeText(printData.verifiedBadgeText || '')
        setProfessionalTitle(printData.professionalTitle || '')
        
        // Auto-trigger print after a short delay
        setTimeout(() => {
          window.print()
        }, 1000)
        
        // Show helpful instructions
        setTimeout(() => {
          const instructions = document.createElement('div')
          instructions.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1f2937;
            color: white;
            padding: 16px;
            border-radius: 8px;
            font-family: system-ui;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 300px;
          `
          instructions.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">📄 PDF Export Instructions</div>
            <div style="margin-bottom: 4px;">1. In print dialog, set:</div>
            <div style="margin-left: 16px; margin-bottom: 4px;">• Destination: "Save as PDF"</div>
            <div style="margin-left: 16px; margin-bottom: 4px;">• Headers/footers: OFF</div>
            <div style="margin-left: 16px; margin-bottom: 8px;">• Margins: Minimum</div>
            <div style="margin-bottom: 8px;">2. Click "Save"</div>
            <button onclick="this.parentElement.remove()" style="
              background: #374151;
              color: white;
              border: none;
              padding: 4px 8px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
            ">Close</button>
          `
          document.body.appendChild(instructions)
        }, 2000)
        
        // Clean up localStorage after a delay
        setTimeout(() => {
          localStorage.removeItem('resumePrintData')
        }, 5000)
      } else {
        setError('No resume data found. Please try exporting again.')
      }
    } catch (error) {
      console.error('Error loading resume data:', error)
      setError('Error loading resume data. Please try again.')
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.close()} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close Tab
          </button>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Loading Resume...</h1>
          <p className="text-gray-600">Preparing your resume for printing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white print:bg-white">
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print-resume {
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            page-break-inside: avoid;
          }
          
          .print-resume * {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          
          /* Override ResumePreview component styles for print */
          .max-w-4xl {
            max-width: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
          }
          
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .print-experience-item {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 16px;
          }
          
          @page {
            size: A4;
            margin: 0.5in;
          }
        }
        
        @media screen {
          body {
            background: #f5f5f5;
            padding: 20px;
          }
          
          .print-container {
            max-width: 8.5in;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-height: 11in;
          }
        }
      `}</style>
      
      <div className="print-container">
        <div className="print-resume">
          <ResumePreview
            resumeData={resumeData}
            verifiedBadgeText={verifiedBadgeText}
            professionalTitle={professionalTitle}
          />
        </div>
      </div>
    </div>
  )
}


