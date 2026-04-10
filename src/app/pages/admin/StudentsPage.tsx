import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Download, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  cgpa: number;
  status: 'active' | 'inactive';
}

const studentsData: Student[] = [
  { id: 'S001', name: 'Alice Johnson', email: 'alice@example.com', department: 'Computer Science', year: 3, cgpa: 8.9, status: 'active' },
  { id: 'S002', name: 'Bob Smith', email: 'bob@example.com', department: 'Electrical Engineering', year: 2, cgpa: 8.5, status: 'active' },
  { id: 'S003', name: 'Charlie Brown', email: 'charlie@example.com', department: 'Mechanical Engineering', year: 4, cgpa: 8.2, status: 'active' },
  { id: 'S004', name: 'Diana Prince', email: 'diana@example.com', department: 'Computer Science', year: 1, cgpa: 9.1, status: 'active' },
  { id: 'S005', name: 'Ethan Hunt', email: 'ethan@example.com', department: 'Business Administration', year: 3, cgpa: 7.8, status: 'active' },
  { id: 'S006', name: 'Fiona Green', email: 'fiona@example.com', department: 'Civil Engineering', year: 2, cgpa: 8.6, status: 'active' },
  { id: 'S007', name: 'George Miller', email: 'george@example.com', department: 'Computer Science', year: 4, cgpa: 8.4, status: 'active' },
  { id: 'S008', name: 'Hannah Baker', email: 'hannah@example.com', department: 'Arts & Sciences', year: 1, cgpa: 9.0, status: 'active' },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [students, setStudents] = useState<Student[]>(studentsData);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage and monitor all student records</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <h3 className="text-2xl font-bold mt-1">5,250</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Students</p>
            <h3 className="text-2xl font-bold mt-1">5,180</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">New This Year</p>
            <h3 className="text-2xl font-bold mt-1">1,320</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Avg. CGPA</p>
            <h3 className="text-2xl font-bold mt-1">8.6</h3>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Students</CardTitle>
              <CardDescription>Complete list of enrolled students</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-10 rounded-lg border border-border bg-input-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left">
                      <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Department</th>
                    <th className="px-6 py-3 text-left font-semibold">Year</th>
                    <th className="px-6 py-3 text-left font-semibold">CGPA</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-accent/5 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="w-4 h-4 rounded border-border" />
                      </td>
                      <td className="px-6 py-4 font-medium">{student.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{student.email}</td>
                      <td className="px-6 py-4">{student.department}</td>
                      <td className="px-6 py-4">Year {student.year}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          student.cgpa >= 9 ? 'text-accent' :
                          student.cgpa >= 8 ? 'text-primary' :
                          'text-chart-4'
                        }`}>
                          {student.cgpa}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'active'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-accent rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-accent rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-destructive/10 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredStudents.length} of {students.length} students
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
