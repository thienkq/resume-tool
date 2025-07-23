import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PersonalInfo } from '@/lib/types'
import { User } from 'lucide-react'

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo
  professionalSummary: string
  professionalTitle: string
  verifiedBadgeText: string
  onPersonalInfoChange: (field: keyof PersonalInfo, value: string) => void
  onProfessionalSummaryChange: (value: string) => void
  onProfessionalTitleChange: (value: string) => void
  onVerifiedBadgeTextChange: (value: string) => void
}

export default function PersonalInfoForm({
  personalInfo,
  professionalSummary,
  professionalTitle,
  verifiedBadgeText,
  onPersonalInfoChange,
  onProfessionalSummaryChange,
  onProfessionalTitleChange,
  onVerifiedBadgeTextChange,
}: PersonalInfoFormProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={personalInfo.fullName}
                onChange={(e) => onPersonalInfoChange('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => onPersonalInfoChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => onPersonalInfoChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={personalInfo.location}
                onChange={(e) => onPersonalInfoChange('location', e.target.value)}
                placeholder="Enter your location"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={personalInfo.website}
                onChange={(e) => onPersonalInfoChange('website', e.target.value)}
                placeholder="Enter your website"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub (optional)</Label>
              <Input
                id="github"
                value={personalInfo.github || ''}
                onChange={(e) => onPersonalInfoChange('github', e.target.value)}
                placeholder="Enter your GitHub profile"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="professionalTitle">Professional Title</Label>
              <Input
                id="professionalTitle"
                value={professionalTitle}
                onChange={(e) => onProfessionalTitleChange(e.target.value)}
                placeholder="e.g., Software Developer"
              />
            </div>
            <div>
              <Label htmlFor="verifiedBadgeText">Verified Badge Text</Label>
              <Input
                id="verifiedBadgeText"
                value={verifiedBadgeText}
                onChange={(e) => onVerifiedBadgeTextChange(e.target.value)}
                placeholder="e.g., Verified Expert in Engineering"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="professionalSummary">Professional Summary</Label>
            <Textarea
              id="professionalSummary"
              value={professionalSummary}
              onChange={(e) => onProfessionalSummaryChange(e.target.value)}
              placeholder="Write a brief professional summary..."
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
