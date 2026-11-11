import { CircleX } from "lucide-react";
import { useState } from "react";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";

// A single-choice setting: exactly one option is selected at a time.
function AutoCreateOptionSetting({ handleClose = () => {}, rowData, title, options, note }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError();

  const initialValue = rowData?.value ?? null;
  const [selected, setSelected] = useState(initialValue);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    setError(null);
    if (!selected) {
      setError("Please select an option before saving.");
      return;
    }
    if (selected === initialValue) {
      setError("You haven't made any changes yet. Select a different option to update.");
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
        {note && <span className="text-iron-400">{note}</span>}
        <div role="radiogroup" className="d-flex flex-column gap-2">
          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <div
                key={option.value}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => !isPending && setSelected(option.value)}
                onKeyDown={(e) => {
                  if (!isPending && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setSelected(option.value);
                  }
                }}
                className={`rounded-3 p-2 cursor-pointer ${isSelected ? "bg-primary-50" : "bg-white"}`}
                style={{ border: `1px solid var(${isSelected ? "--primary-color-400" : "--iron-200"})` }}
              >
                <div className="d-flex align-items-start gap-2">
                  <input
                    type="radio"
                    className="form-check-input mt-1 flex-shrink-0 pe-none"
                    checked={isSelected}
                    readOnly
                    tabIndex={-1}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-medium">{option.label}</span>
                    <span className="font-size-xs text-iron-600">{option.description}</span>
                  </div>
                </div>
              </div>
            );
          })}
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
export default AutoCreateOptionSetting;
