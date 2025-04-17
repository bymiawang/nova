"use client"

import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Brain,
  Calendar,
  ChevronDown,
  ClipboardList,
  Home,
  Lightbulb,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()
  const isTeacher = pathname?.includes("/teacher")
  const role = isTeacher ? "Teacher" : "Student"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-2 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 px-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold tracking-tight group-[[data-collapsible=icon]]:hidden">Nova</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="space-y-4">
          <div className="px-2 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground group-[[data-collapsible=icon]]:hidden">
              Overview
            </h2>
            <div className="space-y-1">
              <Button
                asChild
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">Dashboard</span>
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname?.includes("/projects") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard/projects">
                  <Users className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">My Projects</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="px-2 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground group-[[data-collapsible=icon]]:hidden">
              Learning Tools
            </h2>
            <div className="space-y-1">
              <Button
                asChild
                variant={pathname?.includes("/study-guide") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard/study-guide">
                  <BookOpen className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">Study Guide</span>
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname?.includes("/brainstorm") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard/brainstorm">
                  <Lightbulb className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">Brainstorm</span>
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname?.includes("/calendar") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard/calendar">
                  <Calendar className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">Calendar</span>
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname?.includes("/messages") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
              >
                <Link href="/dashboard/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span className="group-[[data-collapsible=icon]]:hidden">Messages</span>
                </Link>
              </Button>
            </div>
          </div>

          {isTeacher && (
            <div className="px-2 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground group-[[data-collapsible=icon]]:hidden">
                Teacher Tools
              </h2>
              <div className="space-y-1">
                <Button
                  asChild
                  variant={pathname?.includes("/students") ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
                >
                  <Link href="/dashboard/teacher/students">
                    <User className="h-4 w-4" />
                    <span className="group-[[data-collapsible=icon]]:hidden">Students</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={pathname?.includes("/rubrics") ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
                >
                  <Link href="/dashboard/teacher/rubrics">
                    <ClipboardList className="h-4 w-4" />
                    <span className="group-[[data-collapsible=icon]]:hidden">Rubrics</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={pathname?.includes("/analytics") ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
                >
                  <Link href="/dashboard/teacher/analytics">
                    <PieChart className="h-4 w-4" />
                    <span className="group-[[data-collapsible=icon]]:hidden">Analytics</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
      <div className="mt-auto border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 group-[[data-collapsible=icon]]:justify-center group-[[data-collapsible=icon]]:px-2"
            >
              <Avatar className="h-6 w-6 group-[[data-collapsible=icon]]:h-8 group-[[data-collapsible=icon]]:w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mia Wang" />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-xs group-[[data-collapsible=icon]]:hidden ml-2">
                <span>Mia Wang</span>
                <span className="text-[10px] text-muted-foreground">{role}</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 group-[[data-collapsible=icon]]:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Sidebar>
  )
}
