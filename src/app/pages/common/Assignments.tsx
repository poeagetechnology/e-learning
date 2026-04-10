import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Upload, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Data Structures Assignment 3',
    subject: 'Data Structures',
    dueDate: 'Apr 12, 2026',
    status: 'pending',
    marks: null,
    totalMarks: 100,
    description: 'Implement Binary Search Tree with all operations',
  },
  {
    id: 2,
    title: 'Database Design Project',
    subject: 'Database Systems',
    dueDate: 'Apr 14, 2026',
    status: 'pending',
    marks: null,
    totalMarks: 100,
    description: 'Design a complete database for e-commerce system',
  },
  {
    id: 3,
    title: 'Network Protocol Analysis',
    subject: 'Computer Networks',
    dueDate: 'Apr 8, 2026',
    status: 'submitted',
    marks: 85,
    totalMarks: 100,
    description: 'Analyze TCP/IP protocols and create a report',
  },
  {
    id: 4,
    title: 'UML Diagrams Project',
    subject: 'Software Engineering',
    dueDate: 'Apr 5, 2026',
    status: 'graded',
    marks: 92,
    totalMarks: 100,
    description: 'Create complete UML diagrams for a library management system',
  },
  {
    id: 5,
    title: 'ML Model Implementation',
    subject: 'Machine Learning',
    dueDate: 'Apr 15, 2026',
    status: 'pending',
    marks: null,
    totalMarks: 100,
    description: 'Implement and train a classification model',
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { icon: Clock, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20', label: 'Pending' };
    case 'submitted':
      return { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10', label: 'Submitted' };
    case 'graded':
      return { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10', label: 'Graded' };
    default:
      return { icon: AlertCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown' };
  }
};

export function Assignments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-1">View and submit your assignments</p>
        </div>
        <Button variant="primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Graded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => {
          const statusConfig = getStatusConfig(assignment.status);
          const StatusIcon = statusConfig.icon;
          const isOverdue = assignment.status === 'pending' && new Date(assignment.dueDate) < new Date();

          return (
            <Card key={assignment.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className={`p-3 rounded-lg ${statusConfig.bg} flex-shrink-0`}>
                    <FileText className={`w-6 h-6 ${statusConfig.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color} flex items-center gap-1`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {assignment.description}
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className={isOverdue ? 'text-destructive font-medium' : ''}>
                            Due: {assignment.dueDate}
                            {isOverdue && ' (Overdue)'}
                          </span>
                        </div>
                        {assignment.marks !== null && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              Marks: {assignment.marks}/{assignment.totalMarks}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {assignment.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="primary" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          </>
                        )}
                        {assignment.status === 'submitted' && (
                          <Button variant="outline" size="sm">View Submission</Button>
                        )}
                        {assignment.status === 'graded' && (
                          <>
                            <Button variant="outline" size="sm">View Feedback</Button>
                            <Button variant="primary" size="sm">View Details</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
