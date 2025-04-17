import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for the student progress table
const mockStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@school.edu",
    progress: 85,
    lastActive: "Today, 2:30 PM",
    modulesCompleted: 4,
    grade: "A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Maya Patel",
    email: "maya.p@school.edu",
    progress: 65,
    lastActive: "Yesterday",
    modulesCompleted: 3,
    grade: "B-",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Jamal Williams",
    email: "jamal.w@school.edu",
    progress: 92,
    lastActive: "Today, 9:15 AM",
    modulesCompleted: 5,
    grade: "A+",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    email: "sofia.r@school.edu",
    progress: 45,
    lastActive: "3 days ago",
    modulesCompleted: 2,
    grade: "C+",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Tyler Chen",
    email: "tyler.c@school.edu",
    progress: 78,
    lastActive: "Today, 11:45 AM",
    modulesCompleted: 4,
    grade: "B+",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma.w@school.edu",
    progress: 95,
    lastActive: "Today, 1:20 PM",
    modulesCompleted: 5,
    grade: "A+",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function StudentProgressTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Modules Completed</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.avatar} alt={student.name} />
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
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {student.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{student.modulesCompleted}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.grade === "A+" || student.grade === "A"
                        ? "default"
                        : student.grade === "B+" || student.grade === "B"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {student.grade}
                  </Badge>
                </TableCell>
                <TableCell>{student.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 