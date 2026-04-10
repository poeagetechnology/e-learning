import { KPICard } from '../../components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, GraduationCap, FileText, TrendingUp } from 'lucide-react';

export function HODDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HOD Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Computer Science Department Overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Dr. Smith', 'Prof. Johnson', 'Dr. Brown', 'Prof. Davis'].map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      {name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {index % 2 === 0 ? 'Professor' : 'Associate Professor'}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Dr. Smith', dates: 'Apr 15-16', reason: 'Medical' },
                { name: 'Prof. Johnson', dates: 'Apr 20', reason: 'Personal' },
              ].map((request, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.dates}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reason: {request.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Reject</Button>
                    <Button variant="accent" size="sm" className="flex-1">Approve</Button>
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
