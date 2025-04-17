import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ModuleGenerationForm() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="course-name">Course Name</Label>
          <Input id="course-name" placeholder="Introduction to Computer Science" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="syllabus">Syllabus</Label>
          <Textarea
            id="syllabus"
            placeholder="Paste your syllabus here or upload a file..."
            className="min-h-[200px]"
          />
        </div>
        <div className="grid gap-2">
          <Label>Upload Syllabus (Optional)</Label>
          <Input type="file" accept=".pdf,.doc,.docx" />
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-lg font-medium">Module Settings</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="module-count">Number of Modules</Label>
            <Input id="module-count" type="number" min="1" max="20" defaultValue="5" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select defaultValue="intermediate">
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Estimated Duration (weeks)</Label>
            <Input id="duration" type="number" min="1" max="52" defaultValue="12" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Generate Modules</Button>
      </div>
    </div>
  )
} 