"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle, ChevronDown, Clock, Filter, Plus, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
    },
  ]

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Student Overview</CardTitle>
              <CardDescription>View and manage all students in your class</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name.charAt(0)}
                          {student.name.split(" ")[1].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.activeProjects}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.projectStatus === "On Track"
                          ? "outline"
                          : student.projectStatus === "Excellent Progress"
                            ? "default"
                            : student.projectStatus === "Needs Help"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {student.projectStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Projects</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Status Overview</CardTitle>
            <CardDescription>Summary of student project statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>On Track / Excellent</span>
                </div>
                <Badge variant="outline">4 Students</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Behind Schedule</span>
                </div>
                <Badge variant="outline">1 Student</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>Needs Help</span>
                </div>
                <Badge variant="outline">1 Student</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest student actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">Completed research phase for Environmental Study</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Today, 2:30 PM</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emma Wilson" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Emma Wilson</p>
                    <p className="text-xs text-muted-foreground">
                      Started a new project: "Renewable Energy Comparison"
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Today, 1:20 PM</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Tyler Chen" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Tyler Chen</p>
                    <p className="text-xs text-muted-foreground">Requested feedback on History Essay outline</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Today, 11:45 AM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
