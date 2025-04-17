"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Math Assignment Due",
      date: new Date(2025, 4, 15),
      type: "assignment",
      subject: "Mathematics",
      description: "Complete chapter 5 exercises",
      time: "11:59 PM",
    },
    {
      id: "2",
      title: "Science Project Presentation",
      date: new Date(2025, 4, 20),
      type: "presentation",
      subject: "Science",
      description: "Present research findings on climate change",
      time: "2:00 PM",
    },
    {
      id: "3",
      title: "History Quiz",
      date: new Date(2025, 4, 22),
      type: "quiz",
      subject: "History",
      description: "World War II and its impact",
      time: "10:00 AM",
    },
  ])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-500 hover:bg-blue-600"
      case "presentation":
        return "bg-purple-500 hover:bg-purple-600"
      case "quiz":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <div className="flex flex-col h-full w-full pb-8">
      <div className="flex justify-between items-center">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-6 flex-1">
        <div className="lg:col-span-3 xl:col-span-4 2xl:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl lg:text-2xl">{format(currentDate, "MMMM yyyy")}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
                {days.map((day) => {
                  const dayEvents = events.filter((event) =>
                    isSameMonth(event.date, day) && event.date.getDate() === day.getDate()
                  )
                  return (
                    <div
                      key={day.toString()}
                      className={`p-2 min-h-[120px] border rounded-md relative ${
                        isToday(day) ? "bg-primary/10" : ""
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
                      <div className="mt-1 space-y-1 max-h-[90px] overflow-y-auto">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1.5 rounded text-white cursor-pointer transition-colors ${getEventTypeColor(
                              event.type
                            )}`}
                            title={`${event.title}\n${event.description}\nTime: ${event.time}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-white/80 text-[10px] truncate">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4 h-full">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next 5 events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(event.date, "MMMM d, yyyy")}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {event.subject}
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 