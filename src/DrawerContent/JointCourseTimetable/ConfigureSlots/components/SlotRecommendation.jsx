import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { TimeSpan } from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

/**
 * A pending suggestion for one slot. Nothing changes until "Use this slot"
 * is pressed, and the fields stay editable afterwards.
 */
function SlotRecommendation({ entry, onAccept, onRecalculate, onDismiss, onSelect, onToggleAlternatives }) {
  if (!entry) return null;

  if (entry.status === "loading") {
    return (
      <div className="jcs-rec jcs-rec--muted">
        <Icon icon="lucide:loader-circle" width={16} height={16} className="ctl-spin" />
        <span>Looking for a time when the lecturer and a hall are both free…</span>
      </div>
    );
  }

  if (entry.status !== "ready") {
    return (
      <div className={`jcs-rec ${entry.status === "error" ? "jcs-rec--danger" : "jcs-rec--muted"}`}>
        <Icon
          icon={entry.status === "error" ? "lucide:circle-alert" : "lucide:calendar-x-2"}
          width={16}
          height={16}
        />
        <span className="flex-grow-1">{entry.message}</span>
        <button type="button" className="cw-text-btn" onClick={onRecalculate}>
          Try again
        </button>
        <button type="button" className="cw-text-btn cw-text-btn--muted" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    );
  }

  const option = entry.options[entry.selected];
  const alternatives = entry.options.length - 1;

  return (
    <div className="jcs-rec jcs-rec--ready flex-column align-items-stretch">
      <div className="d-flex flex-row align-items-start gap-2">
        <Icon icon="lucide:sparkles" width={16} height={16} className="jcs-rec__icon" />
        <div className="d-flex flex-column gap-1 flex-grow-1">
          <span className="jcs-rec__eyebrow">Suggested slot · not applied yet</span>
          <span className="d-flex flex-row flex-wrap align-items-center gap-2 fw-medium">
            <TimeSpan start={option.start_time} end={option.end_time} />
            <span className="jcs-dot" aria-hidden="true" />
            <span>{option.hall_name}</span>
          </span>
          <span className="jcs-rec__why">{option.explanation}</span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {entry.showAlternatives && alternatives > 0 && (
          <motion.ul className="jcs-alts" {...reveal}>
            {entry.options.map((item, index) =>
              index === entry.selected ? null : (
              <li key={item.key}>
                <button
                  type="button"
                  className="jcs-alt"
                  title="Show this option as the suggestion"
                  onClick={() => onSelect(index)}
                >
                  <TimeSpan start={item.start_time} end={item.end_time} showDuration={false} />
                  <span className="text-truncate">{item.hall_name}</span>
                  {item.hall_capacity ? (
                    <span className="jcs-field-hint ms-auto">{item.hall_capacity} seats</span>
                  ) : null}
                </button>
              </li>
              ),
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="jcs-rec__actions">
        <button type="button" className="cw-btn cw-btn--primary jcs-btn-sm" onClick={onAccept}>
          <Icon icon="lucide:check" width={14} height={14} />
          <span>Use this slot</span>
        </button>
        {alternatives > 0 && (
          <button type="button" className="cw-text-btn" onClick={onToggleAlternatives}>
            {entry.showAlternatives
              ? "Hide alternatives"
              : `View ${alternatives} alternative${alternatives === 1 ? "" : "s"}`}
          </button>
        )}
        <button type="button" className="cw-text-btn" onClick={onRecalculate}>
          <Icon icon="lucide:refresh-cw" width={14} height={14} />
          <span>Recalculate</span>
        </button>
        <button type="button" className="cw-text-btn cw-text-btn--muted ms-auto" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default SlotRecommendation;
