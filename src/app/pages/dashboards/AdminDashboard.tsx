import { KPICard } from "../../components/dashboard/KPICard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  Calendar,
  Bell,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 88 },
  { month: "Jun", attendance: 93 },
];

const departmentData = [
  { name: "CS", students: 450 },
  { name: "ECE", students: 380 },
  { name: "Mech", students: 320 },
  { name: "Civil", students: 290 },
];

const feeCollectionData = [
  { name: "Collected", value: 75, color: "#10b981" },
  { name: "Pending", value: 25, color: "#f59e0b" },
];

const recentActivities = [
  {
    id: 1,
    text: "New student enrollment: John Doe",
    time: "5 mins ago",
    icon: Users,
    color: "from-violet-500 to-indigo-600",
  },
  {
    id: 2,
    text: "Exam schedule published for Finals",
    time: "1 hour ago",
    icon: FileText,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    text: "Staff meeting scheduled for tomorrow",
    time: "2 hours ago",
    icon: Calendar,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    text: "Fee reminder sent to 120 students",
    time: "3 hours ago",
    icon: Bell,
    color: "from-amber-500 to-orange-600",
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25">
          <TrendingUp className="w-4 h-4" />
          All Systems Operational
        </div>
      </div>

      {/* KPI Cards */}
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

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" />
              Attendance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6C3BFF" />
                    <stop offset="100%" stopColor="#06B6D4" />
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
                />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="url(#attendGrad)"
                  strokeWidth={3}
                  dot={{
                    fill: "#6C3BFF",
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              Students by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={departmentData} barCategoryGap="30%">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2CB" />
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
                />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                />
                <Bar
                  dataKey="students"
                  fill="url(#barGrad)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
              Fee Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={feeCollectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feeCollectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-5 mt-1">
              {feeCollectionData.map((item) => (
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
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">
                        {activity.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  label: "Active Courses",
                  value: "42",
                  color: "text-violet-600 dark:text-violet-400",
                },
                {
                  label: "Departments",
                  value: "8",
                  color: "text-cyan-600 dark:text-cyan-400",
                },
                {
                  label: "Upcoming Exams",
                  value: "5",
                  color: "text-emerald-600 dark:text-emerald-400",
                },
                {
                  label: "Pending Approvals",
                  value: "12",
                  color: "text-amber-600 dark:text-amber-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {s.label}
                  </span>
                  <span className={`text-sm font-bold ${s.color}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-xs">APR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Annual Sports Day</h4>
                  <p className="text-sm text-muted-foreground">
                    Main Campus Ground
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-xs">APR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Parent-Teacher Meeting</h4>
                  <p className="text-sm text-muted-foreground">
                    All Departments
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">22</div>
                  <div className="text-xs">APR</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Final Exams Begin</h4>
                  <p className="text-sm text-muted-foreground">All Years</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
