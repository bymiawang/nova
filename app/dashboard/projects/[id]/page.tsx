"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock, FileText, MessageSquare, Plus, Send, Settings, Share2, User } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string

  // Determine project details based on ID
  const projectDetails = getProjectDetails(projectId)
  const [message, setMessage] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{projectDetails.title}</h2>
            <Badge variant={projectDetails.status === "On Track" ? "outline" : "destructive"}>
              {projectDetails.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{projectDetails.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Track your project milestones and completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">{projectDetails.progress}%</span>
              </div>
              <Progress value={projectDetails.progress} />
            </div>

            <Accordion type="single" collapsible className="w-full">
              {projectDetails.phases.map((phase, index) => (
                <AccordionItem key={index} value={`phase-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span>{phase.name}</span>
                      <Badge
                        variant={
                          phase.status === "Completed"
                            ? "default"
                            : phase.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-2 rounded-md border p-2">
                          <div
                            className={`h-5 w-5 rounded-full flex items-center justify-center ${
                              task.completed ? "bg-primary text-primary-foreground" : "border border-input"
                            }`}
                          >
                            {task.completed && <CheckCircle className="h-4 w-4" />}
                          </div>
                          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                            {task.name}
                          </span>
                          {!task.completed && (
                            <Button variant="ghost" size="sm" className="ml-auto">
                              Complete
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="gap-1 mt-2">
                        <Plus className="h-4 w-4" /> Add Task
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-1">
              <Plus className="h-4 w-4" /> Add New Phase
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-sm text-muted-foreground">{projectDetails.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Teacher</p>
                  <p className="text-sm text-muted-foreground">{projectDetails.teacher}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Subject</p>
                  <p className="text-sm text-muted-foreground">{projectDetails.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Started</p>
                  <p className="text-sm text-muted-foreground">{projectDetails.startDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-[300px] overflow-y-auto space-y-4 p-2">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                    AI
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">How can I help with your {projectDetails.title} project today?</p>
                  </div>
                </div>

                {projectDetails.messages.map((msg, index) => (
                  <div key={index} className={`flex gap-2 ${msg.sender === "ai" ? "" : "justify-end"}`}>
                    {msg.sender === "ai" && (
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                        AI
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.sender === "user" && (
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                        JD
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center gap-2">
                <Textarea
                  placeholder="Ask a question about your project..."
                  className="min-h-10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button size="icon" disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="rubric">Rubric</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Summary and key information about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">{projectDetails.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Objectives</h3>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  {projectDetails.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium">Deliverables</h3>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                  {projectDetails.deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Resources</CardTitle>
              <CardDescription>Helpful materials for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {projectDetails.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.type}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full gap-1">
                <Plus className="h-4 w-4" /> Add Resource
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Feedback</CardTitle>
              <CardDescription>Feedback and comments on your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectDetails.feedback.length > 0 ? (
                <div className="space-y-4">
                  {projectDetails.feedback.map((feedback, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{feedback.from}</p>
                          <p className="text-xs text-muted-foreground">{feedback.date}</p>
                        </div>
                      </div>
                      <p className="text-sm">{feedback.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">No Feedback Yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your teacher will provide feedback as you progress
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rubric" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Rubric</CardTitle>
              <CardDescription>Evaluation criteria for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectDetails.rubric.map((category, index) => (
                  <div key={index} className="rounded-lg border">
                    <div className="border-b bg-muted p-3">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground">
                        <div>Criteria</div>
                        <div>Excellent</div>
                        <div>Satisfactory</div>
                        <div>Needs Improvement</div>
                      </div>
                      {category.criteria.map((criterion, cIndex) => (
                        <div key={cIndex} className="mt-2 grid grid-cols-4 gap-2 text-sm border-t pt-2">
                          <div className="font-medium">{criterion.name}</div>
                          <div>{criterion.excellent}</div>
                          <div>{criterion.satisfactory}</div>
                          <div>{criterion.needsImprovement}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to get project details based on ID
function getProjectDetails(id: string) {
  // This would normally come from an API or database
  const projects = {
    "environmental-study": {
      title: "Environmental Study",
      description: "Water filtration prototype for local stream",
      fullDescription:
        "Design and build a water filtration system to address pollution in the local stream. The project involves researching water contaminants, designing a filtration system, building a prototype, and testing its effectiveness.",
      status: "On Track",
      progress: 75,
      deadline: "May 15, 2025 (3 days)",
      teacher: "Dr. Sarah Johnson",
      subject: "Environmental Science",
      startDate: "April 1, 2025",
      objectives: [
        "Research common water contaminants in local streams",
        "Design a cost-effective filtration system",
        "Build and test a working prototype",
        "Document the process and results",
        "Present findings and recommendations",
      ],
      deliverables: [
        "Research report on water contaminants",
        "Design schematics for filtration system",
        "Working prototype",
        "Test results and analysis",
        "Final presentation",
      ],
      phases: [
        {
          name: "Research Phase",
          status: "Completed",
          tasks: [
            { name: "Research water contaminants", completed: true },
            { name: "Identify filtration methods", completed: true },
            { name: "Create research summary", completed: true },
          ],
        },
        {
          name: "Design Phase",
          status: "Completed",
          tasks: [
            { name: "Sketch initial designs", completed: true },
            { name: "Select materials", completed: true },
            { name: "Create final design", completed: true },
          ],
        },
        {
          name: "Build Phase",
          status: "In Progress",
          tasks: [
            { name: "Gather materials", completed: true },
            { name: "Construct filter layers", completed: true },
            { name: "Assemble prototype", completed: false },
          ],
        },
        {
          name: "Testing Phase",
          status: "Not Started",
          tasks: [
            { name: "Develop testing protocol", completed: false },
            { name: "Collect water samples", completed: false },
            { name: "Run filtration tests", completed: false },
            { name: "Document results", completed: false },
          ],
        },
        {
          name: "Presentation Phase",
          status: "Not Started",
          tasks: [
            { name: "Create presentation slides", completed: false },
            { name: "Prepare demonstration", completed: false },
            { name: "Practice presentation", completed: false },
          ],
        },
      ],
      resources: [
        { title: "Water Quality Standards Guide", type: "PDF Document" },
        { title: "Filtration Methods Overview", type: "Video Tutorial" },
        { title: "Local Stream Analysis Report", type: "Research Paper" },
        { title: "DIY Water Filter Instructions", type: "Tutorial" },
      ],
      feedback: [
        {
          from: "Dr. Sarah Johnson",
          date: "April 20, 2025",
          content:
            "Excellent research phase work. Your analysis of local contaminants is thorough and well-documented. For the design phase, consider adding a pre-filter stage to handle larger particulates before the main filtration system.",
        },
      ],
      rubric: [
        {
          name: "Research & Analysis",
          description: "Evaluation of research quality and depth of analysis",
          criteria: [
            {
              name: "Sources",
              excellent: "Uses diverse, credible sources",
              satisfactory: "Uses adequate sources",
              needsImprovement: "Limited or unreliable sources",
            },
            {
              name: "Analysis",
              excellent: "Thorough, insightful analysis",
              satisfactory: "Basic analysis of findings",
              needsImprovement: "Minimal or superficial analysis",
            },
          ],
        },
        {
          name: "Design & Construction",
          description: "Evaluation of filtration system design and build quality",
          criteria: [
            {
              name: "Design",
              excellent: "Innovative, well-documented design",
              satisfactory: "Functional design with basic documentation",
              needsImprovement: "Incomplete or poorly documented design",
            },
            {
              name: "Construction",
              excellent: "Well-constructed, durable prototype",
              satisfactory: "Functional prototype with minor issues",
              needsImprovement: "Poorly constructed or non-functional",
            },
          ],
        },
        {
          name: "Testing & Results",
          description: "Evaluation of testing methodology and result analysis",
          criteria: [
            {
              name: "Testing Protocol",
              excellent: "Comprehensive, replicable testing",
              satisfactory: "Basic testing methodology",
              needsImprovement: "Inadequate or flawed testing",
            },
            {
              name: "Results Analysis",
              excellent: "Detailed analysis with insights",
              satisfactory: "Basic analysis of results",
              needsImprovement: "Minimal or inaccurate analysis",
            },
          ],
        },
      ],
      messages: [
        {
          sender: "ai",
          content: "I see you're working on a water filtration project. How's the build phase going?",
        },
        {
          sender: "user",
          content: "I'm having trouble with the filter layers. Not sure about the right sequence.",
        },
        {
          sender: "ai",
          content:
            "For a basic water filter, you typically want to arrange layers from coarse to fine: gravel at the bottom, then sand, activated charcoal, and finally a fine cloth at the top. This helps trap progressively smaller particles.",
        },
      ],
    },
    "history-essay": {
      title: "History Essay",
      description: "Impact of industrial revolution on urban development",
      fullDescription:
        "Research and write an analytical essay on how the Industrial Revolution transformed urban landscapes and city planning in the 19th century, with a focus on comparing developments in Europe and North America.",
      status: "Needs Attention",
      progress: 40,
      deadline: "May 22, 2025 (10 days)",
      teacher: "Prof. Michael Chen",
      subject: "History",
      startDate: "April 10, 2025",
      objectives: [
        "Research primary and secondary sources on industrial revolution",
        "Analyze the impact on urban development in Europe and North America",
        "Develop a thesis statement and supporting arguments",
        "Write a well-structured analytical essay",
        "Include proper citations and bibliography",
      ],
      deliverables: [
        "Research notes and source list",
        "Essay outline",
        "First draft (1500-2000 words)",
        "Final essay with citations",
        "Bibliography in Chicago style",
      ],
      phases: [
        {
          name: "Research Phase",
          status: "In Progress",
          tasks: [
            { name: "Identify primary sources", completed: true },
            { name: "Collect secondary sources", completed: true },
            { name: "Create research notes", completed: false },
          ],
        },
        {
          name: "Planning Phase",
          status: "Not Started",
          tasks: [
            { name: "Develop thesis statement", completed: false },
            { name: "Create essay outline", completed: false },
            { name: "Organize supporting evidence", completed: false },
          ],
        },
        {
          name: "Writing Phase",
          status: "Not Started",
          tasks: [
            { name: "Write introduction", completed: false },
            { name: "Write body paragraphs", completed: false },
            { name: "Write conclusion", completed: false },
          ],
        },
        {
          name: "Revision Phase",
          status: "Not Started",
          tasks: [
            { name: "Self-review first draft", completed: false },
            { name: "Peer review", completed: false },
            { name: "Final revisions", completed: false },
          ],
        },
      ],
      resources: [
        { title: "Industrial Revolution: Primary Sources", type: "Document Collection" },
        { title: "Urban Planning in the 19th Century", type: "E-Book" },
        { title: "Chicago Style Citation Guide", type: "Reference Guide" },
        { title: "Historical Maps of Industrial Cities", type: "Image Gallery" },
      ],
      feedback: [],
      rubric: [
        {
          name: "Research & Sources",
          description: "Evaluation of research quality and source selection",
          criteria: [
            {
              name: "Source Quality",
              excellent: "Diverse, scholarly sources including primary documents",
              satisfactory: "Adequate mix of sources",
              needsImprovement: "Few or unreliable sources",
            },
            {
              name: "Citations",
              excellent: "Perfect Chicago style citations throughout",
              satisfactory: "Minor citation errors",
              needsImprovement: "Major citation problems or missing citations",
            },
          ],
        },
        {
          name: "Analysis & Argument",
          description: "Evaluation of thesis and supporting arguments",
          criteria: [
            {
              name: "Thesis",
              excellent: "Clear, insightful thesis with original perspective",
              satisfactory: "Clear thesis with basic analysis",
              needsImprovement: "Weak or missing thesis",
            },
            {
              name: "Evidence",
              excellent: "Strong evidence supporting all claims",
              satisfactory: "Adequate evidence for most claims",
              needsImprovement: "Insufficient or irrelevant evidence",
            },
          ],
        },
      ],
      messages: [
        {
          sender: "ai",
          content: "How's your research on the Industrial Revolution going? Have you found good primary sources?",
        },
        {
          sender: "user",
          content: "I found some sources but I'm struggling to narrow down my thesis.",
        },
        {
          sender: "ai",
          content:
            "Consider focusing on a specific aspect of urban development, such as housing conditions, transportation networks, or public health infrastructure. This will make your thesis more manageable and allow for deeper analysis.",
        },
      ],
    },
    "science-experiment": {
      title: "Science Experiment",
      description: "Effects of different fertilizers on plant growth",
      fullDescription:
        "Design and conduct an experiment to compare the effectiveness of different types of fertilizers on plant growth. The project involves setting up controlled growing conditions, applying various fertilizers, measuring growth over time, and analyzing the results.",
      status: "On Track",
      progress: 20,
      deadline: "May 26, 2025 (14 days)",
      teacher: "Ms. Rebecca Torres",
      subject: "Biology",
      startDate: "April 15, 2025",
      objectives: [
        "Research different types of fertilizers and their components",
        "Design a controlled experiment with multiple variables",
        "Collect and analyze quantitative data on plant growth",
        "Draw conclusions based on experimental evidence",
        "Present findings in a scientific report",
      ],
      deliverables: [
        "Experiment design document",
        "Data collection sheets",
        "Photographic documentation of growth",
        "Data analysis and graphs",
        "Final lab report",
      ],
      phases: [
        {
          name: "Planning Phase",
          status: "Completed",
          tasks: [
            { name: "Research fertilizer types", completed: true },
            { name: "Design experiment", completed: true },
            { name: "Prepare materials list", completed: true },
          ],
        },
        {
          name: "Setup Phase",
          status: "In Progress",
          tasks: [
            { name: "Gather materials", completed: true },
            { name: "Prepare growing containers", completed: false },
            { name: "Plant seeds", completed: false },
          ],
        },
        {
          name: "Experiment Phase",
          status: "Not Started",
          tasks: [
            { name: "Apply fertilizers", completed: false },
            { name: "Monitor growth daily", completed: false },
            { name: "Record measurements", completed: false },
            { name: "Take photographs", completed: false },
          ],
        },
        {
          name: "Analysis Phase",
          status: "Not Started",
          tasks: [
            { name: "Compile data", completed: false },
            { name: "Create graphs", completed: false },
            { name: "Analyze results", completed: false },
            { name: "Draw conclusions", completed: false },
          ],
        },
        {
          name: "Reporting Phase",
          status: "Not Started",
          tasks: [
            { name: "Write introduction", completed: false },
            { name: "Write methodology", completed: false },
            { name: "Write results section", completed: false },
            { name: "Write discussion and conclusion", completed: false },
          ],
        },
      ],
      resources: [
        { title: "Guide to Plant Fertilizers", type: "Reference Guide" },
        { title: "Experimental Design in Biology", type: "Tutorial" },
        { title: "Data Collection Templates", type: "Spreadsheet" },
        { title: "Scientific Report Format", type: "Template" },
      ],
      feedback: [],
      rubric: [
        {
          name: "Experimental Design",
          description: "Evaluation of experiment setup and controls",
          criteria: [
            {
              name: "Controls",
              excellent: "Well-designed controls for all variables",
              satisfactory: "Basic controls for main variables",
              needsImprovement: "Inadequate or missing controls",
            },
            {
              name: "Methodology",
              excellent: "Clear, replicable methodology",
              satisfactory: "Adequate methodology with minor issues",
              needsImprovement: "Flawed or unclear methodology",
            },
          ],
        },
        {
          name: "Data Collection & Analysis",
          description: "Evaluation of data quality and analytical approach",
          criteria: [
            {
              name: "Data Collection",
              excellent: "Comprehensive, accurate data collection",
              satisfactory: "Adequate data with minor gaps",
              needsImprovement: "Incomplete or inaccurate data",
            },
            {
              name: "Analysis",
              excellent: "Sophisticated analysis with statistical tests",
              satisfactory: "Basic analysis of trends",
              needsImprovement: "Minimal or incorrect analysis",
            },
          ],
        },
      ],
      messages: [
        {
          sender: "ai",
          content: "I see you're setting up a plant growth experiment. What fertilizers are you planning to test?",
        },
        {
          sender: "user",
          content:
            "I'm thinking of testing organic compost, commercial NPK fertilizer, and a control group with no fertilizer.",
        },
        {
          sender: "ai",
          content:
            "That's a good selection! Consider adding a fourth group with a specialized fertilizer like fish emulsion or bone meal to add another dimension to your experiment. Also, remember to keep all other variables constant: same soil type, light exposure, watering schedule, and plant species.",
        },
      ],
    },
  }

  // Return the project details or a default if not found
  return projects[id as keyof typeof projects] || projects["environmental-study"]
}
