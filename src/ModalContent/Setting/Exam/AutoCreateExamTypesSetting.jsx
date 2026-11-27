import { CircleX } from "lucide-react";
import { useState } from "react";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";

export const EXAM_TYPE_OPTIONS = [
  {
    value: "ca_and_exam",
    label: "CA and Exam",
    description: "Both the CA and the Exam are created for matching semesters.",
  },
  {
    value: "ca_only",
    label: "CA only",
    description: "Only the CA is copied. Each specialty's Exam is created by hand.",
  },
];

export const examTypeOptionLabel = (value) =>
  EXAM_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? EXAM_TYPE_OPTIONS[0].label;

/** "Exams to Create Automatically": the CA and the Exam, or the CA only. */
function AutoCreateExamTypesSetting({ handleClose = () => {}, rowData }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError();

  const initial = EXAM_TYPE_OPTIONS.some((o) => o.value === rowData?.value)
    ? rowData.value
    : EXAM_TYPE_OPTIONS[0].value;
  const [selected, setSelected] = useState(initial);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    if (selected === initial) {
      setError("You haven't made any changes yet. Pick the other option to update.");
      return;
    }
    clearFormError();
    updateSetting(
      { payload: { setting_id: rowData?.id, value: selected } },
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
          <span className="font-size-sm fw-semibold">Exams to Create Automatically</span>
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
        <span className="text-iron-400">
          Which exams are also created for specialties whose semester has the same dates.
        </span>
        {EXAM_TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`d-flex align-items-start gap-2 rounded-3 p-2 border cursor-pointer ${
              selected === option.value ? "border-primary-500" : ""
            }`}
          >
            <input
              type="radio"
              name="auto-create-exam-types"
              className="form-check-input m-0 mt-1"
              checked={selected === option.value}
              onChange={() => {
                setSelected(option.value);
                setError(null);
              }}
              disabled={isPending}
            />
            <span className="d-flex flex-column">
              <span className="fw-medium">{option.label}</span>
              <span className="text-iron-400">{option.description}</span>
            </span>
          </label>
        ))}
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
export default AutoCreateExamTypesSetting;
