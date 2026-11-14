import { motion, useReducedMotion } from "framer-motion";
import { USAGE_STATUS } from "../../utils/subscription/planDisplay";

/**
 * Thin usage bar coloured by status.
 *
 *   <UsageMeter percent={92} status="critical" />
 */
export default function UsageMeter({ percent = 0, status = "healthy", label }) {
  const reduceMotion = useReducedMotion();
  const width = `${Math.max(status === "unlimited" ? 4 : 2, Math.min(100, percent ?? 0))}%`;
  return (
    <div
      className="usage-meter"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent ?? 0}
      aria-label={label}
    >
      <motion.span
        className={`usage-meter__fill ${USAGE_STATUS[status]?.bar ?? "bg-primary-400"}`}
        initial={reduceMotion ? false : { width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      />
    </div>
  );
}
