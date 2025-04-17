"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, CheckCircle2, AlertCircle, Check } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: "math-project",
      title: "Calculus Research Paper",
      status: "on-track",
      dueDate: "May 15, 2024",
      subject: "Mathematics",
      description: "Research and write a paper on the applications of calculus in physics",
    },
    {
      id: "science-experiment",
      title: "Biology Lab Report",
      status: "needs-attention",
      dueDate: "May 10, 2024",
      subject: "Biology",
      description: "Complete the lab report for the photosynthesis experiment",
    },
    {
      id: "history-presentation",
      title: "World War II Presentation",
      status: "on-track",
      dueDate: "May 20, 2024",
      subject: "History",
      description: "Create a presentation on the causes and effects of World War II",
    },
    {
      id: "english-essay",
      title: "Literary Analysis Essay",
      status: "needs-attention",
      dueDate: "May 12, 2024",
      subject: "English",
      description: "Write an analysis of the themes in 'To Kill a Mockingbird'",
    },
    {
      id: "physics-lab",
      title: "Physics Lab Report",
      status: "completed",
      dueDate: "April 28, 2024",
      subject: "Physics",
      description: "Completed the lab report on Newton's laws of motion",
    },
    {
      id: "chemistry-project",
      title: "Chemistry Research Project",
      status: "completed",
      dueDate: "April 25, 2024",
      subject: "Chemistry",
      description: "Research and presentation on chemical bonding",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />
      case "needs-attention":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <Check className="h-4 w-4" />
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
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
    }
  }

  const formatStatus = (status: string) => {
    return status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  const renderProjectCard = (project: typeof projects[0]) => (
    <Card key={project.id} className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
          <Badge
            variant="outline"
            className={`flex items-center gap-1.5 shrink-0 px-4 pt-2 pb-2 ${getStatusColor(project.status)}`}
          >
            {getStatusIcon(project.status)}
            {formatStatus(project.status)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Due {project.dueDate}</span>
        </div>
        <Badge variant="secondary">{project.subject}</Badge>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center gap-4">
        <Input placeholder="Search projects..." className="max-w-xs" />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="flex-1 mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map(renderProjectCard)}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects
              .filter((project) => project.status !== "completed")
              .map(renderProjectCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects
              .filter((project) => project.status === "completed")
              .map(renderProjectCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 