"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const pathname = usePathname()
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Assignment",
      message: "Math homework due tomorrow",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Project Update",
      message: "Your science project has been graded",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Class Announcement",
      message: "History class cancelled tomorrow",
      time: "2 hours ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  function getPageTitle(pathname: string) {
    switch (pathname) {
      case "/dashboard":
        return "Welcome back, Mia"
      case "/dashboard/projects":
        return "Projects"
      case "/dashboard/study-guide":
        return "Study Guide"
      case "/dashboard/calendar":
        return "Calendar"
      case "/dashboard/messages":
        return "Messages"
      case "/dashboard/teacher":
        return "Welcome back, Mia"
      case "/dashboard/teacher/students":
        return "Students"
      case "/dashboard/teacher/rubrics":
        return "Rubrics"
      case "/dashboard/teacher/analytics":
        return "Analytics"
      case "/dashboard/brainstorm":
        return "Brainstorm"
      default:
        return "Welcome, Mia"
    }
  }

  return (
    <div className="container flex h-16 items-center gap-4 px-4 md:px-6">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">
          {getPageTitle(pathname)}
        </h1>
      </div>
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2">
              <h2 className="font-semibold">Notifications</h2>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 p-3 ${
                    !notification.read ? "bg-accent" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </div>
  )
}
