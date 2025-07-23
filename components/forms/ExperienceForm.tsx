import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Experience } from '@/lib/types'
import { Briefcase, Plus, Minus } from 'lucide-react'

interface ExperienceFormProps {
  experience: Experience[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, field: keyof Experience, value: string) => void
}

export default function ExperienceForm({
  experience,
  onAdd,
  onRemove,
  onUpdate,
}: ExperienceFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </div>
          <Button onClick={onAdd} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemove(exp.id)}
                className="flex items-center gap-2"
              >
                <Minus className="w-4 h-4" />
                Remove
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor={`position-${exp.id}`}>Position</Label>
                <Input
                  id={`position-${exp.id}`}
                  value={exp.position}
                  onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                  placeholder="Job title/position"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`duration-${exp.id}`}>Duration</Label>
                <Input
                  id={`duration-${exp.id}`}
                  value={exp.duration}
                  onChange={(e) => onUpdate(exp.id, 'duration', e.target.value)}
                  placeholder="e.g., Jan 2022 - Present"
                />
              </div>
              <div>
                <Label htmlFor={`technologies-${exp.id}`}>Technologies</Label>
                <Input
                  id={`technologies-${exp.id}`}
                  value={exp.technologies}
                  onChange={(e) => onUpdate(exp.id, 'technologies', e.target.value)}
                  placeholder="e.g., React, Node.js, TypeScript"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`description-${exp.id}`}>Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
                placeholder="• Bullet point 1&#10;• Bullet point 2&#10;• Bullet point 3"
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use bullet points (•) for better formatting
              </p>
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
