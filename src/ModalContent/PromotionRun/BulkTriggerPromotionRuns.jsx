import { CalendarClock, Play, Zap } from "lucide-react";
import { useState } from "react";
import { dateTimeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { DateTimeInput } from "../../components/FormComponents/InputComponents";
import { useBulkPromotionRunAction } from "../../hooks/promotionRun/useBulkPromotionRunAction";
import PromotionRunBulkConfirm, { selectedPromotionRuns } from "./PromotionRunBulkConfirm";

const MODES = [
  { value: "active", label: "Run now", hint: "Queue every run immediately.", icon: Zap },
  { value: "scheduled", label: "Schedule", hint: "Start them all at a set time.", icon: CalendarClock },
];

function BulkTriggerPromotionRuns({ handleClose, rowData, bulkData, resetAll }) {
  const runs = selectedPromotionRuns(rowData, bulkData);
  const { mutate, isPending } = useBulkPromotionRunAction("trigger", handleClose, resetAll);
  const [mode, setMode] = useState("active");
  const [startAt, setStartAt] = useState("");
  const [startAtValid, setStartAtValid] = useState(false);

  const scheduled = mode === "scheduled";

  return (
    <PromotionRunBulkConfirm
      runs={runs}
      action="trigger"
      title="Trigger Promotion Runs"
      icon={Play}
      description="Each run evaluates its students against the promotion rules and records who is promoted, retained or needs review."
      confirmLabel={scheduled ? "Schedule" : "Run"}
      errorTitle="Failed To Trigger Promotion Runs"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
      canConfirm={!scheduled || (Boolean(startAt) && startAtValid)}
      buildPayload={(ids) => ({
        promotion_run_ids: ids,
        status: mode,
        ...(scheduled ? { initiate_at: startAt } : {}),
      })}
    >
      <div className="d-flex flex-column gap-2 pt-1">
        <span className="font-size-sm fw-semibold">When should they run?</span>
        <div className="row g-2" role="radiogroup" aria-label="When to run">
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
            <label className="font-size-sm m-0">Start at</label>
            <DateTimeInput
              value={startAt}
              onChange={setStartAt}
              onValidationChange={setStartAtValid}
              validationSchema={dateTimeValidationSchema({ required: true, futureOrToday: true })}
            />
          </div>
        )}
      </div>
    </PromotionRunBulkConfirm>
  );
}
export default BulkTriggerPromotionRuns;
