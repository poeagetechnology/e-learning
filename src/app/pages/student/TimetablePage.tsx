import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface TimeSlot {
  time: string;
  subject?: string;
  teacher?: string;
  room?: string;
  type?: 'lecture' | 'lab' | 'tutorial' | 'break';
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

const timetable: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Dr. Smith', room: '301', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Algorithms', teacher: 'Prof. Johnson', room: '302', type: 'lecture' },
      { time: '11:00 - 11:15', type: 'break' },
      { time: '11:15 - 12:15', subject: 'Database Systems', teacher: 'Dr. Williams', room: '303', type: 'lecture' },
      { time: '12:15 - 01:15', type: 'break' },
      { time: '01:15 - 03:15', subject: 'Programming Lab', teacher: 'Prof. Brown', room: 'Lab 1', type: 'lab' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '09:00 - 10:00', subject: 'Operating Systems', teacher: 'Dr. Davis', room: '304', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Computer Networks', teacher: 'Prof. Miller', room: '305', type: 'lecture' },
      { time: '11:00 - 11:15', type: 'break' },
      { time: '11:15 - 12:15', subject: 'Software Engineering', teacher: 'Dr. Wilson', room: '306', type: 'lecture' },
      { time: '12:15 - 01:15', type: 'break' },
      { time: '01:15 - 02:15', subject: 'Algorithms Tutorial', teacher: 'TA - Sarah', room: '307', type: 'tutorial' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Dr. Smith', room: '301', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Algorithms', teacher: 'Prof. Johnson', room: '302', type: 'lecture' },
      { time: '11:00 - 11:15', type: 'break' },
      { time: '11:15 - 12:15', subject: 'Web Technologies', teacher: 'Prof. Anderson', room: '308', type: 'lecture' },
      { time: '12:15 - 01:15', type: 'break' },
      { time: '01:15 - 03:15', subject: 'Database Lab', teacher: 'Dr. Williams', room: 'Lab 2', type: 'lab' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '09:00 - 10:00', subject: 'Operating Systems', teacher: 'Dr. Davis', room: '304', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Computer Networks', teacher: 'Prof. Miller', room: '305', type: 'lecture' },
      { time: '11:00 - 11:15', type: 'break' },
      { time: '11:15 - 12:15', subject: 'Artificial Intelligence', teacher: 'Dr. Taylor', room: '309', type: 'lecture' },
      { time: '12:15 - 01:15', type: 'break' },
      { time: '01:15 - 02:15', subject: 'Project Work', teacher: 'Guide - Prof. Lee', room: '310', type: 'tutorial' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Dr. Smith', room: '301', type: 'lecture' },
      { time: '10:00 - 11:00', subject: 'Web Technologies', teacher: 'Prof. Anderson', room: '308', type: 'lecture' },
      { time: '11:00 - 11:15', type: 'break' },
      { time: '11:15 - 12:15', subject: 'Seminar', teacher: 'Various', room: 'Auditorium', type: 'tutorial' },
    ],
  },
];

const getSlotColor = (type?: string) => {
  switch (type) {
    case 'lecture':
      return 'bg-primary/10 border-l-primary hover:bg-primary/20';
    case 'lab':
      return 'bg-secondary/10 border-l-secondary hover:bg-secondary/20';
    case 'tutorial':
      return 'bg-accent/10 border-l-accent hover:bg-accent/20';
    case 'break':
      return 'bg-muted/30 border-l-muted';
    default:
      return 'bg-background border-l-border';
  }
};

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weekly Timetable</h1>
          <p className="text-muted-foreground">Computer Science - Year 3, Semester 6</p>
        </div>
        <div className="flex items-center space-x-2">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Current Week</p>
                <p className="font-semibold">Apr 7 - Apr 13, 2026</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20 border-l-4 border-l-primary" />
              <span className="text-sm">Lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary/20 border-l-4 border-l-secondary" />
              <span className="text-sm">Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent/20 border-l-4 border-l-accent" />
              <span className="text-sm">Tutorial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted/30 border-l-4 border-l-muted" />
              <span className="text-sm">Break</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <div className="grid gap-6">
        {timetable.map((day) => (
          <Card key={day.day}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {day.day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {day.slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 transition-all ${getSlotColor(slot.type)}`}
                  >
                    {slot.type === 'break' ? (
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Break ({slot.time})
                        </span>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold text-sm">{slot.time}</span>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold">{slot.subject}</h4>
                          {slot.teacher && (
                            <div className="flex items-center gap-1 mt-1">
                              <User className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{slot.teacher}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {slot.room && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-background rounded-lg">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{slot.room}</span>
                            </div>
                          )}
                          {slot.type && (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              slot.type === 'lecture' ? 'bg-primary/20 text-primary' :
                              slot.type === 'lab' ? 'bg-secondary/20 text-secondary' :
                              'bg-accent/20 text-accent'
                            }`}>
                              {slot.type}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
