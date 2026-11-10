import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Shared state of the create / edit-draft event drawer: the steps, where the
 * user is, and which steps they may jump to.
 */
export const EventWizardContext = createContext(null);

export const useEventWizard = () => useContext(EventWizardContext);

const tokens = {
  blue: "#0EA7E9",
  blueTint: "#EAF7FD",
  ink: "#083049",
  inkFaint: "rgba(8,48,73,0.42)",
  line: "rgba(8,48,73,0.12)",
};

// Clickable step bar shown under the drawer header.
export function EventWizardStepBar() {
  const wizard = useEventWizard();
  const reduceMotion = useReducedMotion();
  if (!wizard) return null;
  const { steps, stepIndex, canJumpTo, navigate, isIncomplete } = wizard;

  return (
    <nav
      aria-label="Event steps"
      className="d-flex flex-row align-items-center gap-1 px-2 py-2 border-bottom font-size-sm"
    >
      {steps.map((step, index) => {
        const isActive = index === stepIndex;
        const isPast = index < stepIndex;
        const needsWork = isPast && isIncomplete?.(index);
        const isDone = isPast && !needsWork;
        const isEnabled = !isActive && canJumpTo(index);
        return (
          <div
            key={step.step}
            className="d-flex flex-row align-items-center gap-1 flex-grow-1"
            style={{ minWidth: 0 }}
          >
            <motion.button
              type="button"
              onClick={() => isEnabled && navigate(index)}
              disabled={!isEnabled && !isActive}
              aria-current={isActive ? "step" : undefined}
              whileHover={isEnabled ? { y: -1 } : undefined}
              whileTap={isEnabled ? { scale: 0.97 } : undefined}
              className="position-relative border-0 bg-transparent d-flex flex-row align-items-center gap-2 rounded-pill px-2 py-1"
              style={{
                cursor: isEnabled ? "pointer" : "default",
                color: isActive ? tokens.blue : isEnabled ? tokens.ink : tokens.inkFaint,
                minWidth: 0,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="event-wizard-active-step"
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-pill"
                  style={{ background: tokens.blueTint, zIndex: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <motion.span
                className="position-relative d-grid rounded-circle fw-semibold flex-shrink-0"
                initial={false}
                animate={{
                  backgroundColor: needsWork
                    ? "#FFFAEB"
                    : isActive || isDone
                      ? tokens.blue
                      : "#fff",
                  color: needsWork
                    ? "#B54708"
                    : isActive || isDone
                      ? "#fff"
                      : tokens.inkFaint,
                  borderColor: needsWork
                    ? "#FEC84B"
                    : isActive || isDone
                      ? tokens.blue
                      : tokens.line,
                }}
                title={needsWork ? "Some details are still missing" : undefined}
                style={{
                  width: "1.35rem",
                  height: "1.35rem",
                  placeItems: "center",
                  fontSize: "0.7rem",
                  border: "1.5px solid",
                  zIndex: 1,
                }}
              >
                {needsWork ? "!" : isDone ? <Check size={11} strokeWidth={3} /> : index + 1}
              </motion.span>
              <span
                className="position-relative text-truncate fw-medium"
                style={{ zIndex: 1, fontSize: "0.78rem" }}
              >
                {step.shortLabel ?? step.label}
              </span>
            </motion.button>
            {index < steps.length - 1 && (
              <div
                className="flex-grow-1 rounded-pill overflow-hidden"
                style={{ height: 2, minWidth: 8, background: tokens.line }}
              >
                <motion.div
                  className="h-100"
                  style={{ background: tokens.blue }}
                  initial={false}
                  animate={{ width: index < stepIndex ? "100%" : "0%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
