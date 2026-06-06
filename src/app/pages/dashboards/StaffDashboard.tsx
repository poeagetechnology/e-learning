import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Users,
  ClipboardCheck,
  FileText,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
} from "lucide-react";

const todayClasses = [
  {
    time: "09:00 AM",
    class: "CS-301",
    subject: "Data Structures",
    room: "Room 405",
    enrolled: 42,
  },
  {
    time: "11:00 AM",
    class: "CS-201",
    subject: "Programming",
    room: "Lab 3",
    enrolled: 38,
  },
  {
    time: "02:00 PM",
    class: "CS-401",
    subject: "Machine Learning",
    room: "Room 502",
    enrolled: 35,
  },
];

const recentSubmissions = [
  {
    student: "Alice Johnson",
    assignment: "DS Assignment 3",
    time: "10 mins ago",
    grade: "A",
  },
  {
    student: "Bob Smith",
    assignment: "Programming Lab",
    time: "25 mins ago",
    grade: "B+",
  },
  {
    student: "Carol White",
    assignment: "DS Assignment 3",
    time: "1 hour ago",
    grade: "A-",
  },
];

const gradeColors: Record<string, string> = {
  "A": "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  "A-": "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  "B+": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  "B": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
};

export function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Manage your classes and students.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-medium shadow-lg shadow-emerald-500/25">
          <CheckCircle className="w-4 h-4" />
          3 Classes Today
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-500 text-white rounded-xl px-3 py-2.5 min-w-[80px] shadow-sm">
                      <Clock className="w-3.5 h-3.5 mb-1 opacity-80" />
                      <span className="text-xs font-semibold">{cls.time}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{cls.subject}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cls.class} &bull; {cls.room} &bull; {cls.enrolled} students
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Attendance
                    </Button>
                    <Button variant="primary" size="sm">
                      Start Class
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              <Button
                variant="primary"
                className="w-full justify-start gap-3"
                size="lg"
              >
                <ClipboardCheck className="w-4 h-4" />
                Mark Attendance
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start gap-3"
                size="lg"
              >
                <FileText className="w-4 h-4" />
                Upload Assignment
              </Button>
              <Button
                variant="accent"
                className="w-full justify-start gap-3"
                size="lg"
              >
                <Calendar className="w-4 h-4" />
                View Timetable
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
              Recent Submissions
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assignment</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Submitted</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/60 hover:bg-muted/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-sm">{submission.student}</td>
                    <td className="py-3.5 px-4 text-sm">{submission.assignment}</td>
                    <td className="py-3.5 px-4 text-sm text-muted-foreground">{submission.time}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${gradeColors[submission.grade] ?? "bg-muted text-muted-foreground"}`}>
                        {submission.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        Review
                      </Button>
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
