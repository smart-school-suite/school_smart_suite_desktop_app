import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import CustomDropdown from "../../../components/Dropdowns/Dropdowns";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
import { useGetSemesterTimetablePeriods } from "../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";

function PeriodDurationSetting({ handleClose = () => {}, rowData }) {
  const {
    data: periods,
    isLoading,
    error: periodsError,
  } = useGetSemesterTimetablePeriods();
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);

  const initialValue = rowData?.value ?? null;

  const [duration, setDuration] = useState(null);
  const [durationError, setDurationError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading && Array.isArray(periods?.data)) {
      const matchedPeriod = periods.data.find(
        (p) => p.minutes === initialValue
      );

      if (matchedPeriod) {
        setDuration({
          id: matchedPeriod.id,
        });
      }
    }
  }, [isLoading, periods?.data, initialValue]);

  const handleUpdate = () => {
    setError(null);
    setDurationError(null);

    const selectedPeriod = periods.data.find((p) => p.id === duration?.id);

    if (!duration?.id) {
      setError("Please select a period duration before saving.");
      setDurationError("Period Duration Required");
      return;
    }

    const isUnchanged = selectedPeriod.minutes === initialValue;

    if (isUnchanged) {
      setError(
        "You haven't made any changes yet. Please select a different period duration to update."
      );
      return;
    }

    updateSetting({
      payload: {
        setting_id: rowData?.id,
        value: duration?.id,
      },
    });
  };

  return (
    <>
      <div className="w-100 d-flex flex-column h-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">Period Duration</span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="border-none border rounded-circle bg-transparent p-0"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>

        <div className="p-2 font-size-sm flex-grow-1">
          {error && (
            <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-3">
              <p className="m-0">{error}</p>
            </div>
          )}

          <div className="d-flex flex-column gap-1">
            <label
              htmlFor="periodDurationSelect"
              className="font-size-sm fw-medium"
            >
              Period Duration
            </label>
            <CustomDropdown
              data={
                periods?.data?.map((p) => ({
                  id: p.id,
                  key: p.key,
                  name: p.name,
                  minutes: `${p.minutes} minutes`,
                })) || []
              }
              isLoading={isLoading}
              onSelect={(selectedObject) => {
                setDuration(selectedObject);
                setError(null);
                setDurationError(null);
              }}
              displayKey={["name", "minutes"]}
              valueKey={["id"]}
              direction="up"
              placeholder="Select Period Duration"
              error={durationError}
              errorMessage="Period Duration Required"
              onError={(msg) => setDurationError(msg)}
              value={duration?.id}
              disabled={isPending}
            />
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
    </>
  );
}

export default PeriodDurationSetting;