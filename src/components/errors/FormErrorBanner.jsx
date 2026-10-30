import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { forwardRef } from "react";

// Inline form error, shaped like parseServerError's output: { title, messages }
const FormErrorBanner = forwardRef(function FormErrorBanner(
  { error, onDismiss, className = "mb-4" },
  ref,
) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          key="form-error"
          ref={ref}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`bg-red-100 p-2 rounded-3 text-red-700 d-flex flex-row align-items-start justify-content-between gap-2 ${className}`}
          role="alert"
        >
          <div className="d-flex flex-column gap-1">
            <p className="m-0 fw-medium">{error.title}</p>
            {error.messages?.length > 0 && (
              <ul className="m-0 ps-3">
                {error.messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
          {onDismiss && (
            <button
              type="button"
              className="border-none bg-none p-0 text-red-700"
              onClick={onDismiss}
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default FormErrorBanner;
