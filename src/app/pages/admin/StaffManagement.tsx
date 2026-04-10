import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Plus, Download, Filter, Edit, Trash2, Eye } from 'lucide-react';

const staffData = [
  { id: 1, name: 'Dr. Robert Smith', empId: 'EMP001', department: 'Computer Science', position: 'Professor', email: 'robert@college.edu', phone: '+1234567890', experience: '15 years' },
  { id: 2, name: 'Prof. Sarah Johnson', empId: 'EMP002', department: 'Electronics', position: 'Associate Professor', email: 'sarah@college.edu', phone: '+1234567891', experience: '10 years' },
  { id: 3, name: 'Dr. Michael Brown', empId: 'EMP003', department: 'Mechanical', position: 'Professor', email: 'michael@college.edu', phone: '+1234567892', experience: '12 years' },
  { id: 4, name: 'Prof. Emily Davis', empId: 'EMP004', department: 'Computer Science', position: 'Assistant Professor', email: 'emily@college.edu', phone: '+1234567893', experience: '8 years' },
];

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage faculty and staff members</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Emp ID</th>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Position</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Experience</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{staff.empId}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
                          {staff.name[0]}
                        </div>
                        <span>{staff.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{staff.department}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                        {staff.position}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{staff.email}</td>
                    <td className="py-3 px-4">{staff.experience}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
