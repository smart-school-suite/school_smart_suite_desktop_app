import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import {
  OptionTile,
  TimeSpan,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

/** What a hall means for this class: fit, recommendation and seats. */
const hallMeta = (hall, studentCount) => {
  const seats = hall.capacity ? `${hall.capacity} seats` : "Seats unknown";
  if (hall.fits === false && studentCount) return `${seats} · too small for ${studentCount}`;
  if (hall.recommended) return `${seats} · recommended`;
  return seats;
};

/**
 * One free time shown as a slot of the course. Selecting the card selects the
 * time; only then can a hall be chosen for it.
 */
function SlotCard({ course, teacher, time, pick, blocked, disabled, studentCount, onToggle, onChooseHall }) {
  const [showHalls, setShowHalls] = useState(false);
  const selected = Boolean(pick);
  const inactive = disabled || (Boolean(blocked) && !selected);

  const toggle = () => {
    if (inactive) return;
    if (selected) setShowHalls(false);
    onToggle();
  };

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      aria-disabled={inactive}
      tabIndex={inactive ? -1 : 0}
      title={blocked && !selected ? blocked : undefined}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      // Not .cw-option: its selected rule would also restyle the hall tiles inside.
      className={`card rounded-3 p-3 w-100 h-100 d-flex flex-column gap-2 ${
        selected
          ? "border-1 border-solid border-primary-500 bg-primary-50"
          : "border-1 border-solid border-iron-200 bg-white"
      } ${inactive ? "opacity-50" : "pointer-cursor"}`}
    >
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <span className="cw-option__title">
          <TimeSpan start={time.start_time} end={time.end_time} />
        </span>
        {selected ? (
          <CircleCheck size={20} className="text-primary-500 flex-shrink-0" aria-hidden="true" />
        ) : (
          <Circle size={20} strokeWidth={1.5} className="text-iron-400 flex-shrink-0" aria-hidden="true" />
        )}
      </div>

      <div className="d-flex flex-column">
        <span className="fw-semibold text-truncate">{course.course?.title}</span>
        <span className="cw-option__meta">
          {[course.course?.code, course.course?.credit && `${course.course.credit} credits`, teacher?.name]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </div>

      <div className="d-flex flex-row align-items-center gap-2 w-100 mt-1">
        {pick?.hall ? (
          <span className="d-flex flex-row align-items-center gap-1 font-size-sm fw-medium flex-grow-1 text-truncate">
            <Icon icon="lucide:door-open" width={14} height={14} />
            {pick.hall.name}
            {pick.hall.fits === false && (
              <span className="jcs-field-hint jcs-field-hint--danger ms-1">too small</span>
            )}
          </span>
        ) : (
          <span className="jcs-field-hint flex-grow-1">
            {selected ? "Choose a hall for this slot" : `${time.halls.length} hall${time.halls.length === 1 ? "" : "s"} free`}
          </span>
        )}
        <button
          type="button"
          className={`rounded-pill px-3 py-1 font-size-sm flex-shrink-0 ${
            selected ? "primary-background text-white border-0" : "bg-white border"
          }`}
          disabled={!selected || disabled}
          title={selected ? undefined : "Select this slot first"}
          onClick={(event) => {
            event.stopPropagation();
            setShowHalls((open) => !open);
          }}
        >
          {pick?.hall ? "Change hall" : "Select hall"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {selected && showHalls && (
          <motion.div
            {...reveal}
            className="w-100 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cw-options cw-options--compact pt-1">
              {time.halls.map((hall) => (
                <OptionTile
                  key={hall.option_id}
                  selected={pick?.option_id === hall.option_id}
                  onClick={() => {
                    onChooseHall(hall);
                    setShowHalls(false);
                  }}
                  title={hall.name}
                  meta={hallMeta(hall, studentCount)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SlotCard;
