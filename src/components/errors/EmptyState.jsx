import { motion, useReducedMotion } from "framer-motion";

const MASCOTS = {
  empty: "/sss-maskot/happy.png",
  sad: "/sss-maskot/sad.png",
  error: "/sss-maskot/error.png",
  notFound: "/sss-maskot/404.png",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
};

/**
 * Friendly page fallback: a mascot, what happened, and what to do next.
 *
 *   <EmptyState
 *     mascot="empty"            // "empty" | "sad" | "error" | "notFound"
 *     title="No drafts saved"
 *     description="Drafts let you start an event and finish it later."
 *     hint="Optional smaller line"
 *     actions={<button>…</button>}
 *   />
 */
export default function EmptyState({
  mascot = "empty",
  title,
  description,
  hint,
  actions,
  height = "75dvh",
  mascotHeight = "17rem",
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      role="status"
      className="d-flex flex-column align-items-center justify-content-center w-100 text-center px-3"
      style={{ minHeight: height }}
      variants={container}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
    >
      <motion.div variants={item} aria-hidden="true">
        <motion.img
          src={MASCOTS[mascot] ?? mascot}
          alt=""
          draggable={false}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
          style={{
            height: mascotHeight,
            width: "auto",
            objectFit: "contain",
            // the artwork has wide transparent margins; trim them so the
            // character reads at a comfortable size
            marginTop: `calc(${mascotHeight} * -0.12)`,
            marginBottom: `calc(${mascotHeight} * -0.1)`,
            userSelect: "none",
          }}
        />
      </motion.div>
      <motion.span
        variants={item}
        className="fw-semibold mt-2"
        style={{ fontSize: "1rem", color: "#083049" }}
      >
        {title}
      </motion.span>
      {description && (
        <motion.p
          variants={item}
          className="font-size-sm text-iron-400 mt-1 mb-0"
          style={{ maxWidth: "26rem", lineHeight: 1.55 }}
        >
          {description}
        </motion.p>
      )}
      {hint && (
        <motion.p
          variants={item}
          className="mt-2 mb-0"
          style={{
            maxWidth: "26rem",
            fontSize: "0.75rem",
            color: "rgba(8,48,73,0.45)",
          }}
        >
          {hint}
        </motion.p>
      )}
      {actions && (
        <motion.div
          variants={item}
          className="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2 mt-3"
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
}

// Buttons sized and styled for EmptyState actions.
export function EmptyStateButton({ children, onClick, variant = "primary", icon: Icon }) {
  const isPrimary = variant === "primary";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`border-none rounded-3 font-size-sm px-3 py-2 d-flex flex-row align-items-center gap-2 ${
        isPrimary ? "primary-background text-white" : "border bg-white"
      }`}
      style={{ cursor: "pointer", color: isPrimary ? undefined : "#083049" }}
    >
      {Icon && <Icon size={15} />}
      {children}
    </motion.button>
  );
}
