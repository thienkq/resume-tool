import type { Metadata, Viewport } from 'next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://resume-builder.vercel.app'), // Update with your actual domain
  title: 'Resume Builder - Create Professional Resumes Online',
  description: 'Build stunning, professional resumes in minutes with our modern resume builder. Choose from customizable templates, export to PDF, and land your dream job.',
  keywords: 'resume builder, CV maker, job application, professional resume, resume templates, PDF resume, career builder',
  authors: [{ name: 'Resume Builder' }],
  creator: 'Resume Builder',
  publisher: 'Resume Builder',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resume-builder.vercel.app', // Update with your actual domain
    title: 'Resume Builder - Create Professional Resumes Online',
    description: 'Build stunning, professional resumes in minutes with our modern resume builder. Choose from customizable templates, export to PDF, and land your dream job.',
    siteName: 'Resume Builder',
    images: [
      {
        url: '/template-reference.png',
        width: 1200,
        height: 630,
        alt: 'Resume Builder - Create Professional Resumes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Builder - Create Professional Resumes Online',
    description: 'Build stunning, professional resumes in minutes. Export to PDF and land your dream job.',
    images: ['/template-reference.png'],
    creator: '@resumebuilder', // Update with your Twitter handle
  },
  icons: {
    icon: '/placeholder-logo.svg',
    apple: '/placeholder-logo.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Resume Builder",
              "description": "Build stunning, professional resumes in minutes with our modern resume builder. Choose from customizable templates, export to PDF, and land your dream job.",
              "url": "https://resume-builder.vercel.app", // Update with your actual domain
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Professional resume templates",
                "Real-time preview",
                "PDF export",
                "JSON import/export",
                "Mobile-friendly design",
                "No registration required"
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
