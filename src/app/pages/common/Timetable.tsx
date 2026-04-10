import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Clock } from "lucide-react";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetableData = {
  Monday: [
    { subject: "Data Structures", room: "Room 405", faculty: "Dr. Smith" },
    { subject: "Database Systems", room: "Lab 3", faculty: "Prof. Johnson" },
    { subject: "Computer Networks", room: "Room 301", faculty: "Dr. Brown" },
    { subject: "Lunch Break", room: "-", faculty: "-" },
    {
      subject: "Software Engineering",
      room: "Room 402",
      faculty: "Prof. Davis",
    },
    { subject: "Machine Learning", room: "Room 502", faculty: "Dr. Wilson" },
    { subject: "Lab", room: "Lab 2", faculty: "Dr. Smith" },
  ],
  Tuesday: [
    { subject: "Machine Learning", room: "Room 502", faculty: "Dr. Wilson" },
    { subject: "Data Structures", room: "Room 405", faculty: "Dr. Smith" },
    { subject: "Free Period", room: "-", faculty: "-" },
    { subject: "Lunch Break", room: "-", faculty: "-" },
    { subject: "Computer Networks", room: "Room 301", faculty: "Dr. Brown" },
    { subject: "Database Systems", room: "Lab 3", faculty: "Prof. Johnson" },
    { subject: "Tutorial", room: "Room 201", faculty: "Dr. Brown" },
  ],
  Wednesday: [
    {
      subject: "Software Engineering",
      room: "Room 402",
      faculty: "Prof. Davis",
    },
    { subject: "Machine Learning", room: "Room 502", faculty: "Dr. Wilson" },
    { subject: "Data Structures", room: "Room 405", faculty: "Dr. Smith" },
    { subject: "Lunch Break", room: "-", faculty: "-" },
    { subject: "Database Systems", room: "Lab 3", faculty: "Prof. Johnson" },
    { subject: "Computer Networks", room: "Room 301", faculty: "Dr. Brown" },
    { subject: "Lab", room: "Lab 2", faculty: "Dr. Smith" },
  ],
  Thursday: [
    { subject: "Computer Networks", room: "Room 301", faculty: "Dr. Brown" },
    {
      subject: "Software Engineering",
      room: "Room 402",
      faculty: "Prof. Davis",
    },
    { subject: "Machine Learning", room: "Room 502", faculty: "Dr. Wilson" },
    { subject: "Lunch Break", room: "-", faculty: "-" },
    { subject: "Data Structures", room: "Room 405", faculty: "Dr. Smith" },
    { subject: "Database Systems", room: "Lab 3", faculty: "Prof. Johnson" },
    { subject: "Free Period", room: "-", faculty: "-" },
  ],
  Friday: [
    { subject: "Database Systems", room: "Lab 3", faculty: "Prof. Johnson" },
    { subject: "Data Structures", room: "Room 405", faculty: "Dr. Smith" },
    {
      subject: "Software Engineering",
      room: "Room 402",
      faculty: "Prof. Davis",
    },
    { subject: "Lunch Break", room: "-", faculty: "-" },
    { subject: "Machine Learning", room: "Room 502", faculty: "Dr. Wilson" },
    { subject: "Computer Networks", room: "Room 301", faculty: "Dr. Brown" },
    { subject: "Lab", room: "Lab 2", faculty: "Prof. Johnson" },
  ],
};

export function Timetable() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Weekly Timetable</h1>
        <p className="text-muted-foreground mt-1">View your class schedule</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr>
                  <th className="border border-border p-3 bg-muted/50 text-left font-medium min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Time / Day</span>
                    </div>
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="border border-border p-3 bg-muted/50 font-medium"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, index) => (
                  <tr key={time}>
                    <td className="border border-border p-3 bg-muted/30 font-medium text-sm">
                      {time}
                    </td>
                    {days.map((day) => {
                      const classInfo =
                        timetableData[day as keyof typeof timetableData][index];
                      const isBreak =
                        classInfo.subject === "Lunch Break" ||
                        classInfo.subject === "Free Period";

                      return (
                        <td key={day} className="border border-border p-2">
                          {classInfo && (
                            <div
                              className={`p-3 rounded-lg transition-all hover:shadow-md ${
                                isBreak
                                  ? "bg-muted/50 text-muted-foreground"
                                  : classInfo.subject === "Lab"
                                    ? "bg-accent/10 border-l-4 border-accent"
                                    : classInfo.subject === "Tutorial"
                                      ? "bg-secondary/10 border-l-4 border-secondary"
                                      : "bg-primary/10 border-l-4 border-primary"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {classInfo.subject}
                              </div>
                              {!isBreak && (
                                <>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {classInfo.room}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {classInfo.faculty}
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/10 border-l-4 border-primary rounded"></div>
                <span>Theory Class</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent/10 border-l-4 border-accent rounded"></div>
                <span>Lab Session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-secondary/10 border-l-4 border-secondary rounded"></div>
                <span>Tutorial</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Classes</span>
                <span className="font-medium">30/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lab Sessions</span>
                <span className="font-medium">5/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free Periods</span>
                <span className="font-medium">3/week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="text-muted-foreground mb-2">Friday</p>
              <div className="space-y-1">
                <div className="font-medium">Next: Database Systems</div>
                <div className="text-muted-foreground">
                  Lab 3 • Prof. Johnson
                </div>
                <div className="text-xs text-primary mt-2">
                  Starting in 15 minutes
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
