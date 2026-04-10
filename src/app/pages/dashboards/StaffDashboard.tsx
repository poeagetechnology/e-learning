import { KPICard } from '../../components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, ClipboardCheck, FileText, Calendar, Clock, BookOpen } from 'lucide-react';

const todayClasses = [
  { time: '09:00 AM', class: 'CS-301', subject: 'Data Structures', room: 'Room 405' },
  { time: '11:00 AM', class: 'CS-201', subject: 'Programming', room: 'Lab 3' },
  { time: '02:00 PM', class: 'CS-401', subject: 'Machine Learning', room: 'Room 502' },
];

const recentSubmissions = [
  { student: 'Alice Johnson', assignment: 'DS Assignment 3', time: '10 mins ago', grade: 'A' },
  { student: 'Bob Smith', assignment: 'Programming Lab', time: '25 mins ago', grade: 'B+' },
  { student: 'Carol White', assignment: 'DS Assignment 3', time: '1 hour ago', grade: 'A-' },
];

export function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your classes and students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Classes"
          value="8"
          icon={BookOpen}
          color="primary"
        />
        <KPICard
          title="Total Students"
          value="245"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="secondary"
        />
        <KPICard
          title="Attendance Today"
          value="91%"
          icon={ClipboardCheck}
          color="accent"
        />
        <KPICard
          title="Pending Grading"
          value="23"
          icon={FileText}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg px-3 py-2 min-w-[80px]">
                      <Clock className="w-4 h-4 mb-1" />
                      <span className="text-sm font-medium">{cls.time}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{cls.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cls.class} • {cls.room}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Mark Attendance</Button>
                    <Button variant="primary" size="sm">Start Class</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start" size="lg">
                <ClipboardCheck className="w-5 h-5 mr-2" />
                Mark Attendance
              </Button>
              <Button variant="secondary" className="w-full justify-start" size="lg">
                <FileText className="w-5 h-5 mr-2" />
                Upload Assignment
              </Button>
              <Button variant="accent" className="w-full justify-start" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                View Timetable
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Submissions</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium">Assignment</th>
                  <th className="text-left py-3 px-4 font-medium">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium">Grade</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">{submission.student}</td>
                    <td className="py-3 px-4">{submission.assignment}</td>
                    <td className="py-3 px-4 text-muted-foreground">{submission.time}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded text-sm font-medium">
                        {submission.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">Review</Button>
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
