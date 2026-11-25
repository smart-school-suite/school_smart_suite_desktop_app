import { Check, ChevronRight } from "lucide-react";

/**
 * A quiet step indicator for the import dialog: one line of small steps and
 * a 2px progress line, so the steps orient without taking the room the
 * content needs. Done steps can be clicked to go back.
 *
 *   <ImportSteps steps={[{ step, label }]} stepIndex canJumpTo navigate />
 */
export default function ImportSteps({ steps, stepIndex, canJumpTo = () => false, navigate = () => {} }) {
  const progress = steps.length > 1 ? (stepIndex / (steps.length - 1)) * 100 : 100;

  return (
    <nav aria-label="Import steps" className="position-relative border-bottom px-3 flex-shrink-0">
      <ol className="d-flex flex-row align-items-center gap-1 m-0 p-0 list-unstyled" style={{ height: "2.1rem" }}>
        {steps.map((step, index) => {
          const active = index === stepIndex;
          const done = index < stepIndex;
          const clickable = !active && canJumpTo(index);
          return (
            <li key={step.step} className="d-flex flex-row align-items-center gap-1">
              <button
                type="button"
                onClick={() => clickable && navigate(index)}
                disabled={!clickable}
                aria-current={active ? "step" : undefined}
                className={`border-0 bg-transparent p-0 d-flex flex-row align-items-center gap-1 font-size-xs ${
                  active ? "text-primary-600 fw-semibold" : done ? "text-iron-700" : "text-iron-400"
                }`}
                style={{ cursor: clickable ? "pointer" : "default" }}
                title={clickable ? `Back to ${step.label}` : undefined}
              >
                <span
                  className={`d-grid rounded-circle flex-shrink-0 ${
                    active ? "bg-primary-500 text-white" : done ? "bg-primary-50 text-primary-600" : "bg-iron-100 text-iron-500"
                  }`}
                  style={{ width: "1.1rem", height: "1.1rem", placeItems: "center", fontSize: "0.62rem" }}
                >
                  {done ? <Check size={10} strokeWidth={3} /> : index + 1}
                </span>
                {step.label}
              </button>
              {index < steps.length - 1 && <ChevronRight size={12} className="text-iron-300 mx-1" aria-hidden="true" />}
            </li>
          );
        })}
        <li className="ms-auto text-iron-400 font-size-xs" aria-hidden="true">
          Step {stepIndex + 1} of {steps.length}
        </li>
      </ol>
      <div className="position-absolute start-0 bottom-0 w-100" style={{ height: 2 }} aria-hidden="true">
        <div className="h-100 bg-primary-500" style={{ width: `${progress}%`, transition: "width 0.3s ease" }} />
      </div>
    </nav>
  );
}
