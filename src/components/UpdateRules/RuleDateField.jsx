import { useMemo } from "react";
import { dateValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { rangeHint } from "../../utils/updateRules/dateRules";
import { formatScheduleDate } from "../../utils/feeSchedule/scheduleRules";
import { DateInput } from "../FormComponents/InputComponents";
import LockedValue from "./LockedValue";

/**
 * A date governed by update rules: a DateInput validated against its allowed
 * range (bounds from utils/updateRules/dateRules), or the locked value.
 */
export default function RuleDateField({ id, label, value, onChange, bounds, editable, lockedValue }) {
  const schema = useMemo(
    () =>
      dateValidationSchema({
        required: true,
        min: bounds.min,
        max: bounds.max,
        messages: {
          min: bounds.min && `Must be on or after ${formatScheduleDate(bounds.min.date)}: ${bounds.min.reason}.`,
          max: bounds.max && `Must be on or before ${formatScheduleDate(bounds.max.date)}: ${bounds.max.reason}.`,
        },
      }),
    [bounds.min, bounds.max],
  );
  const hint = editable ? rangeHint(bounds) : null;

  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="font-size-sm m-0">
        {label}
        {hint && <span className="text-iron-400 font-size-xs"> · {hint}</span>}
      </label>
      {editable ? (
        <DateInput id={id} name={id} value={value} onChange={onChange} validationSchema={schema} />
      ) : (
        <LockedValue value={lockedValue} />
      )}
    </div>
  );
}
