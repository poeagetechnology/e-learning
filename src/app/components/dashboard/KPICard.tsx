import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "accent" | "warning";
}

const colorConfig = {
  primary: {
    gradient: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/25",
    light: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 dark:bg-violet-900/40",
  },
  secondary: {
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/25",
    light: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-100 dark:bg-cyan-900/40",
  },
  accent: {
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/25",
    light: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  warning: {
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/25",
    light: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 dark:bg-amber-900/40",
  },
};

export function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
}: KPICardProps) {
  const cfg = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-card border border-border/60 p-5 shadow-lg ${cfg.glow} hover:shadow-xl transition-all duration-300`}
      >
        {/* Corner accent */}
        <div
          className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-10`}
        />
        <div
          className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-15`}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <div className="flex items-center gap-1.5 mt-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    trend.isPositive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                  }`}
                >
                  {trend.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-[11px] text-muted-foreground">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.gradient} opacity-60`}
        />
      </div>
    </motion.div>
  );
}
