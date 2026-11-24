import { CalendarRange } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "../../../components/Modals/ConfirmDialog";
import { useFormError } from "../../../hooks/form/useFormError";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";

export const MAX_SEMESTER_CHOICES = [1, 2, 3, 4, 5];

function MaxSemestersSetting({ handleClose, rowData }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Couldn't save the number of semesters");
  const current = Number(rowData?.value) || 2;
  const [count, setCount] = useState(current);

  const save = () => {
    clearFormError();
    updateSetting(
      { payload: { setting_id: rowData.id, value: count } },
      { onError: handleServerError },
    );
  };

  return (
    <ConfirmDialog
      title="Number of Semesters"
      icon={CalendarRange}
      confirmLabel="Save"
      onConfirm={save}
      onCancel={handleClose}
      isPending={isPending}
      cancelDisabled={isPending}
      confirmDisabled={count === current}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-column gap-2">
        <span className="text-iron-600">Semesters per academic year</span>
        <div className="semester-count-choices d-grid gap-2" role="radiogroup" aria-label="Semesters per academic year">
          {MAX_SEMESTER_CHOICES.map((choice) => (
            <button
              key={choice}
              type="button"
              role="radio"
              aria-checked={choice === count}
              disabled={isPending}
              onClick={() => setCount(choice)}
              className={`semester-choice semester-count-choice rounded-3 border py-2 fw-semibold ${
                choice === count ? "semester-choice--selected" : ""
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
        <span className="font-size-xs text-iron-500">Most schools use 2.</span>
      </div>
    </ConfirmDialog>
  );
}

export default MaxSemestersSetting;
