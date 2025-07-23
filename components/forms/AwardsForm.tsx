import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Award } from '@/lib/types'
import { Award as AwardIcon, Plus, Minus } from 'lucide-react'

interface AwardsFormProps {
  awards: Award[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, field: keyof Award, value: string) => void
}

export default function AwardsForm({
  awards,
  onAdd,
  onRemove,
  onUpdate,
}: AwardsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AwardIcon className="w-5 h-5" />
            Certifications & Awards
          </div>
          <Button onClick={onAdd} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Award
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {awards.map((award, index) => (
          <div key={award.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-900">Award #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemove(award.id)}
                className="flex items-center gap-2"
              >
                <Minus className="w-4 h-4" />
                Remove
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`award-title-${award.id}`}>Title</Label>
                <Input
                  id={`award-title-${award.id}`}
                  value={award.title}
                  onChange={(e) => onUpdate(award.id, 'title', e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label htmlFor={`award-issuer-${award.id}`}>Issuer</Label>
                <Input
                  id={`award-issuer-${award.id}`}
                  value={award.issuer}
                  onChange={(e) => onUpdate(award.id, 'issuer', e.target.value)}
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`award-year-${award.id}`}>Year</Label>
              <Input
                id={`award-year-${award.id}`}
                value={award.year}
                onChange={(e) => onUpdate(award.id, 'year', e.target.value)}
                placeholder="e.g., 2023 or 2015, 2016, 2017"
                className="max-w-xs"
              />
            </div>
            
            <div>
              <Label htmlFor={`award-description-${award.id}`}>Description</Label>
              <Textarea
                id={`award-description-${award.id}`}
                value={award.description}
                onChange={(e) => onUpdate(award.id, 'description', e.target.value)}
                placeholder="Brief description of the achievement..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        ))}
        
        {awards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AwardIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No awards or certifications added yet.</p>
            <p className="text-sm">Click "Add Award" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
