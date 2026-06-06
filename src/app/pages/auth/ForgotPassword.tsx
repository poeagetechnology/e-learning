import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, ArrowLeft, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] dark:bg-[#08080f] p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-2xl shadow-black/10 border border-border/60 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-violet-500/30">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Forgot Password?</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Enter your email and we&apos;ll send a verification code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-card transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 hover:opacity-90 transition-all duration-200"
            >
              Send Verification Code
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
