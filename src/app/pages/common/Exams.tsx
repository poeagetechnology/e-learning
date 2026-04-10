import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Calendar, Clock, Award } from 'lucide-react';

const upcomingExams = [
  { id: 1, subject: 'Data Structures', date: 'Apr 22, 2026', time: '10:00 AM', duration: '3 hours', room: 'Main Hall', type: 'Final' },
  { id: 2, subject: 'Database Systems', date: 'Apr 24, 2026', time: '10:00 AM', duration: '3 hours', room: 'Main Hall', type: 'Final' },
  { id: 3, subject: 'Computer Networks', date: 'Apr 26, 2026', time: '10:00 AM', duration: '3 hours', room: 'Main Hall', type: 'Final' },
];

const previousResults = [
  { subject: 'Software Engineering', type: 'Mid-term', marks: 42, total: 50, percentage: 84, grade: 'A' },
  { subject: 'Machine Learning', type: 'Mid-term', marks: 45, total: 50, percentage: 90, grade: 'A+' },
  { subject: 'Data Structures', type: 'Internal 1', marks: 23, total: 25, percentage: 92, grade: 'A+' },
  { subject: 'Database Systems', type: 'Internal 1', marks: 21, total: 25, percentage: 84, grade: 'A' },
];

const getGradeColor = (grade: string) => {
  if (grade === 'A+') return 'text-accent';
  if (grade === 'A') return 'text-primary';
  if (grade === 'B+' || grade === 'B') return 'text-secondary';
  return 'text-muted-foreground';
};

export function Exams() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exams & Results</h1>
        <p className="text-muted-foreground mt-1">View exam schedules and your results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{exam.subject}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{exam.time}</span>
                      </div>
                      <div>Duration: {exam.duration}</div>
                      <div>Room: {exam.room}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Syllabus</Button>
                  <Button variant="primary" size="sm">Download Hall Ticket</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-accent/10 rounded-full mb-4">
                <Award className="w-12 h-12 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">87.5%</div>
              <p className="text-muted-foreground">Average Score</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">CGPA</span>
                  <span className="font-semibold text-lg">3.8/4.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Grade</span>
                  <span className="font-semibold text-lg text-accent">A</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Previous Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium">Subject</th>
                    <th className="text-left py-3 px-2 font-medium">Type</th>
                    <th className="text-center py-3 px-2 font-medium">Marks</th>
                    <th className="text-center py-3 px-2 font-medium">%</th>
                    <th className="text-center py-3 px-2 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {previousResults.map((result, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-2">{result.subject}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{result.type}</td>
                      <td className="py-3 px-2 text-center font-medium">
                        {result.marks}/{result.total}
                      </td>
                      <td className="py-3 px-2 text-center">{result.percentage}%</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded font-semibold ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Before Exam</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Download hall ticket 2 days before exam</li>
                <li>• Carry valid ID card</li>
                <li>• Arrive 30 minutes before exam</li>
                <li>• Check room number and seating arrangement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">During Exam</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Mobile phones not allowed</li>
                <li>• Follow exam instructions carefully</li>
                <li>• No talking during examination</li>
                <li>• Submit answer sheet before leaving</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
