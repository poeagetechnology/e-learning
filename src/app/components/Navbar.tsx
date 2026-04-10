import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
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
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

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

const roleLabels = {
  admin: "Administrator",
  principal: "Principal",
  hod: "Head of Dept.",
  staff: "Staff Member",
  student: "Student",
};

export function Navbar({ role, onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      text: "New assignment uploaded for Mathematics",
      time: "5 min ago",
      color: "bg-violet-500",
    },
    {
      id: 2,
      text: "Exam schedule updated for Finals",
      time: "1 hour ago",
      color: "bg-cyan-500",
    },
    {
      id: 3,
      text: "Fee payment reminder â€” 3 days left",
      time: "2 hours ago",
      color: "bg-amber-500",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/60 px-5 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4">
        {/* Left: menu + search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            className={`relative flex-1 max-w-sm transition-all duration-300 ${searchFocused ? "max-w-lg" : ""}`}
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students, exams, courses..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-card transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            ) : (
              <Sun className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground"
            >
              <Bell style={{ width: 18, height: 18 }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-card animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                    {notifications.length} new
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.color}`}
                      />
                      <div>
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <button className="text-xs text-primary hover:underline font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-1" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 hover:bg-muted rounded-xl transition-all"
            >
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${roleColors[role]} flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-tight">
                  {roleLabels[role]}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  Online
                </p>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform hidden sm:block ${showProfileMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-popover border border-border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                <div
                  className={`px-4 py-3 bg-gradient-to-r ${roleColors[role]}`}
                >
                  <p className="text-white text-sm font-semibold capitalize">
                    {roleLabels[role]}
                  </p>
                  <p className="text-white/70 text-xs">{role}@college.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted rounded-xl transition-colors text-left text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>View Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted rounded-xl transition-colors text-left text-sm">
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
