import { KPICard } from '../../components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, GraduationCap, TrendingUp, Award, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { department: 'CS', performance: 88 },
  { department: 'ECE', performance: 85 },
  { department: 'ME', performance: 82 },
  { department: 'CE', performance: 80 },
];

const attendanceData = [
  { month: 'Jan', rate: 92 },
  { month: 'Feb', rate: 89 },
  { month: 'Mar', rate: 94 },
  { month: 'Apr', rate: 91 },
];

const pendingApprovals = [
  { id: 1, type: 'Leave Request', from: 'Dr. Smith', department: 'CS', date: 'Apr 12-14' },
  { id: 2, type: 'Event Approval', from: 'HOD ECE', department: 'ECE', date: 'Apr 15' },
  { id: 3, type: 'Budget Request', from: 'HOD ME', department: 'ME', date: 'Apr 10' },
];

export function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Principal Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of college performance and approvals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Students"
          value="2,847"
          icon={GraduationCap}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <KPICard
          title="Faculty Members"
          value="156"
          icon={Users}
          trend={{ value: 3, isPositive: true }}
          color="secondary"
        />
        <KPICard
          title="Overall Performance"
          value="86%"
          icon={TrendingUp}
          trend={{ value: 4, isPositive: true }}
          color="accent"
        />
        <KPICard
          title="Pending Approvals"
          value="8"
          icon={Clock}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="department" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="performance" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={{ fill: '#22C55E', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pending Approvals</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{approval.type}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    From: {approval.from} ({approval.department})
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Date: {approval.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button variant="accent" size="sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {rank}
                    </div>
                    <div>
                      <h4 className="font-medium">Student Name {rank}</h4>
                      <p className="text-sm text-muted-foreground">CS Department</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{(4.0 - rank * 0.05).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">GPA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Excellence Award</h4>
                  <p className="text-sm text-muted-foreground">CS Department received national recognition</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Faculty Meeting</h4>
                  <p className="text-sm text-muted-foreground">Scheduled for tomorrow at 10 AM</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
