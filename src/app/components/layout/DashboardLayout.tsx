import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  GraduationCap,
  UserCog,
  Building,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const roleNavigation: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/admin' },
    { label: 'Students', icon: <Users className="w-5 h-5" />, path: '/dashboard/admin/students' },
    { label: 'Staff', icon: <UserCog className="w-5 h-5" />, path: '/dashboard/admin/staff' },
    { label: 'Departments', icon: <Building className="w-5 h-5" />, path: '/dashboard/admin/departments' },
    { label: 'Courses', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard/admin/courses' },
    { label: 'Timetable', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/admin/timetable' },
    { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/admin/attendance' },
    { label: 'Exams & Results', icon: <FileText className="w-5 h-5" />, path: '/dashboard/admin/exams' },
    { label: 'Fees', icon: <DollarSign className="w-5 h-5" />, path: '/dashboard/admin/fees' },
    { label: 'Reports', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/admin/reports' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/admin/settings' },
  ],
  principal: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/principal' },
    { label: 'Overview', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/principal/overview' },
    { label: 'Departments', icon: <Building className="w-5 h-5" />, path: '/dashboard/principal/departments' },
    { label: 'Staff', icon: <UserCog className="w-5 h-5" />, path: '/dashboard/principal/staff' },
    { label: 'Students', icon: <Users className="w-5 h-5" />, path: '/dashboard/principal/students' },
    { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/principal/attendance' },
    { label: 'Results', icon: <FileText className="w-5 h-5" />, path: '/dashboard/principal/results' },
    { label: 'Approvals', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/principal/approvals' },
    { label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/principal/messages' },
  ],
  hod: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/hod' },
    { label: 'Department Staff', icon: <UserCog className="w-5 h-5" />, path: '/dashboard/hod/staff' },
    { label: 'Students', icon: <Users className="w-5 h-5" />, path: '/dashboard/hod/students' },
    { label: 'Subjects', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard/hod/subjects' },
    { label: 'Timetable', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/hod/timetable' },
    { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/hod/attendance' },
    { label: 'Performance', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/hod/performance' },
    { label: 'Leave Requests', icon: <FileText className="w-5 h-5" />, path: '/dashboard/hod/leaves' },
  ],
  staff: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/staff' },
    { label: 'My Classes', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard/staff/classes' },
    { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/staff/attendance' },
    { label: 'Assignments', icon: <FileText className="w-5 h-5" />, path: '/dashboard/staff/assignments' },
    { label: 'Exams', icon: <FileText className="w-5 h-5" />, path: '/dashboard/staff/exams' },
    { label: 'Students', icon: <Users className="w-5 h-5" />, path: '/dashboard/staff/students' },
    { label: 'Timetable', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/staff/timetable' },
    { label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/staff/messages' },
  ],
  student: [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard/student' },
    { label: 'Timetable', icon: <Calendar className="w-5 h-5" />, path: '/dashboard/student/timetable' },
    { label: 'Attendance', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/student/attendance' },
    { label: 'Assignments', icon: <FileText className="w-5 h-5" />, path: '/dashboard/student/assignments' },
    { label: 'Exams', icon: <BookOpen className="w-5 h-5" />, path: '/dashboard/student/exams' },
    { label: 'Results', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/student/results' },
    { label: 'Fees', icon: <DollarSign className="w-5 h-5" />, path: '/dashboard/student/fees' },
    { label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/student/messages' },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = user ? roleNavigation[user.role] || [] : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } hidden lg:block ${isSidebarOpen ? 'w-64' : 'w-0'}`}
      >
        <div className="h-full bg-card border-r border-border flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">EduManage</h2>
                <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">EduManage</h2>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-foreground hover:bg-accent'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'} transition-all`}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden lg:block p-2 hover:bg-accent rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-accent rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden md:block relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 h-9"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Notifications */}
              <button className="p-2 hover:bg-accent rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-accent rounded-lg"
                >
                  <img
                    src={user?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=U'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user?.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-accent"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-accent"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-accent text-destructive flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
