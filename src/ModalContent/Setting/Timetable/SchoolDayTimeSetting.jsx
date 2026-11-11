import { CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { timeValidationSchema } from "../../../ComponentConfig/YupValidationSchema";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { TimeInput } from "../../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useFormError } from "../../../hooks/form/useFormError";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";

// Edits a 24-hour HH:MM time setting. The API also checks that the school
// day opens before it closes; that error is shown in the banner.
function SchoolDayTimeSetting({ handleClose = () => {}, rowData, title, label }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError();

  const initialValue = rowData?.value ?? "";
  const [time, setTime] = useState(initialValue);
  const [isValid, setIsValid] = useState(Boolean(initialValue));
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleUpdate = async () => {
    setError(null);
    const valid = await inputRef.current?.triggerValidation();
    if (!valid || !isValid || !time) {
      setError("Please enter a valid time in 24-hour HH:MM format, for example 08:00.");
      return;
    }
    if (time === initialValue) {
      setError("You haven't made any changes yet. Enter a different time to update.");
      return;
    }
    clearFormError();
    updateSetting(
      { payload: { setting_id: rowData?.id, value: time } },
      { onError: handleServerError },
    );
  };

  return (
    <div className="w-100 d-flex flex-column h-100">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
        style={{ height: "6dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="font-size-sm fw-semibold">{title}</span>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="border-none border rounded-circle bg-transparent p-0"
            style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>
      <FormErrorBanner
        ref={errorBannerRef}
        error={formError}
        onDismiss={clearFormError}
        className="mx-2 mt-2 mb-0"
      />

      <div className="p-2 font-size-sm flex-grow-1 d-flex flex-column gap-2">
        {error && (
          <div className="bg-red-100 p-2 rounded-3 text-red-700">
            <p className="m-0">{error}</p>
          </div>
        )}
        <div className="d-flex flex-column gap-1">
          <label htmlFor="schoolDayTime" className="font-size-sm fw-medium">
            {label}
          </label>
          <TimeInput
            ref={inputRef}
            id="schoolDayTime"
            value={time}
            onChange={(value) => {
              setTime(value);
              setError(null);
            }}
            onValidationChange={setIsValid}
            validationSchema={timeValidationSchema({
              messages: {
                required: `${label} is required`,
                format: "Use 24-hour HH:MM format, for example 08:00",
              },
            })}
          />
          <span className="font-size-xs text-iron-500">
            24-hour format. The school day must open before it closes.
          </span>
        </div>
      </div>

      <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 h-100">
          <button
            type="button"
            className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isPending}
            className="border-none px-3 py-2 rounded-3 font-size-sm bg-primary-500 text-white w-50 d-flex align-items-center justify-content-center gap-2"
          >
            {isPending ? <SingleSpinner /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export const SchoolDayStartSetting = (props) => (
  <SchoolDayTimeSetting {...props} title="School Day Opening Time" label="Opening Time" />
);

export const SchoolDayEndSetting = (props) => (
  <SchoolDayTimeSetting {...props} title="School Day Closing Time" label="Closing Time" />
);

export default SchoolDayTimeSetting;
