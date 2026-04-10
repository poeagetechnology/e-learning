import { Link, useLocation } from "react-router";
import { cn } from "../utils/cn";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

interface SidebarProps {
  role: "admin" | "principal" | "hod" | "staff" | "student";
  isOpen: boolean;
  onToggle: () => void;
}

const roleConfig = {
  admin: { label: "Admin", gradient: "from-violet-600 to-indigo-600" },
  principal: { label: "Principal", gradient: "from-blue-600 to-cyan-500" },
  hod: { label: "HOD", gradient: "from-purple-600 to-pink-500" },
  staff: { label: "Staff", gradient: "from-emerald-600 to-teal-500" },
  student: { label: "Student", gradient: "from-orange-500 to-rose-500" },
};

const navColors = [
  "hover:text-violet-300",
  "hover:text-cyan-300",
  "hover:text-pink-300",
  "hover:text-emerald-300",
  "hover:text-amber-300",
  "hover:text-blue-300",
  "hover:text-rose-300",
  "hover:text-teal-300",
  "hover:text-indigo-300",
  "hover:text-orange-300",
  "hover:text-purple-300",
  "hover:text-green-300",
];

const navigationByRole = {
  admin: [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: GraduationCap },
    { name: "Staff", path: "/admin/staff", icon: Users },
    { name: "Departments", path: "/admin/departments", icon: Building2 },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Timetable", path: "/admin/timetable", icon: Calendar },
    { name: "Attendance", path: "/admin/attendance", icon: ClipboardCheck },
    { name: "Exams", path: "/admin/exams", icon: FileText },
    { name: "Fees", path: "/admin/fees", icon: DollarSign },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],
  principal: [
    { name: "Dashboard", path: "/principal", icon: LayoutDashboard },
    { name: "Students", path: "/principal/students", icon: GraduationCap },
    { name: "Staff", path: "/principal/staff", icon: Users },
    { name: "Departments", path: "/principal/departments", icon: Building2 },
    { name: "Courses", path: "/principal/courses", icon: BookOpen },
    { name: "Timetable", path: "/principal/timetable", icon: Calendar },
    { name: "Attendance", path: "/principal/attendance", icon: ClipboardCheck },
    { name: "Exams", path: "/principal/exams", icon: FileText },
    { name: "Fees", path: "/principal/fees", icon: DollarSign },
    { name: "Profile", path: "/principal/profile", icon: UserCircle },
    { name: "Settings", path: "/principal/settings", icon: Settings },
  ],
  hod: [
    { name: "Dashboard", path: "/hod", icon: LayoutDashboard },
    { name: "Students", path: "/hod/students", icon: GraduationCap },
    { name: "Department Staff", path: "/hod/staff", icon: Users },
    { name: "Departments", path: "/hod/departments", icon: Building2 },
    { name: "Courses", path: "/hod/courses", icon: BookOpen },
    { name: "Timetable", path: "/hod/timetable", icon: Calendar },
    { name: "Attendance", path: "/hod/attendance", icon: ClipboardCheck },
    { name: "Exams", path: "/hod/exams", icon: FileText },
    { name: "Fees", path: "/hod/fees", icon: DollarSign },
    { name: "Assignments", path: "/hod/assignments", icon: FileText },
    { name: "Profile", path: "/hod/profile", icon: UserCircle },
    { name: "Settings", path: "/hod/settings", icon: Settings },
  ],
  staff: [
    { name: "Dashboard", path: "/staff", icon: LayoutDashboard },
    { name: "Students", path: "/staff/students", icon: GraduationCap },
    { name: "Attendance", path: "/staff/attendance", icon: ClipboardCheck },
    { name: "Assignments", path: "/staff/assignments", icon: FileText },
    { name: "Exams", path: "/staff/exams", icon: FileText },
    { name: "Courses", path: "/staff/courses", icon: BookOpen },
    { name: "Timetable", path: "/staff/timetable", icon: Calendar },
    { name: "Fees", path: "/staff/fees", icon: DollarSign },
    { name: "Profile", path: "/staff/profile", icon: UserCircle },
    { name: "Settings", path: "/staff/settings", icon: Settings },
  ],
  student: [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "Attendance", path: "/student/attendance", icon: ClipboardCheck },
    { name: "Assignments", path: "/student/assignments", icon: FileText },
    { name: "Exams", path: "/student/exams", icon: FileText },
    { name: "Timetable", path: "/student/timetable", icon: Calendar },
    { name: "Fees", path: "/student/fees", icon: DollarSign },
    { name: "Profile", path: "/student/profile", icon: UserCircle },
  ],
};

export function Sidebar({ role, isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigation = navigationByRole[role];
  const config = roleConfig[role];

  return (
    <aside
      className={cn(
        "relative flex flex-col transition-all duration-300 ease-in-out",
        "bg-[#0f0f23] border-r border-white/[0.06]",
        isOpen ? "w-64" : "w-[72px]",
      )}
    >
      {/* Top gradient accent line */}
      <div className={cn("h-1 w-full bg-gradient-to-r", config.gradient)} />

      {/* Logo / Brand area */}
      <div
        className={cn(
          "flex items-center border-b border-white/[0.06] transition-all duration-300",
          isOpen ? "p-5 gap-3" : "p-4 justify-center",
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br w-9 h-9",
            config.gradient,
          )}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-base leading-tight tracking-tight">
              CollegeMS
            </h1>
            <p className="text-white/40 text-[11px] capitalize font-medium">
              {config.label} Portal
            </p>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "flex-shrink-0 p-1.5 rounded-lg transition-all duration-200",
            "text-white/30 hover:text-white hover:bg-white/10",
            isOpen ? "ml-auto" : "hidden",
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Collapsed toggle button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navigation.map((item, idx) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" + role &&
              location.pathname.startsWith(item.path));
          const colorClass = navColors[idx % navColors.length];
          return (
            <Link
              key={item.path}
              to={item.path}
              title={!isOpen ? item.name : undefined}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                isActive
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg shadow-black/20`
                  : `text-white/50 hover:bg-white/[0.07] hover:text-white ${colorClass}`,
                !isOpen && "justify-center px-0",
              )}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-xl opacity-20 bg-white blur-sm" />
              )}
              <item.icon
                className={cn(
                  "w-4.5 h-4.5 flex-shrink-0 relative z-10",
                  isActive ? "text-white" : "",
                )}
                style={{ width: "18px", height: "18px" }}
              />
              {isOpen && (
                <span className="text-sm font-medium relative z-10 truncate">
                  {item.name}
                </span>
              )}
              {isActive && isOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom role badge */}
      {isOpen && (
        <div className="p-4 border-t border-white/[0.06]">
          <div
            className={cn(
              "rounded-xl px-3 py-2.5 bg-gradient-to-r text-white text-xs font-semibold flex items-center gap-2",
              config.gradient,
            )}
          >
            <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
            <span className="capitalize">{role} â€” Active Session</span>
          </div>
        </div>
      )}
    </aside>
  );
}
