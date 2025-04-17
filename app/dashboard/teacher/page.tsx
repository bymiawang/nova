import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModuleGenerationForm } from "./components/module-generation-form"
import { StudentProgressTable } from "./components/student-progress-table"

export default function TeacherDashboardPage() {
  return (
    <div className="h-full w-full space-y-6">
      <Tabs defaultValue="modules" className="h-full w-full">
        <TabsList>
          <TabsTrigger value="modules">Module Generation</TabsTrigger>
          <TabsTrigger value="progress">Student Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="h-full w-full mt-4">
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle className="text-lg">Generate New Module</CardTitle>
              <CardDescription>
                Upload a syllabus or enter course details to generate learning modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModuleGenerationForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="h-full w-full mt-4">
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle className="text-lg">Student Progress</CardTitle>
              <CardDescription>
                View and track student progress across all modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentProgressTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 