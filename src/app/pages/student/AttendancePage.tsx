import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SubjectAttendance {
  subject: string;
  present: number;
  absent: number;
  leave: number;
  total: number;
  percentage: number;
}

const subjectAttendance: SubjectAttendance[] = [
  { subject: 'Data Structures', present: 42, absent: 2, leave: 1, total: 45, percentage: 93.3 },
  { subject: 'Algorithms', present: 38, absent: 4, leave: 1, total: 43, percentage: 88.4 },
  { subject: 'Database Systems', present: 40, absent: 3, leave: 2, total: 45, percentage: 88.9 },
  { subject: 'Operating Systems', present: 41, absent: 1, leave: 1, total: 43, percentage: 95.3 },
  { subject: 'Computer Networks', present: 39, absent: 3, leave: 2, total: 44, percentage: 88.6 },
  { subject: 'Web Technologies', present: 43, absent: 1, leave: 1, total: 45, percentage: 95.6 },
];

const monthlyTrend = [
  { month: 'Sep', percentage: 91 },
  { month: 'Oct', percentage: 89 },
  { month: 'Nov', percentage: 94 },
  { month: 'Dec', percentage: 92 },
  { month: 'Jan', percentage: 88 },
  { month: 'Feb', percentage: 90 },
  { month: 'Mar', percentage: 93 },
];

const overallData = [
  { name: 'Present', value: 243, color: '#22C55E' },
  { name: 'Absent', value: 14, color: '#EF4444' },
  { name: 'Leave', value: 8, color: '#F59E0B' },
];

const recentAttendance = [
  { date: 'Apr 10, 2026', day: 'Friday', subjects: [
    { name: 'Data Structures', status: 'present' },
    { name: 'Web Technologies', status: 'present' },
    { name: 'Seminar', status: 'present' },
  ]},
  { date: 'Apr 9, 2026', day: 'Thursday', subjects: [
    { name: 'Operating Systems', status: 'present' },
    { name: 'Computer Networks', status: 'present' },
    { name: 'Artificial Intelligence', status: 'absent' },
  ]},
  { date: 'Apr 8, 2026', day: 'Wednesday', subjects: [
    { name: 'Data Structures', status: 'present' },
    { name: 'Algorithms', status: 'leave' },
    { name: 'Database Lab', status: 'present' },
  ]},
];

export default function AttendancePage() {
  const overallPercentage = ((overallData[0].value / overallData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Attendance Tracker</h1>
        <p className="text-muted-foreground">Monitor your attendance across all subjects</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <h3 className="text-3xl font-bold mt-1">{overallPercentage}%</h3>
                <p className="text-xs text-accent flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Above requirement
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <h3 className="text-3xl font-bold mt-1">265</h3>
                <p className="text-xs text-muted-foreground mt-1">This semester</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <h3 className="text-3xl font-bold mt-1 text-accent">243</h3>
                <p className="text-xs text-muted-foreground mt-1">Classes attended</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <h3 className="text-3xl font-bold mt-1 text-destructive">14</h3>
                <p className="text-xs text-muted-foreground mt-1">Classes missed</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
            <CardDescription>Distribution of attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={overallData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {overallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {overallData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis domain={[80, 100]} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="percentage" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Detailed attendance breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectAttendance.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{subject.subject}</h4>
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${
                      subject.percentage >= 90 ? 'text-accent' :
                      subject.percentage >= 75 ? 'text-primary' :
                      'text-destructive'
                    }`}>
                      {subject.percentage.toFixed(1)}%
                    </span>
                    {subject.percentage < 75 && (
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      subject.percentage >= 90 ? 'bg-accent' :
                      subject.percentage >= 75 ? 'bg-primary' :
                      'bg-destructive'
                    }`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex gap-4">
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-1" />
                      Present: {subject.present}
                    </span>
                    <span className="flex items-center">
                      <XCircle className="w-4 h-4 text-destructive mr-1" />
                      Absent: {subject.absent}
                    </span>
                    <span className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-chart-4 mr-1" />
                      Leave: {subject.leave}
                    </span>
                  </div>
                  <span>Total: {subject.total}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>Your attendance for the last 3 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendance.map((day, index) => (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{day.day}</h4>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {day.subjects.map((subject, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-l-4 ${
                        subject.status === 'present' ? 'bg-accent/5 border-l-accent' :
                        subject.status === 'absent' ? 'bg-destructive/5 border-l-destructive' :
                        'bg-chart-4/5 border-l-chart-4'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{subject.name}</span>
                        {subject.status === 'present' ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : subject.status === 'absent' ? (
                          <XCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-chart-4" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{subject.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
