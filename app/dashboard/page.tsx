"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, AlertCircle, Book, MessageSquare, Calendar, ArrowRight, Brain, Sparkles, Lightbulb, Target, BarChart3, MapPin, Clock3 } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [projects] = useState([
    {
      id: "environmental-study",
      title: "Environmental Study",
      description: "Water filtration prototype for local stream",
      status: "on-track",
      dueDate: "May 15, 2024",
      subject: "Environmental Science",
      progress: 75,
      phases: [
        { name: "Research Phase", status: "Completed" },
        { name: "Design Phase", status: "Completed" },
        { name: "Build Phase", status: "In Progress" },
      ],
      aiInsight: "Build phase is progressing well. Consider adding a pre-filter stage for larger particulates.",
    },
    {
      id: "history-essay",
      title: "History Essay",
      description: "Impact of industrial revolution on urban development",
      status: "needs-attention",
      dueDate: "May 22, 2024",
      subject: "History",
      progress: 40,
      phases: [
        { name: "Research Phase", status: "In Progress" },
        { name: "Planning Phase", status: "Not Started" },
        { name: "Writing Phase", status: "Not Started" },
      ],
      aiInsight: "Research phase needs more primary sources. Focus on urban planning documents from the 19th century.",
    },
  ])

  const [studyMaterials] = useState([
    {
      id: "calculus-textbook",
      title: "Advanced Calculus",
      type: "Textbook",
      subject: "Mathematics",
      progress: 65,
      lastStudied: "2 days ago",
      chapter: "Integration Techniques",
      aiRecommendation: "Focus on Chapter 3: Integration by Parts - aligns with upcoming quiz topics",
    },
    {
      id: "biology-notes",
      title: "Cell Biology Notes",
      type: "Document",
      subject: "Biology",
      progress: 45,
      lastStudied: "1 day ago",
      chapter: "Cellular Respiration",
      aiRecommendation: "Review electron transport chain section - identified as a knowledge gap",
    },
  ])

  const [upcomingEvents] = useState([
    {
      id: "calc-quiz",
      title: "Calculus Integration Quiz",
      date: "May 5, 2024",
      time: "10:00 AM",
      type: "Quiz",
      subject: "Mathematics",
      location: "Room 204",
      duration: "1 hour",
      preparation: {
        status: "In Progress",
        completedTasks: 3,
        totalTasks: 5,
        nextStep: "Practice integration by parts problems",
      },
    },
    {
      id: "bio-presentation",
      title: "Cellular Respiration Presentation",
      date: "May 8, 2024",
      time: "2:00 PM",
      type: "Presentation",
      subject: "Biology",
      location: "Lab 101",
      duration: "20 minutes",
      preparation: {
        status: "On Track",
        completedTasks: 4,
        totalTasks: 6,
        nextStep: "Finalize presentation slides",
      },
    },
  ])

  const [recentMessages] = useState([
    {
      id: "msg1",
      sender: "Math AI Tutor",
      subject: "Integration Practice Results",
      preview: "Your accuracy on integration by parts improved to 85%. Let's focus on these specific problem types...",
      time: "2 hours ago",
    },
    {
      id: "msg2",
      sender: "Study Analytics",
      subject: "Weekly Progress Report",
      preview: "You've completed 12 practice problems and 3 mock quizzes. Here's your personalized study plan for next week...",
      time: "5 hours ago",
    },
  ])

  const [metrics] = useState({
    productivityScore: 85,
    studyEfficiency: 92,
    taskCompletion: 78,
    aiInteractions: 24,
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />
      case "needs-attention":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
      case "needs-attention":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "presentation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Mia Wang!</h1>
          <p className="text-muted-foreground">Here's your personalized study analytics and recommendations</p>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.productivityScore}%</div>
            <p className="text-xs text-muted-foreground">Average sustained focus time per study session</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.studyEfficiency}%</div>
            <p className="text-xs text-muted-foreground">Quiz performance vs. study time ratio</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.taskCompletion}%</div>
            <p className="text-xs text-muted-foreground">Weekly study goals completion rate</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Problems</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.aiInteractions}</div>
            <p className="text-xs text-muted-foreground">AI-generated problems solved this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-6">
        {/* Projects Section */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Active Projects</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/projects">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Current assignments with progress tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col p-4 rounded-lg border">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{project.title}</h3>
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1.5 whitespace-nowrap ${getStatusColor(project.status)}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.phases.map((phase, index) => (
                      <Badge
                        key={index}
                        variant={phase.status === "Completed" ? "default" : phase.status === "In Progress" ? "secondary" : "outline"}
                      >
                        {phase.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                    <Lightbulb className="h-4 w-4 mt-0.5" />
                    <p>{project.aiInsight}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Study Materials Section */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Priority Study Materials</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/study-guide">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Recommended content based on your learning progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {studyMaterials.map((material) => (
              <div key={material.id} className="flex flex-col p-4 rounded-lg border">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Book className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{material.title}</h4>
                        <p className="text-sm text-muted-foreground">{material.subject} • {material.chapter}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize whitespace-nowrap">{material.type}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{material.progress}%</span>
                    </div>
                    <Progress value={material.progress} />
                  </div>
                  <p className="text-sm text-muted-foreground">Last studied {material.lastStudied}</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                    <Sparkles className="h-4 w-4 mt-0.5" />
                    <p>{material.aiRecommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Upcoming Assessments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/calendar">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Scheduled tests with preparation tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex flex-col p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                      <span>•</span>
                      <Clock3 className="h-4 w-4" />
                      <span>{event.duration}</span>
                    </div>
                  </div>
                  <Badge className={`${getEventColor(event.type)} capitalize`}>{event.type}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Preparation Progress</span>
                      <span className="font-medium">{Math.round((event.preparation.completedTasks / event.preparation.totalTasks) * 100)}%</span>
                    </div>
                    <Progress value={(event.preparation.completedTasks / event.preparation.totalTasks) * 100} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.preparation.status === "On Track" ? "outline" : "secondary"}>
                      {event.preparation.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {event.preparation.completedTasks}/{event.preparation.totalTasks} tasks completed
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                    <Brain className="h-4 w-4 mt-0.5" />
                    <p>Next step: {event.preparation.nextStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Insights Section */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Learning Insights</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/messages">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Performance analytics and study recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex flex-col p-4 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">{message.sender}</h4>
                    </div>
                    <p className="text-sm font-medium">{message.subject}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">{message.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
