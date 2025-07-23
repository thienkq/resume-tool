import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export async function POST(request: NextRequest) {
  try {
    const { resumeData, verifiedBadgeText, professionalTitle } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: 'Missing resume data' }, { status: 400 })
    }

    // Create the resume URL with query params
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'production'
      ? 'https://your-domain.com' // Replace with your actual domain
      : 'http://localhost:3000'

    // Store data temporarily and create print URL
    const printUrl = `${baseUrl}/print-pdf?data=${encodeURIComponent(JSON.stringify({
      resumeData,
      verifiedBadgeText,
      professionalTitle
    }))}`

    // Configure for serverless environment
    const isProduction = process.env.NODE_ENV === 'production'
    
    const browser = await puppeteer.launch({
      args: isProduction ? chromium.args : [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: isProduction ? await chromium.executablePath() : undefined,
      headless: chromium.headless,
    })

    const page = await browser.newPage()
    
    await page.setViewport({ width: 1200, height: 1600 })

    // Navigate to the print page
    await page.goto(printUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    // Wait for content to load
    await page.waitForSelector('[data-resume-content]', { timeout: 10000 })

    // Generate PDF with optimized settings
    const pdfBytes = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
        right: '0.5in'
      }
    })

    await browser.close()

    // Return PDF with proper headers
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Cache-Control': 'no-cache'
      }
    })

  } catch (error: any) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    )
  }
}
