import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Users, GraduationCap, FileText, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export function HODDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">HOD Dashboard</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Computer Science Department Overview
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/25">
          <TrendingUp className="w-4 h-4" />
          Dept. Performance: 88%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Department Students"
          value="450"
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
          color="primary"
        />
        <KPICard
          title="Faculty Members"
          value="24"
          icon={Users}
          color="secondary"
        />
        <KPICard
          title="Courses Offered"
          value="18"
          icon={FileText}
          color="accent"
        />
        <KPICard
          title="Dept. Performance"
          value="88%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
              Faculty Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Dr. Robert Smith", role: "Professor", courses: 3 },
                { name: "Prof. Sarah Johnson", role: "Associate Professor", courses: 2 },
                { name: "Dr. Michael Brown", role: "Professor", courses: 3 },
                { name: "Prof. Emily Davis", role: "Assistant Professor", courses: 2 },
              ].map((faculty, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                      {faculty.name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{faculty.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {faculty.role} &bull; {faculty.courses} courses
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
              Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Dr. Smith", dates: "Apr 15–16", reason: "Medical", urgent: true },
                { name: "Prof. Johnson", dates: "Apr 20", reason: "Personal", urgent: false },
                { name: "Dr. Brown", dates: "Apr 22–23", reason: "Conference", urgent: false },
              ].map((request, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{request.name}</h4>
                        {request.urgent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {request.dates} &bull; {request.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </Button>
                    <Button variant="accent" size="sm" className="flex-1 gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Active Courses", value: "18", color: "text-violet-600 dark:text-violet-400" },
                { label: "Pending Assessments", value: "6", color: "text-amber-600 dark:text-amber-400" },
                { label: "Avg. Attendance", value: "91%", color: "text-emerald-600 dark:text-emerald-400" },
                { label: "This Semester GPA", value: "3.6", color: "text-cyan-600 dark:text-cyan-400" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "15", month: "APR", title: "Internal Assessment Week", desc: "All subjects" },
                { date: "18", month: "APR", title: "Department Review Meeting", desc: "HOD Office, 10 AM" },
                { date: "22", month: "APR", title: "Final Exams Begin", desc: "Main Hall" },
              ].map((event, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-2.5 rounded-xl text-center min-w-[52px] shadow-sm">
                    <div className="text-xl font-bold leading-none">{event.date}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">{event.month}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
