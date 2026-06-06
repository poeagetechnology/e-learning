import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "../utils/cn";
import { useAuth } from "../context/AuthContext";
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
  LogOut,
} from "lucide-react";

type NavItem = { name: string; path: string; icon: React.ElementType };
type NavSection = { label: string; items: NavItem[] };

const navigationByRole: Record<string, NavSection[]> = {
  admin: [
    {
      label: "OVERVIEW",
      items: [{ name: "Dashboard", path: "/admin", icon: LayoutDashboard }],
    },
    {
      label: "MANAGEMENT",
      items: [
        { name: "Students", path: "/admin/students", icon: GraduationCap },
        { name: "Staff", path: "/admin/staff", icon: Users },
        { name: "Departments", path: "/admin/departments", icon: Building2 },
        { name: "Courses", path: "/admin/courses", icon: BookOpen },
      ],
    },
    {
      label: "ACADEMIC",
      items: [
        { name: "Timetable", path: "/admin/timetable", icon: Calendar },
        { name: "Attendance", path: "/admin/attendance", icon: ClipboardCheck },
        { name: "Exams", path: "/admin/exams", icon: FileText },
        { name: "Fees", path: "/admin/fees", icon: DollarSign },
      ],
    },
    {
      label: "SYSTEM",
      items: [{ name: "Settings", path: "/admin/settings", icon: Settings }],
    },
  ],
  principal: [
    {
      label: "OVERVIEW",
      items: [{ name: "Dashboard", path: "/principal", icon: LayoutDashboard }],
    },
    {
      label: "MANAGEMENT",
      items: [
        { name: "Students", path: "/principal/students", icon: GraduationCap },
        { name: "Staff", path: "/principal/staff", icon: Users },
        { name: "Departments", path: "/principal/departments", icon: Building2 },
        { name: "Courses", path: "/principal/courses", icon: BookOpen },
      ],
    },
    {
      label: "ACADEMIC",
      items: [
        { name: "Timetable", path: "/principal/timetable", icon: Calendar },
        { name: "Attendance", path: "/principal/attendance", icon: ClipboardCheck },
        { name: "Exams", path: "/principal/exams", icon: FileText },
        { name: "Fees", path: "/principal/fees", icon: DollarSign },
      ],
    },
    {
      label: "ACCOUNT",
      items: [
        { name: "Profile", path: "/principal/profile", icon: UserCircle },
        { name: "Settings", path: "/principal/settings", icon: Settings },
      ],
    },
  ],
  hod: [
    {
      label: "OVERVIEW",
      items: [{ name: "Dashboard", path: "/hod", icon: LayoutDashboard }],
    },
    {
      label: "DEPARTMENT",
      items: [
        { name: "Students", path: "/hod/students", icon: GraduationCap },
        { name: "Dept. Staff", path: "/hod/staff", icon: Users },
        { name: "Departments", path: "/hod/departments", icon: Building2 },
        { name: "Courses", path: "/hod/courses", icon: BookOpen },
      ],
    },
    {
      label: "ACADEMIC",
      items: [
        { name: "Timetable", path: "/hod/timetable", icon: Calendar },
        { name: "Attendance", path: "/hod/attendance", icon: ClipboardCheck },
        { name: "Assignments", path: "/hod/assignments", icon: FileText },
        { name: "Exams", path: "/hod/exams", icon: FileText },
        { name: "Fees", path: "/hod/fees", icon: DollarSign },
      ],
    },
    {
      label: "ACCOUNT",
      items: [
        { name: "Profile", path: "/hod/profile", icon: UserCircle },
        { name: "Settings", path: "/hod/settings", icon: Settings },
      ],
    },
  ],
  staff: [
    {
      label: "OVERVIEW",
      items: [{ name: "Dashboard", path: "/staff", icon: LayoutDashboard }],
    },
    {
      label: "TEACHING",
      items: [
        { name: "Students", path: "/staff/students", icon: GraduationCap },
        { name: "Attendance", path: "/staff/attendance", icon: ClipboardCheck },
        { name: "Assignments", path: "/staff/assignments", icon: FileText },
        { name: "Exams", path: "/staff/exams", icon: FileText },
        { name: "Courses", path: "/staff/courses", icon: BookOpen },
      ],
    },
    {
      label: "SCHEDULE",
      items: [
        { name: "Timetable", path: "/staff/timetable", icon: Calendar },
        { name: "Fees", path: "/staff/fees", icon: DollarSign },
      ],
    },
    {
      label: "ACCOUNT",
      items: [
        { name: "Profile", path: "/staff/profile", icon: UserCircle },
        { name: "Settings", path: "/staff/settings", icon: Settings },
      ],
    },
  ],
  student: [
    {
      label: "OVERVIEW",
      items: [{ name: "Dashboard", path: "/student", icon: LayoutDashboard }],
    },
    {
      label: "ACADEMIC",
      items: [
        { name: "Attendance", path: "/student/attendance", icon: ClipboardCheck },
        { name: "Assignments", path: "/student/assignments", icon: FileText },
        { name: "Exams", path: "/student/exams", icon: FileText },
        { name: "Timetable", path: "/student/timetable", icon: Calendar },
      ],
    },
    {
      label: "ACCOUNT",
      items: [
        { name: "Fees", path: "/student/fees", icon: DollarSign },
        { name: "Profile", path: "/student/profile", icon: UserCircle },
      ],
    },
  ],
};

