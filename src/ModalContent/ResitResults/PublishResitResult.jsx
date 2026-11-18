import { CalendarClock, Megaphone, Zap } from "lucide-react";
import { useState } from "react";
import { dateTimeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { DateTimeInput } from "../../components/FormComponents/InputComponents";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useFormError } from "../../hooks/form/useFormError";
import { usePublishResitResult } from "../../hooks/resitResult/usePublishResitResult";

const MODES = [
  { value: "active", label: "Publish now", hint: "Students see their results right away.", icon: Zap },
  { value: "scheduled", label: "Schedule", hint: "Release them at a set time.", icon: CalendarClock },
];

/**
 * Publishes a resit exam's results, now or at a set time. Only offered
 * once every candidate is evaluated; the API checks again.
 */
function PublishResitResult({ handleClose, rowData }) {
  const { mutate: publish, isPending } = usePublishResitResult(handleClose, rowData?.id);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Publish Resit Results");
  const [mode, setMode] = useState("active");
  const [publishAt, setPublishAt] = useState("");
  const [publishAtValid, setPublishAtValid] = useState(false);

  const scheduled = mode === "scheduled";
  const rescheduling = rowData?.publication_status === "scheduled";
  const pending = rowData?.not_evaluated_candidates ?? 0;
  const ready = rowData?.is_ready_to_publish || rescheduling;

  const handleConfirm = () => {
    clearFormError();
    publish(
      { resit_exam_id: rowData?.id, status: mode, ...(scheduled ? { published_at: publishAt } : {}) },
      { onError: handleServerError },
    );
  };

  return (
    <ConfirmDialog
      title={rescheduling ? "Reschedule Resit Results" : "Publish Resit Results"}
      icon={Megaphone}
      description={
        ready
          ? `Results of ${rowData?.exam_name ?? "this resit exam"} for ${rowData?.total_candidates ?? 0} candidates will be released to students. Once released, they stay published.`
          : `${pending} ${pending === 1 ? "candidate has" : "candidates have"} not been evaluated yet. Evaluate every candidate before publishing.`
      }
      confirmLabel={scheduled ? "Schedule" : "Publish"}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      isPending={isPending}
      confirmDisabled={!ready || (scheduled && (!publishAt || !publishAtValid))}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      {ready && (
        <div className="d-flex flex-column gap-2 pt-1">
          <span className="font-size-sm fw-semibold">When should students see them?</span>
          <div className="row g-2" role="radiogroup" aria-label="When to publish">
            {MODES.map((option) => {
              const selected = mode === option.value;
              const OptionIcon = option.icon;
              return (
                <div key={option.value} className="col-6">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMode(option.value)}
                    className={`w-100 h-100 text-start rounded-3 p-2 d-flex flex-row align-items-start gap-2 font-size-sm ${
                      selected ? "border border-primary-500 bg-primary-50 text-primary-600" : "border bg-white text-iron-700"
                    }`}
                  >
                    <OptionIcon size={16} className="flex-shrink-0" style={{ marginTop: "0.15rem" }} />
                    <span className="d-flex flex-column">
                      <span className="fw-semibold">{option.label}</span>
                      <span className="font-size-xs text-iron-500">{option.hint}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          {scheduled && (
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">Publish at</label>
              <DateTimeInput
                value={publishAt}
                onChange={setPublishAt}
                onValidationChange={setPublishAtValid}
                validationSchema={dateTimeValidationSchema({ required: true, futureOrToday: true })}
              />
            </div>
          )}
        </div>
      )}
    </ConfirmDialog>
  );
}
export default PublishResitResult;
