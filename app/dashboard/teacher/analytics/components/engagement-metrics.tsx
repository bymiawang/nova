"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const engagementData = [
  { name: "Discussion Posts", value: 85 },
  { name: "Assignment Submissions", value: 92 },
  { name: "Module Completion", value: 78 },
  { name: "Quiz Participation", value: 88 },
  { name: "Resource Views", value: 95 },
]

const weeklyEngagement = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 72 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 75 },
  { name: "Sat", value: 60 },
  { name: "Sun", value: 55 },
]

export function EngagementMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Weekly Engagement Trend</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEngagement} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Engagement Breakdown</h3>
          <div className="space-y-4">
            {engagementData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Top Performing Students</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {["John Doe", "Jane Smith", "Alice Brown"].map((name) => (
            <div key={name} className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">95% engagement</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 