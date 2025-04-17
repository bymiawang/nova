import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    grade: "A-",
    assignmentsCompleted: 12,
    averageScore: 88,
    lastActive: "2024-04-17",
    trend: "up",
  },
  {
    id: 2,
    name: "Jane Smith",
    grade: "A",
    assignmentsCompleted: 15,
    averageScore: 92,
    lastActive: "2024-04-16",
    trend: "up",
  },
  {
    id: 3,
    name: "Bob Johnson",
    grade: "B+",
    assignmentsCompleted: 10,
    averageScore: 85,
    lastActive: "2024-04-15",
    trend: "down",
  },
  {
    id: 4,
    name: "Alice Brown",
    grade: "A",
    assignmentsCompleted: 14,
    averageScore: 94,
    lastActive: "2024-04-17",
    trend: "up",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    grade: "B",
    assignmentsCompleted: 11,
    averageScore: 82,
    lastActive: "2024-04-14",
    trend: "stable",
  },
]

export function StudentPerformanceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Assignments</TableHead>
            <TableHead>Average Score</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.assignmentsCompleted}</TableCell>
              <TableCell>{student.averageScore}%</TableCell>
              <TableCell>
                <Badge
                  variant={
                    student.trend === "up"
                      ? "success"
                      : student.trend === "down"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {student.trend === "up"
                    ? "Improving"
                    : student.trend === "down"
                    ? "Declining"
                    : "Stable"}
                </Badge>
              </TableCell>
              <TableCell>{student.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 