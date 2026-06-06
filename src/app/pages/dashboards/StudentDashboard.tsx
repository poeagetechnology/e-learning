import { useNavigate } from "react-router";
import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import {
  ClipboardCheck,
  FileText,
  Calendar,
  DollarSign,
  BookOpen,
  Award,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RingProgress({
  value,
  max,
  color,
  size = 90,
  strokeWidth = 8,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  const center = size / 2;
  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }}
      />
    </svg>
  );
}

function RingStat({
  value,
  max,
  color,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  sublabel: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <RingProgress value={value} max={max} color={color} size={88} strokeWidth={8} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[15px] font-bold leading-none">{pct}%</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold leading-tight">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

const subjectMarks = [
  { subject: "Math", marks: 85 },
  { subject: "Physics", marks: 78 },
  { subject: "Chem", marks: 92 },
  { subject: "English", marks: 88 },
  { subject: "CS", marks: 95 },
];

const gpaData = [
  { sem: "S1", gpa: 3.5 },
  { sem: "S2", gpa: 3.7 },
  { sem: "S3", gpa: 3.7 },
  { sem: "S4", gpa: 3.8 },
  { sem: "S5", gpa: 3.8 },
];

const todayClasses = [
  {
    time: "09:00",
    subject: "Mathematics",
    room: "Room 301",
    teacher: "Dr. Smith",
    type: "Lecture",
    color: "from-violet-500 to-indigo-600",
  },
  {
    time: "11:00",
    subject: "Physics Lab",
    room: "Lab 2",
    teacher: "Prof. Johnson",
    type: "Lab",
    color: "from-blue-500 to-cyan-500",
  },
  {
    time: "02:00",
    subject: "Computer Science",
    room: "Room 405",
    teacher: "Dr. Brown",
    type: "Lecture",
    color: "from-emerald-500 to-teal-600",
  },
  {
    time: "04:00",
    subject: "English",
    room: "Room 202",
    teacher: "Ms. Davis",
    type: "Tutorial",
    color: "from-amber-500 to-orange-500",
  },
];

const upcomingExams = [
  {
    subject: "Mathematics",
    date: "Apr 15, 2026",
    daysLeft: 9,
    type: "Mid-Term",
    color: "from-violet-500 to-indigo-600",
    textColor: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    subject: "Physics",
    date: "Apr 18, 2026",
    daysLeft: 12,
    type: "Practical",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    subject: "Computer Science",
    date: "Apr 22, 2026",
    daysLeft: 16,
    type: "Final",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    subject: "English Literature",
    date: "Apr 28, 2026",
    daysLeft: 22,
    type: "Final",
    color: "from-amber-500 to-orange-500",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
  },
];

const pendingAssignments = [
  {
    title: "Data Structures Assignment",
    subject: "CS",
    dueDate: "Apr 12, 2026",
    priority: "High",
  },
  {
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Apr 14, 2026",
    priority: "Medium",
  },
  {
    title: "English Essay",
    subject: "English",
    dueDate: "Apr 15, 2026",
    priority: "Low",
  },
];

const priorityColors: Record<string, string> = {
  High: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10",
  Medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
  Low: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
};

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: "12px",
};

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{greeting}, {user?.name || "Student"}!</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Here&apos;s your academic overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-medium shadow-lg shadow-orange-500/25 w-fit flex-shrink-0">
          <Award className="w-4 h-4" />
          GPA 3.8 &mdash; Excellent
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Attendance"
          value="94.2%"
          icon={ClipboardCheck}
          trend={{ value: 2, isPositive: true }}
          color="accent"
        />
        <KPICard
          title="Overall GPA"
          value="3.8 / 4.0"
          icon={Award}
          trend={{ value: 0.1, isPositive: true }}
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
          value="&#8377;12,000"
          icon={DollarSign}
          color="secondary"
        />
      </div>

      {/* Row 1: Academic Overview + Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" />
              Academic Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Progress rings */}
              <div className="flex justify-around sm:justify-start gap-6 flex-shrink-0">
                <RingStat
                  value={94}
                  max={100}
                  color="#22c55e"
                  label="Attendance"
                  sublabel="94.2%"
                />
                <RingStat
                  value={95}
                  max={100}
                  color="#7c3aed"
                  label="Performance"
                  sublabel="GPA 3.8"
                />
                <RingStat
                  value={72}
                  max={100}
                  color="#f59e0b"
                  label="Fees Paid"
                  sublabel="&#8377;36,000"
                />
              </div>

              {/* GPA trend mini chart */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  GPA Trend
                </p>
                <ResponsiveContainer width="100%" height={130}>
                  <LineChart data={gpaData}>
                    <XAxis
                      dataKey="sem"
                      stroke="var(--muted-foreground)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[3.0, 4.0]}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="gpa"
                      stroke="#7c3aed"
                      strokeWidth={2.5}
                      dot={{ fill: "#7c3aed", r: 3.5, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 5, stroke: "#7c3aed", strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {todayClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start group"
                >
                  <div
                    className={`flex-shrink-0 text-center px-2 py-2 rounded-xl bg-gradient-to-br ${cls.color} min-w-[52px]`}
                  >
                    <Clock className="w-3 h-3 text-white/80 mx-auto mb-0.5" />
                    <span className="text-white text-[11px] font-bold leading-none">
                      {cls.time}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="font-semibold text-sm leading-tight truncate">
                      {cls.subject}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {cls.room} &bull; {cls.teacher}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 mt-1 bg-muted px-1.5 py-0.5 rounded-md">
                    {cls.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Subject Performance + Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={subjectMarks} barCategoryGap="28%">
                <defs>
                  <linearGradient id="studentBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="subject"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="marks"
                  fill="url(#studentBarGrad)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-500" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {upcomingExams.map((exam, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl border border-border ${exam.bgColor} transition-colors`}
                >
                  <div
                    className={`flex-shrink-0 text-center px-2.5 py-1.5 rounded-lg bg-gradient-to-br ${exam.color} min-w-[44px]`}
                  >
                    <p className="text-white font-bold text-sm leading-none">
                      {exam.daysLeft}
                    </p>
                    <p className="text-white/80 text-[9px] font-medium">days</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      {exam.subject}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {exam.date}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${exam.textColor} bg-white/60 dark:bg-black/20`}
                  >
                    {exam.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Assignments + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
                Pending Assignments
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {pendingAssignments.map((assignment, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 border border-border rounded-xl hover:border-primary/40 transition-colors"
                >
                  <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg flex-shrink-0">
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight truncate">
                      {assignment.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      Due: {assignment.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityColors[assignment.priority]}`}
                    >
                      {assignment.priority}
                    </span>
                    <Button variant="primary" size="sm">
                      Submit
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
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-green-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Timetable",
                  icon: Calendar,
                  color: "from-violet-500 to-indigo-600",
                  path: "/student/timetable",
                },
                {
                  label: "Attendance",
                  icon: ClipboardCheck,
                  color: "from-emerald-500 to-teal-600",
                  path: "/student/attendance",
                },
                {
                  label: "Exam Results",
                  icon: TrendingUp,
                  color: "from-blue-500 to-cyan-500",
                  path: "/student/exams",
                },
                {
                  label: "Pay Fees",
                  icon: DollarSign,
                  color: "from-amber-500 to-orange-500",
                  path: "/student/fees",
                },
                {
                  label: "Assignments",
                  icon: FileText,
                  color: "from-pink-500 to-rose-500",
                  path: "/student/assignments",
                },
                {
                  label: "Library",
                  icon: BookOpen,
                  color: "from-teal-500 to-green-500",
                  path: "/student",
                },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="flex items-center gap-3 p-3.5 border border-border rounded-xl hover:border-primary/30 hover:bg-muted/50 transition-all group"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${action.color} flex-shrink-0 shadow-sm`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: BookOpen,
                title: "Library Hours Extended",
                body: "Library open until 10 PM during exam week. Quiet study zones available on all floors.",
                time: "2 hours ago",
                borderColor: "border-l-primary",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
              },
              {
                icon: Award,
                title: "Scholarship Applications Open",
                body: "Merit-based scholarships now open. Apply before April 30th with your academic records.",
                time: "5 hours ago",
                borderColor: "border-l-emerald-500",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-600 dark:text-emerald-400",
              },
              {
                icon: Calendar,
                title: "Sports Day Registration",
                body: "Register for annual sports events before April 12th. Multiple categories available.",
                time: "Yesterday",
                borderColor: "border-l-violet-500",
                iconBg: "bg-violet-500/10",
                iconColor: "text-violet-600 dark:text-violet-400",
              },
              {
                icon: FileText,
                title: "Exam Hall Ticket Available",
                body: "Download your exam hall tickets from the student portal. Mandatory for all examinations.",
                time: "2 days ago",
                borderColor: "border-l-amber-500",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-600 dark:text-amber-400",
              },
            ].map((ann, idx) => {
              const Icon = ann.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-4 bg-muted/30 border-l-4 ${ann.borderColor} rounded-r-xl`}
                >
                  <div className={`p-2 ${ann.iconBg} rounded-lg flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${ann.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{ann.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {ann.body}
                    </p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1.5">
                      {ann.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
