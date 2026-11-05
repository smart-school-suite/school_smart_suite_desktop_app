import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import "../../../styles/constraintWizard.css";

/**
 * Shared frame for every semester-timetable constraint drawer.
 *
 * The shell owns the header (constraint name, category, progress) and step
 * navigation. Each step renders <WizardStep> for its own body and footer, and
 * keeps receiving the same props the steps used before:
 * handleClose, currentStep, fullStep, nextStep, previousStep, handleNavigate,
 * drawerData.
 *
 * `meta` is optional content shown under the title (e.g. course details).
 */
function ConstraintWizard({
  flow,
  title,
  category,
  type,
  handleClose,
  drawerData,
  constraint,
  meta,
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index) => {
      const bounded = Math.max(0, Math.min(flow.length - 1, index));
      setStepIndex((current) => {
        setDirection(bounded >= current ? 1 : -1);
        return bounded;
      });
      setFurthestIndex((furthest) => Math.max(furthest, bounded));
    },
    [flow.length],
  );

  const nextStep = useCallback(() => {
    setDirection(1);
    setStepIndex((current) => {
      const next = Math.min(flow.length - 1, current + 1);
      setFurthestIndex((furthest) => Math.max(furthest, next));
      return next;
    });
  }, [flow.length]);

  const previousStep = useCallback(() => {
    setDirection(-1);
    setStepIndex((current) => Math.max(0, current - 1));
  }, []);

  const currentEntry = flow[stepIndex];
  const CurrentComponent = currentEntry.component;
  const heading = constraint?.name ?? title;
  const eyebrow = constraint?.category ?? category;
  const typeLabel = normaliseType(constraint?.type ?? type);

  return (
    <div className="cw" role="document">
      <header className="cw-header font-size-sm p-2">
        <div className="cw-header__top">
          <div className="cw-header__titles">
            {(eyebrow || typeLabel) && (
              <div className="cw-eyebrow font-size-xs">
                {eyebrow && <span>{eyebrow}</span>}
                {eyebrow && typeLabel && (
                  <span className="cw-eyebrow__sep" aria-hidden="true" />
                )}
                {typeLabel && (
                  <span
                    className={`cw-type cw-type--${typeLabel.toLowerCase()}`}
                  >
                    {typeLabel}
                  </span>
                )}
              </div>
            )}
            <h2 className="cw-title font-size-sm fw-medium">{heading}</h2>
            {meta && <div className="cw-header__meta">{meta}</div>}
          </div>
          <button
            type="button"
            className="cw-icon-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <Icon icon="lucide:x" width={18} height={18} />
          </button>
        </div>

        <nav className="cw-progress" aria-label="Steps">
          <ol className="cw-progress__track">
            {flow.map((entry, index) => {
              const state =
                index === stepIndex
                  ? "is-current"
                  : index <= furthestIndex
                    ? "is-done"
                    : "";
              const reachable = index <= furthestIndex && index !== stepIndex;
              return (
                <li key={entry.step} className="cw-progress__item">
                  <button
                    type="button"
                    className={`cw-progress__seg ${state}`}
                    onClick={() => reachable && goTo(index)}
                    disabled={!reachable}
                    aria-current={index === stepIndex ? "step" : undefined}
                    aria-label={`Step ${index + 1}: ${stepTitle(entry)}`}
                    title={stepTitle(entry)}
                  />
                </li>
              );
            })}
          </ol>
          <div className="cw-progress__meta">
            <span className="cw-progress__count">
              Step {stepIndex + 1} of {flow.length}
            </span>
            <span className="cw-progress__label">{stepTitle(currentEntry)}</span>
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentEntry.step}
          className="cw-stage"
          custom={direction}
          initial={{ opacity: 0, x: direction * 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -12 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
        >
          <CurrentComponent
            handleClose={handleClose}
            currentStep={stepIndex + 1}
            fullStep={flow.length}
            nextStep={nextStep}
            previousStep={previousStep}
            handleNavigate={goTo}
            goToStep={(stepKey) =>
              goTo(flow.findIndex((entry) => entry.step === stepKey))
            }
            drawerData={drawerData}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const stepTitle = (entry) => entry.title ?? entry.label ?? entry.lable ?? "";

const normaliseType = (type) => {
  if (!type) return null;
  const value = String(type).toLowerCase();
  if (value.includes("hard")) return "Hard";
  if (value.includes("soft")) return "Soft";
  return null;
};

export default ConstraintWizard;
