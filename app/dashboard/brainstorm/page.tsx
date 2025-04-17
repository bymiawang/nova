"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Rocket, ThumbsUp, Filter, BookOpen, Zap, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  status: "On Track" | "Needs Attention"
  progress: number
  deadline: string
  subject: string
}

export default function BrainstormPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedIdeas, setSavedIdeas] = useState<number[]>([])
  const [startedProjects, setStartedProjects] = useState<Project[]>([])
  const [ideas, setIdeas] = useState<
    Array<{
      id: number
      title: string
      description: string
      subjects: string[]
      complexity: "Easy" | "Medium" | "Advanced"
    }>
  >([
    {
      id: 1,
      title: "Renewable Energy Comparison",
      description:
        "Compare efficiency of different renewable energy sources for residential use. Build small-scale models of solar, wind, and water power generators to measure their output in various conditions.",
      subjects: ["Science", "Engineering", "Environmental Studies"],
      complexity: "Medium",
    },
    {
      id: 2,
      title: "Local History Documentary",
      description:
        "Create a short documentary about a historical event in your community. Research primary sources, conduct interviews with local historians, and produce a 10-minute video.",
      subjects: ["History", "Media Production"],
      complexity: "Medium",
    },
    {
      id: 3,
      title: "Biodegradable Packaging",
      description:
        "Design and test biodegradable alternatives to common plastic packaging. Create prototypes using materials like cornstarch, mushroom mycelium, or seaweed.",
      subjects: ["Environmental Science", "Chemistry", "Design"],
      complexity: "Advanced",
    },
  ])

  const handleGenerateIdeas = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      const newIdeas = [
        {
          id: ideas.length + 1,
          title: "Urban Wildlife Habitat Study",
          description:
            "Map and analyze wildlife habitats in urban areas. Document species diversity, create a field guide for local fauna, and propose conservation strategies.",
          subjects: ["Biology", "Environmental Science", "Urban Planning"],
          complexity: "Medium",
        },
        {
          id: ideas.length + 2,
          title: "Cultural Recipe Archive",
          description:
            "Research and document traditional recipes from different cultures in your community. Create a digital cookbook with historical context and cultural significance.",
          subjects: ["Cultural Studies", "Nutrition", "Digital Media"],
          complexity: "Easy",
        },
        {
          id: ideas.length + 3,
          title: "Microplastic Filtration System",
          description:
            "Design and build a filtration system to remove microplastics from water. Test its effectiveness and propose applications for home or industrial use.",
          subjects: ["Engineering", "Environmental Science", "Chemistry"],
          complexity: "Advanced",
        },
      ]

      setIdeas([...ideas, ...newIdeas])
      setIsGenerating(false)
      setPrompt("")
    }, 2000)
  }

  const handleSaveIdea = (ideaId: number) => {
    setSavedIdeas((prev) => {
      if (prev.includes(ideaId)) {
        return prev.filter((id) => id !== ideaId)
      } else {
        return [...prev, ideaId]
      }
    })
  }

  const handleStartProject = (idea: typeof ideas[0]) => {
    // Create a new project from the idea
    const projectId = idea.title.toLowerCase().replace(/\s+/g, "-")
    const newProject: Project = {
      id: projectId,
      title: idea.title,
      description: idea.description,
      status: "On Track",
      progress: 0,
      deadline: "Not set",
      subject: idea.subjects[0],
    }

    setStartedProjects((prev) => [...prev, newProject])
    router.push(`/dashboard/projects/${projectId}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Project Ideas</CardTitle>
          <CardDescription>
            Describe your interests, skills, or curriculum requirements to get personalized project suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Example: I'm interested in environmental science and technology. I want to create a project that helps solve a local environmental problem."
            className="min-h-32"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              <Lightbulb className="mr-1 h-3 w-3" /> Environmental Science
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              <Lightbulb className="mr-1 h-3 w-3" /> History
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              <Lightbulb className="mr-1 h-3 w-3" /> Technology
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              <Lightbulb className="mr-1 h-3 w-3" /> Art
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
              <Lightbulb className="mr-1 h-3 w-3" /> Literature
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Options
          </Button>
          <Button onClick={handleGenerateIdeas} disabled={isGenerating || !prompt.trim()}>
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate Ideas
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Ideas</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="started">Started</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input placeholder="Search ideas..." className="w-64" />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <Card key={idea.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <Badge
                      variant={
                        idea.complexity === "Easy" ? "outline" : idea.complexity === "Medium" ? "secondary" : "default"
                      }
                    >
                      {idea.complexity}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {idea.subjects.map((subject) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSaveIdea(idea.id)}
                    className={savedIdeas.includes(idea.id) ? "text-primary" : ""}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {savedIdeas.includes(idea.id) ? "Saved" : "Save"}
                  </Button>
                  <Button size="sm" onClick={() => handleStartProject(idea)}>
                    <Rocket className="mr-2 h-4 w-4" />
                    Start Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedIdeas.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ideas
                .filter((idea) => savedIdeas.includes(idea.id))
                .map((idea) => (
                  <Card key={idea.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <Badge
                          variant={
                            idea.complexity === "Easy"
                              ? "outline"
                              : idea.complexity === "Medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {idea.complexity}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-3">{idea.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {idea.subjects.map((subject) => (
                          <Badge key={subject} variant="outline">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveIdea(idea.id)}
                        className="text-primary"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Saved
                      </Button>
                      <Button size="sm" onClick={() => handleStartProject(idea)}>
                        <Rocket className="mr-2 h-4 w-4" />
                        Start Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Saved Ideas Yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Save ideas you're interested in to find them here later
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="started" className="space-y-4">
          {startedProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {startedProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge 
                        className={project.status === "On Track" ? "badge-success" : "badge-warning"}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Calendar className="mr-1 h-3 w-3" />
                        {project.deadline}
                      </Badge>
                      <Badge variant="outline">{project.subject}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/projects/${project.id}`}>View Project</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <Zap className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Started Projects</h3>
              <p className="mt-1 text-sm text-muted-foreground">Projects you start from ideas will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
