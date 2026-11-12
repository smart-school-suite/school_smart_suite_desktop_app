import { motion, useReducedMotion } from "framer-motion";
import { TONE_CLASSES } from "../../utils/election/electionDisplay";

/**
 * Small rounded status label.
 *
 *   <StatusPill tone="success">Approved</StatusPill>
 *   <StatusPill meta={APPLICATION_STATUS[status]} />
 *   <StatusPill meta={...} pulse />   // live dot, e.g. "Voting live"
 */
export default function StatusPill({ meta, tone, children, pulse = false, title, className = "" }) {
  const resolvedTone = tone ?? meta?.tone ?? "neutral";
  const reduceMotion = useReducedMotion();
  return (
    <span
      title={title}
      className={`d-inline-flex align-items-center gap-1 rounded-pill px-2 fw-semibold text-nowrap flex-shrink-0 ${
        TONE_CLASSES[resolvedTone] ?? TONE_CLASSES.neutral
      } ${className}`}
      style={{ fontSize: "0.7rem", lineHeight: "1.375rem" }}
    >
      {pulse && (
        <span className="position-relative d-inline-flex" style={{ width: 6, height: 6 }} aria-hidden="true">
          <motion.span
            className="position-absolute w-100 h-100 rounded-circle bg-fern-400"
            animate={reduceMotion ? undefined : { scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="position-relative w-100 h-100 rounded-circle bg-fern-500" />
        </span>
      )}
      {children ?? meta?.label}
    </span>
  );
}
