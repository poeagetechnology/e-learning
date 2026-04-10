import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  ClipboardCheck,
  FileText,
  Calendar,
  DollarSign,
  BookOpen,
  Award,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const subjectMarks = [
  { subject: "Math", marks: 85 },
  { subject: "Physics", marks: 78 },
  { subject: "Chemistry", marks: 92 },
  { subject: "English", marks: 88 },
  { subject: "CS", marks: 95 },
];

const upcomingClasses = [
  {
    time: "09:00 AM",
    subject: "Mathematics",
    room: "Room 301",
    teacher: "Dr. Smith",
  },
  {
    time: "11:00 AM",
    subject: "Physics Lab",
    room: "Lab 2",
    teacher: "Prof. Johnson",
  },
  {
    time: "02:00 PM",
    subject: "Computer Science",
    room: "Room 405",
    teacher: "Dr. Brown",
  },
];

const pendingAssignments = [
  {
    title: "Data Structures Assignment",
    subject: "CS",
    dueDate: "Apr 12, 2026",
    status: "pending",
  },
  {
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Apr 14, 2026",
    status: "pending",
  },
  {
    title: "English Essay",
    subject: "English",
    dueDate: "Apr 15, 2026",
    status: "pending",
  },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Attendance"
          value="94.2%"
          icon={ClipboardCheck}
          trend={{ value: 2, isPositive: true }}
          color="accent"
        />
        <KPICard
          title="Overall GPA"
          value="3.8"
          icon={Award}
          trend={{ value: 0.2, isPositive: true }}
          color="primary"
        />
        <KPICard
          title="Pending Assignments"
          value="3"
          icon={FileText}
          color="warning"
        />
        <KPICard
          title="Fee Due"
          value="$1,200"
          icon={DollarSign}
          color="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectMarks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="marks" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg px-2 py-1 min-w-[60px]">
                    <Clock className="w-4 h-4 mb-1" />
                    <span className="text-xs font-medium">{cls.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{cls.subject}</h4>
                    <p className="text-xs text-muted-foreground">{cls.room}</p>
                    <p className="text-xs text-muted-foreground">
                      {cls.teacher}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Assignments</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <FileText className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {assignment.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Subject: {assignment.subject}
                      </p>
                      <p className="text-xs text-warning mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Due: {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    Submit
                  </Button>
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
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                <Calendar className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">Timetable</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all">
                <ClipboardCheck className="w-8 h-8 text-secondary" />
                <span className="text-sm font-medium">Attendance</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all">
                <FileText className="w-8 h-8 text-accent" />
                <span className="text-sm font-medium">Results</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-warning hover:bg-orange-50 transition-all">
                <DollarSign className="w-8 h-8 text-warning" />
                <span className="text-sm font-medium">Pay Fees</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-primary/5 border-l-4 border-primary rounded">
              <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Library Hours Extended</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The library will now be open until 10 PM during exam week.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Posted 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-accent/5 border-l-4 border-accent rounded">
              <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">
                  Scholarship Applications Open
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Merit-based scholarship applications are now open until April
                  30th.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Posted 5 hours ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
