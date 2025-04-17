import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewChart } from "./components/overview-chart"
import { StudentPerformanceTable } from "./components/student-performance-table"
import { ModuleCompletionChart } from "./components/module-completion-chart"
import { EngagementMetrics } from "./components/engagement-metrics"

export default function AnalyticsPage() {
  return (
    <div className="h-full w-full space-y-6">
      <Tabs defaultValue="overview" className="h-full w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Student Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="modules">Module Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="h-full w-full mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>Average completion rate across all modules</CardDescription>
              </CardHeader>
              <CardContent>
                <OverviewChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Students</CardTitle>
                <CardDescription>Students currently engaged with the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Grade</CardTitle>
                <CardDescription>Current class average across all assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">B+</div>
                <p className="text-sm text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="h-full w-full mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Performance</CardTitle>
              <CardDescription>Detailed breakdown of student grades and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentPerformanceTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="h-full w-full mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engagement Metrics</CardTitle>
              <CardDescription>Track student participation and interaction</CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementMetrics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="h-full w-full mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Module Analytics</CardTitle>
              <CardDescription>Completion rates and performance by module</CardDescription>
            </CardHeader>
            <CardContent>
              <ModuleCompletionChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 