import { CircleX } from "lucide-react";
import { useMemo, useState } from "react";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useGetLevels } from "../../../hooks/level/useGetLevels";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";

const toLevelIds = (raw) => {
  let parsed = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
};

// Multi-select: only the checked levels receive synchronized semesters.
function SemesterSyncLevelsSetting({ handleClose = () => {}, rowData }) {
  const { data: levels, isLoading, error: levelError } = useGetLevels();
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError();

  const initialIds = useMemo(() => toLevelIds(rowData?.value), [rowData?.value]);
  const [selectedIds, setSelectedIds] = useState(initialIds);
  const [error, setError] = useState(null);

  const levelList = Array.isArray(levels?.data) ? levels.data : [];

  const toggle = (id) => {
    setError(null);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleUpdate = () => {
    setError(null);
    // Ignore saved ids for levels this school no longer uses.
    const value = levelList.map((l) => l.id).filter((id) => selectedIds.includes(id));
    const unchanged =
      value.length === initialIds.length && value.every((id) => initialIds.includes(id));
    if (unchanged) {
      setError("You haven't made any changes yet. Select or clear a level to update.");
      return;
    }
    clearFormError();
    updateSetting(
      { payload: { setting_id: rowData?.id, value } },
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
          <span className="font-size-sm fw-semibold">Allowed Synchronization Levels</span>
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
          Only the selected levels receive synchronized semesters. The level a
          semester is created for always receives it.
        </span>
        {isLoading ? (
          [...Array(4)].map((_, i) => <RectangleSkeleton key={i} width="100%" height="4dvh" />)
        ) : levelError ? (
          <NotFoundError
            title={levelError?.response?.data?.errors?.title ?? "Error loading levels"}
            description={levelError?.response?.data?.errors?.description ?? "Unable to load levels."}
          />
        ) : (
          levelList.map((l) => (
            <label
              key={l.id}
              className="d-flex align-items-center gap-2 rounded-3 p-2 border cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-check-input m-0"
                checked={selectedIds.includes(l.id)}
                onChange={() => toggle(l.id)}
                disabled={isPending}
              />
              <span className="fw-medium">{l.name}</span>
              {l.level && <span className="text-iron-400">({l.level})</span>}
            </label>
          ))
        )}
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
            disabled={isPending || isLoading || !!levelError}
            className="border-none px-3 py-2 rounded-3 font-size-sm bg-primary-500 text-white w-50 d-flex align-items-center justify-content-center gap-2"
          >
            {isPending ? <SingleSpinner /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default SemesterSyncLevelsSetting;
