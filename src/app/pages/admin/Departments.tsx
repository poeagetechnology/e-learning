import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Robert Smith",
    students: 450,
    faculty: 24,
    courses: 18,
    performance: 88,
  },
  {
    id: 2,
    name: "Electronics & Communication",
    code: "ECE",
    hod: "Prof. Sarah Johnson",
    students: 380,
    faculty: 20,
    courses: 16,
    performance: 85,
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    code: "ME",
    hod: "Dr. Michael Brown",
    students: 320,
    faculty: 18,
    courses: 14,
    performance: 82,
  },
  {
    id: 4,
    name: "Civil Engineering",
    code: "CE",
    hod: "Prof. Emily Davis",
    students: 290,
    faculty: 16,
    courses: 12,
    performance: 80,
  },
];

export function Departments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-muted-foreground mt-1">Manage all departments</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{dept.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Department Code: {dept.code}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    HOD: {dept.hod}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{dept.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{dept.faculty}</p>
                    <p className="text-xs text-muted-foreground">Faculty</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{dept.courses}</p>
                    <p className="text-xs text-muted-foreground">Courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{dept.performance}%</p>
                    <p className="text-xs text-muted-foreground">Performance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
