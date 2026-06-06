import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Sparkles,
  CheckCheck,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { cn } from "../utils/cn";

interface NavbarProps {
  role: "admin" | "principal" | "hod" | "staff" | "student";
  onMenuClick: () => void;
}

const roleColors = {
  admin: "from-violet-600 to-indigo-600",
  principal: "from-blue-600 to-cyan-500",
  hod: "from-purple-600 to-pink-500",
  staff: "from-emerald-600 to-teal-500",
  student: "from-orange-500 to-rose-500",
};

const pageInfoMap: Record<string, { title: string; subtitle: string }> = {
  students: { title: "Students", subtitle: "Student records & enrollment" },
  staff: { title: "Staff Management", subtitle: "Faculty & staff directory" },
  departments: { title: "Departments", subtitle: "Academic departments" },
  courses: { title: "Courses", subtitle: "Course catalog & management" },
  timetable: { title: "Timetable", subtitle: "Weekly class schedules" },
  attendance: { title: "Attendance", subtitle: "Presence tracking records" },
  exams: { title: "Exams & Results", subtitle: "Examination management" },
  fees: { title: "Fee Management", subtitle: "Billing & payments" },
  assignments: { title: "Assignments", subtitle: "Tasks & submissions" },
  profile: { title: "My Profile", subtitle: "Personal information" },
  settings: { title: "Settings", subtitle: "Preferences & configuration" },
};

const getPageTitle = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) {
    return { title: "Dashboard", subtitle: "Overview of all activities" };
  }
  const last = segments[segments.length - 1];
  return pageInfoMap[last] || { title: "Dashboard", subtitle: "" };
};

type Notification = {
  id: number;
  text: string;
  time: string;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  unread: boolean;
};

const defaultNotifications: Notification[] = [
  {
    id: 1,
    text: "New student enrollment: Alice Johnson",
    time: "5 min ago",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    icon: GraduationCap,
    unread: true,
  },
  {
    id: 2,
    text: "Exam schedule published for Finals",
    time: "1 hour ago",
    iconBg: "bg-cyan-100 dark:bg-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    icon: FileText,
    unread: true,
  },
  {
    id: 3,
    text: "Fee payment reminder – 3 days left",
    time: "2 hours ago",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: DollarSign,
    unread: true,
  },
  {
    id: 4,
    text: "Sports Day confirmed for Apr 22",
    time: "Yesterday",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Calendar,
    unread: false,
  },
];

export function Navbar({ role, onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifList, setNotifList] = useState<Notification[]>(defaultNotifications);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const page = getPageTitle(location.pathname);
  const unreadCount = notifList.filter((n) => n.unread).length;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : role.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/60 px-5 py-2.5 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Left: hamburger + page title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block min-w-0">
            <h2 className="text-[15px] font-bold leading-tight truncate">{page.title}</h2>
            {page.subtitle && (
              <p className="text-[11px] text-muted-foreground leading-tight truncate">{page.subtitle}</p>
            )}
          </div>
        </div>

        {/* Center: search */}
        <div
          className={cn(
            "relative transition-all duration-300 hidden sm:block flex-shrink-0",
            searchFocused ? "w-72" : "w-52",
          )}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 focus:bg-card transition-all placeholder:text-muted-foreground/50"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/40 font-mono pointer-events-none hidden xl:block">
            /
          </kbd>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <Moon style={{ width: 17, height: 17 }} />
            ) : (
              <Sun style={{ width: 17, height: 17 }} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground"
            >
              <Bell style={{ width: 17, height: 17 }} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-card animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full font-semibold leading-none">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark read
                  </button>
                </div>
                <div className="divide-y divide-border max-h-72 overflow-y-auto">
                  {notifList.map((n) => {
                    const NIcon = n.icon;
                    return (
                      <div
                        key={n.id}
                        className={cn(
                          "px-4 py-3 cursor-pointer transition-colors flex items-start gap-3",
                          n.unread
                            ? "bg-primary/[0.025] hover:bg-muted/60"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-lg flex-shrink-0 mt-0.5",
                            n.iconBg,
                          )}
                        >
                          <NIcon
                            className={cn("w-3.5 h-3.5", n.iconColor)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] leading-snug">{n.text}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {n.time}
                          </p>
                        </div>
                        {n.unread && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <button className="text-xs text-primary hover:underline font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative ml-1" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 hover:bg-muted rounded-xl transition-all"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md flex-shrink-0 text-white text-xs font-bold",
                  roleColors[role],
                )}
              >
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-semibold leading-tight max-w-[100px] truncate">
                  {user?.name || role}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight capitalize">
                  {role}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform hidden sm:block",
                  showProfileMenu ? "rotate-180" : "",
                )}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                <div
                  className={cn(
                    "px-4 py-3.5 bg-gradient-to-r",
                    roleColors[role],
                  )}
                >
                  <p className="text-white text-sm font-bold truncate">
                    {user?.name || role}
                  </p>
                  <p className="text-white/70 text-xs truncate mt-0.5">
                    {user?.email || role + "@college.com"}
                  </p>
                  {user?.department && (
                    <p className="text-white/60 text-[10px] mt-0.5 capitalize">
                      {user.department}
                    </p>
                  )}
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      navigate("/" + role + "/profile");
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted rounded-xl transition-colors text-left text-sm"
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/" + role + "/settings");
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted rounded-xl transition-colors text-left text-sm"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-1.5 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-destructive/10 text-destructive rounded-xl transition-colors text-left text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
