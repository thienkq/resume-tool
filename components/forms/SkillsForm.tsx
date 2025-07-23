import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skill } from '@/lib/types'
import { Lightbulb, Code, Plus, Minus } from 'lucide-react'

interface SkillsFormProps {
  expertise: Skill[]
  skills: string
  onExpertiseAdd: () => void
  onExpertiseRemove: (id: string) => void
  onExpertiseUpdate: (id: string, field: keyof Skill, value: string) => void
  onSkillsChange: (value: string) => void
}

export default function SkillsForm({
  expertise,
  skills,
  onExpertiseAdd,
  onExpertiseRemove,
  onExpertiseUpdate,
  onSkillsChange,
}: SkillsFormProps) {
  return (
    <div className="space-y-6">
      {/* Expertise Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Expertise
            </div>
            <Button onClick={onExpertiseAdd} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {expertise.map((skill, index) => (
            <div key={skill.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-900">Skill #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onExpertiseRemove(skill.id)}
                  className="flex items-center gap-2"
                >
                  <Minus className="w-4 h-4" />
                  Remove
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                  <Input
                    id={`skill-name-${skill.id}`}
                    value={skill.name}
                    onChange={(e) => onExpertiseUpdate(skill.id, 'name', e.target.value)}
                    placeholder="e.g., Full-stack Development"
                  />
                </div>
                <div>
                  <Label htmlFor={`skill-years-${skill.id}`}>Years of Experience</Label>
                  <Input
                    id={`skill-years-${skill.id}`}
                    value={skill.years}
                    onChange={(e) => onExpertiseUpdate(skill.id, 'years', e.target.value)}
                    placeholder="e.g., 5"
                    className="max-w-xs"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {expertise.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No expertise skills added yet.</p>
              <p className="text-sm">Click "Add Skill" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="technical-skills">Skills</Label>
            <Textarea
              id="technical-skills"
              value={skills}
              onChange={(e) => onSkillsChange(e.target.value)}
              placeholder="Programming: Python, Java, JavaScript, C++&#10;Frameworks: React, Spring Boot, Node.js&#10;Tools: Docker, Git, Jenkins, Postman&#10;Testing: Selenium, JUnit, Cypress&#10;Cloud: AWS, Azure"
              className="min-h-[120px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use the format "Category: skill1, skill2, skill3" for better formatting
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
