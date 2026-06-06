import { useNavigate } from "react-router";
import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  BookOpen,
  Building2,
  Clock,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const enrollmentTrend = [
  { month: "Jul", count: 2100 },
  { month: "Aug", count: 2310 },
  { month: "Sep", count: 2490 },
  { month: "Oct", count: 2610 },
  { month: "Nov", count: 2685 },
  { month: "Dec", count: 2720 },
  { month: "Jan", count: 2775 },
  { month: "Feb", count: 2810 },
  { month: "Mar", count: 2835 },
  { month: "Apr", count: 2847 },
];

const attendanceData = [
  { month: "Jan", rate: 92 },
  { month: "Feb", rate: 89 },
  { month: "Mar", rate: 94 },
  { month: "Apr", rate: 91 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 93 },
];

const departmentData = [
  { name: "CS", students: 450 },
  { name: "ECE", students: 380 },
  { name: "Mech", students: 320 },
  { name: "Civil", students: 290 },
  { name: "IT", students: 260 },
];

const feeData = [
  { name: "Collected", value: 75, color: "#10b981" },
  { name: "Pending", value: 25, color: "#f59e0b" },
];

const recentActivities = [
  {
    id: 1,
    text: "New student enrolled: Alice Johnson (CS Year 1)",
    time: "5 mins ago",
    icon: GraduationCap,
    color: "from-violet-500 to-indigo-600",
    category: "Enrollment",
  },
  {
    id: 2,
    text: "Finals exam schedule published for all departments",
    time: "1 hour ago",
    icon: FileText,
    color: "from-cyan-500 to-blue-600",
    category: "Academic",
  },
  {
    id: 3,
    text: "Faculty meeting scheduled for tomorrow at 10 AM",
    time: "2 hours ago",
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    category: "Staff",
  },
  {
    id: 4,
    text: "Fee reminder sent to 120 pending students",
    time: "3 hours ago",
    icon: DollarSign,
    color: "from-amber-500 to-orange-600",
    category: "Finance",
  },
  {
    id: 5,
    text: "New course added: Advanced Machine Learning",
    time: "5 hours ago",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    category: "Course",
  },
  {
    id: 6,
    text: "Department performance report generated",
    time: "Yesterday",
    icon: TrendingUp,
    color: "from-teal-500 to-green-600",
    category: "Report",
  },
];

const upcomingEvents = [
  {
    date: 15,
    month: "APR",
    title: "Annual Sports Day",
    location: "Main Campus Ground",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    date: 18,
    month: "APR",
    title: "Parent-Teacher Meeting",
    location: "All Departments",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    date: 22,
    month: "APR",
    title: "Final Exams Begin",
    location: "All Exam Halls",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    date: 30,
    month: "APR",
    title: "Scholarship Deadline",
    location: "Admin Office",
    gradient: "from-amber-500 to-orange-500",
  },
];

const quickActions = [
  {
    label: "Add Student",
    icon: GraduationCap,
    color: "from-violet-500 to-indigo-600",
    description: "Enroll student",
    path: "/admin/students",
  },
  {
    label: "Add Staff",
    icon: UserPlus,
    color: "from-emerald-500 to-teal-600",
    description: "Register faculty",
    path: "/admin/staff",
  },
  {
    label: "Schedule Exam",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    description: "Create exam",
    path: "/admin/exams",
  },
  {
    label: "Send Notice",
    icon: MessageSquare,
    color: "from-amber-500 to-orange-500",
    description: "Broadcast",
    path: "/admin",
  },
  {
    label: "New Course",
    icon: BookOpen,
    color: "from-pink-500 to-rose-500",
    description: "Add course",
    path: "/admin/courses",
  },
  {
    label: "Reports",
    icon: TrendingUp,
    color: "from-teal-500 to-green-500",
    description: "Analytics",
    path: "/admin",
  },
];

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: "12px",
};

export function AdminDashboard() {
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
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {greeting}, {user?.name || "Admin"}. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25 w-fit flex-shrink-0">
          <TrendingUp className="w-4 h-4" />
          All Systems Operational
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Total Students"
          value="2,847"
          icon={GraduationCap}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <KPICard
          title="Total Staff"
          value="156"
          icon={Users}
          trend={{ value: 3, isPositive: true }}
          color="secondary"
        />
        <KPICard
          title="Attendance Rate"
          value="92.4%"
          icon={ClipboardCheck}
          trend={{ value: 2.5, isPositive: true }}
          color="accent"
        />
        <KPICard
          title="Fee Collection"
          value="75%"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          color="warning"
        />
      </div>

      {/* Secondary quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Active Courses",
            value: "48",
            icon: BookOpen,
            iconBg: "bg-violet-100 dark:bg-violet-500/10",
            iconColor: "text-violet-600 dark:text-violet-400",
            valColor: "text-violet-700 dark:text-violet-300",
          },
          {
            label: "Departments",
            value: "6",
            icon: Building2,
            iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
            iconColor: "text-cyan-600 dark:text-cyan-400",
            valColor: "text-cyan-700 dark:text-cyan-300",
          },
          {
            label: "Exams This Week",
            value: "5",
            icon: FileText,
            iconBg: "bg-emerald-100 dark:bg-emerald-500/10",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            valColor: "text-emerald-700 dark:text-emerald-300",
          },
          {
            label: "Pending Approvals",
            value: "12",
            icon: Clock,
            iconBg: "bg-amber-100 dark:bg-amber-500/10",
            iconColor: "text-amber-600 dark:text-amber-400",
            valColor: "text-amber-700 dark:text-amber-300",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:shadow-md hover:border-border/80 transition-all"
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${stat.iconBg}`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className={`text-xl font-bold leading-tight ${stat.valColor}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1: Enrollment trend + Fee pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" />
              Student Enrollment Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={enrollmentTrend}>
                <defs>
                  <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c3bff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6c3bff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  domain={[1900, 3000]}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6c3bff"
                  strokeWidth={2.5}
                  fill="url(#enrollGrad)"
                  dot={{ fill: "#6c3bff", r: 3.5, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 5, stroke: "#6c3bff", strokeWidth: 2, fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              Fee Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5 mt-1">
              {feeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-muted/40 rounded-xl text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                &#8377;21.3L
              </p>
              <p className="text-xs text-muted-foreground">collected this semester</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Attendance + Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              Monthly Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#6C3BFF" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  domain={[80, 100]}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="url(#attendGrad)"
                  strokeWidth={3}
                  dot={{ fill: "#6C3BFF", r: 4.5, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, stroke: "#6C3BFF", strokeWidth: 2, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600" />
              Students by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={departmentData} barCategoryGap="30%">
                <defs>
                  <linearGradient id="deptBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#6C3BFF" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="students" fill="url(#deptBarGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all group"
                >
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${action.color} shadow-sm group-hover:shadow-md transition-shadow`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold leading-tight">{action.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom: Activities + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
                Recent Activities
              </CardTitle>
              <button className="text-xs text-primary hover:underline font-medium">
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${activity.color} flex-shrink-0 shadow-sm`}
                    >
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug truncate">
                        {activity.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded-md font-medium text-muted-foreground">
                          {activity.category}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div
                    className={`flex-shrink-0 text-center p-2.5 rounded-xl bg-gradient-to-br ${event.gradient} min-w-[52px]`}
                  >
                    <p className="text-white font-bold text-lg leading-none">
                      {event.date}
                    </p>
                    <p className="text-white/80 text-[9px] font-semibold tracking-wider mt-0.5">
                      {event.month}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="font-semibold text-sm leading-tight truncate">
                      {event.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      {event.location}
                    </p>
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