const roleConfig = {
  admin: { label: "Admin", gradient: "from-violet-600 to-indigo-600" },
  principal: { label: "Principal", gradient: "from-blue-600 to-cyan-500" },
  hod: { label: "HOD", gradient: "from-purple-600 to-pink-500" },
  staff: { label: "Staff", gradient: "from-emerald-600 to-teal-500" },
  student: { label: "Student", gradient: "from-orange-500 to-rose-500" },
};

interface SidebarProps {
  role: "admin" | "principal" | "hod" | "staff" | "student";
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ role, isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const sections = navigationByRole[role];
  const config = roleConfig[role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : role.slice(0, 2).toUpperCase();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full transition-all duration-300 ease-in-out",
        "bg-[#09090f] border-r border-white/[0.06]",
        isOpen ? "w-64" : "w-[72px]",
      )}
    >
      {/* Top gradient accent line */}
      <div className={cn("h-0.5 w-full bg-gradient-to-r flex-shrink-0", config.gradient)} />

      {/* Brand header */}
      <div
        className={cn(
          "flex items-center border-b border-white/[0.06] transition-all duration-300 flex-shrink-0",
          isOpen ? "px-4 py-3.5 gap-3" : "p-4 justify-center",
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br w-9 h-9 shadow-lg shadow-black/40",
            config.gradient,
          )}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        {isOpen && (
          <div className="flex-1 overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight tracking-tight">
              CollegeMS
            </p>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.12em] font-medium">
              {config.label} Portal
            </p>
          </div>
        )}
        {isOpen && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-white/20 hover:text-white/70 hover:bg-white/[0.08] transition-all flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Collapsed expand button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 p-1.5 rounded-lg text-white/20 hover:text-white/70 hover:bg-white/[0.08] transition-all flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Navigation sections */}
      <nav className="flex-1 py-3 px-2.5 overflow-y-auto scrollbar-none">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? "mt-4" : ""}>
            {isOpen ? (
              <p className="text-[9px] font-bold text-white/20 tracking-[0.18em] px-3 pb-1.5 uppercase">
                {section.label}
              </p>
            ) : (
              sIdx > 0 && <div className="h-px bg-white/[0.06] mx-3 mb-3" />
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/" + role &&
                    location.pathname.startsWith(item.path));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={!isOpen ? item.name : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl transition-all duration-200",
                      "px-3 py-2.5",
                      isActive
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg shadow-black/30`
                        : "text-white/40 hover:bg-white/[0.06] hover:text-white/80",
                      !isOpen && "justify-center px-0",
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-white opacity-[0.06] blur-sm pointer-events-none" />
                    )}
                    <Icon
                      className="flex-shrink-0 relative z-10"
                      style={{ width: 16, height: 16 }}
                    />
                    {isOpen && (
                      <span className="text-[13px] font-medium relative z-10 flex-1 truncate">
                        {item.name}
                      </span>
                    )}
                    {isOpen && isActive && (
                      <span className="w-1 h-1 rounded-full bg-white/70 relative z-10 flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile card */}
      <div className="p-3 border-t border-white/[0.06] flex-shrink-0">
        {isOpen ? (
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-gradient-to-br shadow-md",
                  config.gradient,
                )}
              >
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[13px] font-semibold leading-tight truncate">
                  {user?.name || config.label}
                </p>
                <p className="text-white/30 text-[11px] truncate">
                  {user?.email || role + "@college.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            title="Sign out"
            className="w-full flex justify-center p-2.5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
