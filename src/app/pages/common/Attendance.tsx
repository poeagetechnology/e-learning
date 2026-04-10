import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceBySubject = [
  { subject: 'Data Structures', present: 28, absent: 2, total: 30 },
  { subject: 'Database Systems', present: 26, absent: 4, total: 30 },
  { subject: 'Computer Networks', present: 29, absent: 1, total: 30 },
  { subject: 'Software Eng.', present: 27, absent: 3, total: 30 },
  { subject: 'Machine Learning', present: 25, absent: 5, total: 30 },
];

const overallData = [
  { name: 'Present', value: 135, color: '#22C55E' },
  { name: 'Absent', value: 15, color: '#ef4444' },
];

const monthlyData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 89 },
  { month: 'Mar', attendance: 94 },
  { month: 'Apr', attendance: 90 },
];

const recentAttendance = [
  { date: 'Apr 10, 2026', subject: 'Data Structures', status: 'present' },
  { date: 'Apr 10, 2026', subject: 'Machine Learning', status: 'present' },
  { date: 'Apr 9, 2026', subject: 'Database Systems', status: 'present' },
  { date: 'Apr 9, 2026', subject: 'Computer Networks', status: 'absent' },
  { date: 'Apr 8, 2026', subject: 'Software Engineering', status: 'present' },
];

export function Attendance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage attendance records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={overallData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {overallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <div className="text-3xl font-bold text-accent">90%</div>
                <div className="text-sm text-muted-foreground">Overall Attendance</div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Present: 135</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span className="text-sm">Absent: 15</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" fill="#22C55E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subject-wise Attendance</CardTitle>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceBySubject.map((subject) => {
              const percentage = ((subject.present / subject.total) * 100).toFixed(1);
              const isLow = parseFloat(percentage) < 75;
              
              return (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{subject.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        {subject.present} present, {subject.absent} absent out of {subject.total} classes
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${isLow ? 'text-destructive' : 'text-accent'}`}>
                        {percentage}%
                      </div>
                      {isLow && (
                        <p className="text-xs text-destructive">Below 75%</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${isLow ? 'bg-destructive' : 'bg-accent'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAttendance.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    record.status === 'present' ? 'bg-accent/10' : 'bg-destructive/10'
                  }`}>
                    {record.status === 'present' ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{record.subject}</h4>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === 'present'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {record.status === 'present' ? 'Present' : 'Absent'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
