import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Plus, BookOpen } from "lucide-react";

const coursesData = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures & Algorithms",
    department: "Computer Science",
    credits: 4,
    semester: "3rd",
    faculty: "Dr. Smith",
  },
  {
    id: 2,
    code: "CS302",
    name: "Database Management Systems",
    department: "Computer Science",
    credits: 3,
    semester: "3rd",
    faculty: "Prof. Johnson",
  },
  {
    id: 3,
    code: "ECE201",
    name: "Digital Electronics",
    department: "Electronics",
    credits: 4,
    semester: "2nd",
    faculty: "Dr. Brown",
  },
  {
    id: 4,
    code: "ME301",
    name: "Thermodynamics",
    department: "Mechanical",
    credits: 3,
    semester: "3rd",
    faculty: "Prof. Davis",
  },
  {
    id: 5,
    code: "CS401",
    name: "Machine Learning",
    department: "Computer Science",
    credits: 4,
    semester: "4th",
    faculty: "Dr. Wilson",
  },
];

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all courses and subjects
          </p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.code}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">{course.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credits:</span>
                      <span className="font-medium">{course.credits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Semester:</span>
                      <span className="font-medium">{course.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Faculty:</span>
                      <span className="font-medium">{course.faculty}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
