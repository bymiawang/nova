"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moduleData = [
  {
    name: "Introduction to Programming",
    completion: 85,
    averageScore: 88,
    students: 24,
  },
  {
    name: "Data Structures",
    completion: 72,
    averageScore: 82,
    students: 24,
  },
  {
    name: "Algorithms",
    completion: 65,
    averageScore: 78,
    students: 24,
  },
  {
    name: "Web Development",
    completion: 90,
    averageScore: 92,
    students: 24,
  },
  {
    name: "Database Systems",
    completion: 78,
    averageScore: 85,
    students: 24,
  },
]

export function ModuleCompletionChart() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Module Completion Rates</h3>
          <div className="space-y-4">
            {moduleData.map((module) => (
              <div key={module.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{module.name}</span>
                  <span className="font-medium">{module.completion}%</span>
                </div>
                <Progress value={module.completion} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Performance by Module</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={moduleData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                layout="vertical"
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar 
                  dataKey="averageScore" 
                  fill="url(#colorValue)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Module Statistics</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {moduleData.map((module) => (
            <div key={module.name} className="space-y-2">
              <h4 className="font-medium">{module.name}</h4>
              <div className="text-sm text-muted-foreground">
                <p>Completion: {module.completion}%</p>
                <p>Average Score: {module.averageScore}%</p>
                <p>Students: {module.students}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 