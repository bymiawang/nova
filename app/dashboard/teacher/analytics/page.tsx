import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewChart } from "./components/overview-chart"
import { StudentPerformanceTable } from "./components/student-performance-table"
import { ModuleCompletionChart } from "./components/module-completion-chart"
import { EngagementMetrics } from "./components/engagement-metrics"
import { Button } from "@/components/ui/button"
import { Download, Filter, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock student data
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@school.edu",
    grade: "10th",
    activeProjects: 3,
    projectStatus: "On Track",
    lastActive: "Today, 2:30 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "A+",
    score: 98,
  },
  {
    id: 2,
    name: "Maya Patel",
    email: "maya.p@school.edu",
    grade: "10th",
    activeProjects: 2,
    projectStatus: "Needs Help",
    lastActive: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "B-",
    score: 82,
  },
  {
    id: 3,
    name: "Jamal Williams",
    email: "jamal.w@school.edu",
    grade: "10th",
    activeProjects: 3,
    projectStatus: "On Track",
    lastActive: "Today, 9:15 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "A",
    score: 95,
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    email: "sofia.r@school.edu",
    grade: "10th",
    activeProjects: 2,
    projectStatus: "Behind Schedule",
    lastActive: "3 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "C+",
    score: 78,
  },
  {
    id: 5,
    name: "Tyler Chen",
    email: "tyler.c@school.edu",
    grade: "10th",
    activeProjects: 1,
    projectStatus: "On Track",
    lastActive: "Today, 11:45 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "A-",
    score: 90,
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma.w@school.edu",
    grade: "10th",
    activeProjects: 3,
    projectStatus: "Excellent Progress",
    lastActive: "Today, 1:20 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: "A+",
    score: 99,
  },
]

export default function AnalyticsPage() {
  // Sort students by performance score
  const topStudents = [...students].sort((a, b) => b.score - a.score).slice(0, 5)
  // Sort students by last active time
  const recentActivity = [...students].sort((a, b) => {
    const timeA = a.lastActive.includes("Today") ? 0 : 1
    const timeB = b.lastActive.includes("Today") ? 0 : 1
    return timeA - timeB
  }).slice(0, 5)

  return (
    <div className="h-full w-full space-y-6 pb-24">
      <Tabs defaultValue="overview" className="h-full w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Student Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="modules">Module Analytics</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="h-full w-full">
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

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Students</CardTitle>
                <CardDescription>Students with the highest average grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                            {student.name.split(" ")[1].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{student.performance}</Badge>
                        <div className="text-sm font-medium">{student.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest student submissions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                            {student.name.split(" ")[1].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.activeProjects} active projects
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{student.lastActive}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="h-full w-full">
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

        <TabsContent value="engagement" className="h-full w-full">
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

        <TabsContent value="modules" className="h-full w-full">
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