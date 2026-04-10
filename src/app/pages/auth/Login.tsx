import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../context/AuthContext";

const roles = [
  {
    value: "admin",
    label: "Admin",
    emoji: "âš¡",
    color: "from-violet-600 to-indigo-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    ring: "ring-violet-500",
    text: "text-violet-700 dark:text-violet-300",
    path: "/admin",
    email: "admin@college.com",
    password: "admin123",
  },
  {
    value: "principal",
    label: "Principal",
    emoji: "ðŸŽ“",
    color: "from-blue-600 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    ring: "ring-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    path: "/principal",
    email: "principal@college.com",
    password: "principal123",
  },
  {
    value: "hod",
    label: "HOD",
    emoji: "ðŸ«",
    color: "from-purple-600 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    ring: "ring-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    path: "/hod",
    email: "hod@college.com",
    password: "hod123",
  },
  {
    value: "staff",
    label: "Staff",
    emoji: "ðŸ‘¨â€ðŸ«",
    color: "from-emerald-600 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    ring: "ring-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    path: "/staff",
    email: "staff@college.com",
    password: "staff123",
  },
  {
    value: "student",
    label: "Student",
    emoji: "ðŸ“š",
    color: "from-orange-500 to-rose-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    ring: "ring-orange-500",
    text: "text-orange-700 dark:text-orange-300",
    path: "/student",
    email: "student@college.com",
    password: "student123",
  },
];

const features = [
  { icon: Shield, label: "Secure & Encrypted" },
  { icon: Users, label: "Multi-Role Access" },
  { icon: BookOpen, label: "Full Management Suite" },
];

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const selectedRoleData = roles.find((r) => r.value === selectedRole)!;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const role = roles.find((r) => r.value === selectedRole);
      if (role) {
        await login(
          email || role.email,
          password || role.password,
          selectedRole,
        );
        navigate(role.path);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDummyLogin = async (roleValue: UserRole) => {
    setLoadingRole(roleValue);
    try {
      const roleData = roles.find((r) => r.value === roleValue);
      if (roleData) {
        await login(roleData.email, roleData.password, roleValue);
        navigate(roleData.path);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a1a] overflow-hidden">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative p-12 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${selectedRoleData.color} opacity-90 transition-all duration-700`}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-56 h-56 rounded-full bg-black/20 blur-3xl" />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              CollegeMS
            </span>
          </div>
          <p className="text-white/60 text-sm">College Management System</p>
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-7xl mb-6">{selectedRoleData.emoji}</div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-3">
                Welcome,
                <br />
                {selectedRoleData.label}!
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Access your personalized dashboard with everything you need in
                one place.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-3">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-white/40 text-xs">
            Â© 2026 CollegeMS â€” Built for modern institutions
          </p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[#f0f4ff] dark:bg-[#0a0a1a]">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedRoleData.color} mb-3 shadow-lg`}
            >
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold">CollegeMS</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground mt-1.5">
              Choose your role and access your portal
            </p>
          </div>

          {/* Role tiles â€” quick login */}
          <div className="mb-8">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Select your role
            </p>
            <div className="grid grid-cols-5 gap-2">
              {roles.map((role) => (
                <motion.button
                  key={role.value}
                  type="button"
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelectedRole(role.value as UserRole)}
                  disabled={loadingRole !== null}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 ${
                    selectedRole === role.value
                      ? `border-transparent bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                      : "border-border bg-card hover:border-primary/30 hover:shadow-md text-foreground"
                  }`}
                >
                  <span className="text-xl leading-none">{role.emoji}</span>
                  <span className="text-[10px] font-semibold leading-tight">
                    {role.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Credentials form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRoleData.email}
                  disabled={isLoading || loadingRole !== null}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={selectedRoleData.password}
                  disabled={isLoading || loadingRole !== null}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="rounded accent-primary" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-primary hover:underline font-medium text-xs"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || loadingRole !== null}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${selectedRoleData.color} shadow-lg hover:opacity-90 disabled:opacity-60 transition-all duration-200`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In as {selectedRoleData.label}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick demo access */}
          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium bg-background px-2">
                Quick Demo Access
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleDummyLogin(role.value as UserRole)}
                  disabled={loadingRole !== null || isLoading}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 truncate
                    bg-gradient-to-br ${role.color} text-white hover:opacity-80 disabled:opacity-50 shadow-sm`}
                >
                  {loadingRole === role.value ? "..." : role.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
