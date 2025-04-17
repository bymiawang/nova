"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Copy, Edit, FileText, Filter, MoreHorizontal, Plus, Search, Share2, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function RubricsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock rubric data
  const rubrics = [
    {
      id: 1,
      title: "Research Project Rubric",
      subject: "Science",
      categories: 4,
      lastUpdated: "2 days ago",
      shared: true,
    },
    {
      id: 2,
      title: "Essay Writing Rubric",
      subject: "English",
      categories: 5,
      lastUpdated: "1 week ago",
      shared: true,
    },
    {
      id: 3,
      title: "Presentation Skills Rubric",
      subject: "Communication",
      categories: 3,
      lastUpdated: "3 days ago",
      shared: false,
    },
    {
      id: 4,
      title: "Lab Report Rubric",
      subject: "Chemistry",
      categories: 6,
      lastUpdated: "Yesterday",
      shared: true,
    },
    {
      id: 5,
      title: "Historical Analysis Rubric",
      subject: "History",
      categories: 4,
      lastUpdated: "2 weeks ago",
      shared: false,
    },
    {
      id: 6,
      title: "Creative Project Rubric",
      subject: "Art",
      categories: 5,
      lastUpdated: "4 days ago",
      shared: true,
    },
  ]

  // Filter rubrics based on search query
  const filteredRubrics = rubrics.filter(
    (rubric) =>
      rubric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rubric.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Create Rubric
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Rubric</DialogTitle>
              <DialogDescription>Create a new assessment rubric for student projects</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Rubric Title
                </label>
                <Input id="title" placeholder="e.g., Research Project Rubric" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="e.g., Science, History, English" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input id="description" placeholder="Brief description of the rubric" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Continue to Editor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Your Rubrics</CardTitle>
              <CardDescription>Manage and edit your assessment rubrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rubrics..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRubrics.map((rubric) => (
              <Card key={rubric.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{rubric.title}</CardTitle>
                      <CardDescription>{rubric.subject}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{rubric.categories} categories</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>Updated {rubric.lastUpdated}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <Badge variant={rubric.shared ? "default" : "outline"}>{rubric.shared ? "Shared" : "Private"}</Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Template Library</CardTitle>
          <CardDescription>Ready-to-use rubric templates for various project types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Scientific Investigation</CardTitle>
                <CardDescription>For science experiments and research</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <p>Categories include:</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Research Question</li>
                    <li>Methodology</li>
                    <li>Data Collection</li>
                    <li>Analysis</li>
                    <li>Conclusion</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Analytical Essay</CardTitle>
                <CardDescription>For literary and historical analysis</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <p>Categories include:</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Thesis Statement</li>
                    <li>Evidence & Support</li>
                    <li>Analysis & Insight</li>
                    <li>Organization</li>
                    <li>Writing Mechanics</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Creative Project</CardTitle>
                <CardDescription>For art, design, and multimedia</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <p>Categories include:</p>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Creativity & Originality</li>
                    <li>Technical Skill</li>
                    <li>Aesthetic Quality</li>
                    <li>Process Documentation</li>
                    <li>Presentation</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Templates
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
