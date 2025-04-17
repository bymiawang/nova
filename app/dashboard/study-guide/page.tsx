"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, FileText, Video, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

export default function StudyGuidePage() {
  const [studyMaterials, setStudyMaterials] = useState([
    {
      id: "math-101",
      title: "Calculus Fundamentals",
      type: "textbook",
      subject: "Mathematics",
      description: "Essential concepts and practice problems for calculus",
      link: "#",
    },
    {
      id: "bio-lab",
      title: "Biology Lab Manual",
      type: "document",
      subject: "Biology",
      description: "Complete lab procedures and safety guidelines",
      link: "#",
    },
    {
      id: "history-lecture",
      title: "World History Lecture Series",
      type: "video",
      subject: "History",
      description: "Comprehensive video lectures on world history",
      link: "#",
    },
    {
      id: "physics-resources",
      title: "Physics Resource Hub",
      type: "link",
      subject: "Physics",
      description: "Collection of online resources and practice problems",
      link: "#",
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "textbook":
        return <BookOpen className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "link":
        return <LinkIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center gap-4">
        <Input placeholder="Search study materials..." className="max-w-xs" />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="flex-1 mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="textbooks">Textbooks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyMaterials.map((material) => (
              <Card key={material.id} className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1.5 shrink-0 px-4 pt-2 pb-2">
                      {getIcon(material.type)}
                      {formatType(material.type)}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">{material.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <Badge variant="secondary">{material.subject}</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={material.link}>Open Resource</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="textbooks" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyMaterials
              .filter((material) => material.type === "textbook")
              .map((material) => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1.5 shrink-0 px-4 pt-2 pb-2">
                        {getIcon(material.type)}
                        {formatType(material.type)}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <Badge variant="secondary">{material.subject}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={material.link}>Open Resource</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyMaterials
              .filter((material) => material.type === "document")
              .map((material) => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1.5 shrink-0 px-4 pt-2 pb-2">
                        {getIcon(material.type)}
                        {formatType(material.type)}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <Badge variant="secondary">{material.subject}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={material.link}>Open Resource</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyMaterials
              .filter((material) => material.type === "video")
              .map((material) => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1.5 shrink-0 px-4 pt-2 pb-2">
                        {getIcon(material.type)}
                        {formatType(material.type)}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <Badge variant="secondary">{material.subject}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={material.link}>Open Resource</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 