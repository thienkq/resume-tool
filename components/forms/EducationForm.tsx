import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Education } from '@/lib/types'
import { GraduationCap, Plus, Minus } from 'lucide-react'

interface EducationFormProps {
  education: Education[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, field: keyof Education, value: string) => void
}

export default function EducationForm({
  education,
  onAdd,
  onRemove,
  onUpdate,
}: EducationFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </div>
          <Button onClick={onAdd} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-900">Education #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemove(edu.id)}
                className="flex items-center gap-2"
              >
                <Minus className="w-4 h-4" />
                Remove
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
                  placeholder="University/School name"
                />
              </div>
              <div>
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`year-${edu.id}`}>Year</Label>
              <Input
                id={`year-${edu.id}`}
                value={edu.year}
                onChange={(e) => onUpdate(edu.id, 'year', e.target.value)}
                placeholder="e.g., 2019 or 2015-2019"
                className="max-w-xs"
              />
            </div>
          </div>
        ))}
        
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
