import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const isComplete = otp.every((d) => d !== "");

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
            <h1 className="text-2xl font-bold tracking-tight">Verify OTP</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP inputs */}
            <div className="flex gap-2.5 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-muted/40 focus:outline-none focus:bg-card transition-all ${
                    digit
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  }`}
                />
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={!isComplete}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Verify &amp; Continue
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline font-semibold"
                >
                  Resend Code
                </button>
              </p>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
