import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import CustomDropdown from "../../../components/Dropdowns/Dropdowns";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useGetLevelTypes } from "../../../hooks/levelType/useGetLevelType";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";
function LevelStartSetting({ handleClose = () => {}, rowData }){
  const {
    data: levelTypes,
    isLoading,
    error: levelTypesError,
  } = useGetLevelTypes();
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);

  const initialValue = rowData?.value ?? null;
  console.log(initialValue);

  const [levelStart, setLevelStart] = useState(null);
  const [levelStartError, setLevelStartError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading && Array.isArray(levelTypes?.data)) {
      const matchedStartLevel = levelTypes.data.find(
        (l) => l.program_name === initialValue
      );

      if (matchedStartLevel) {
        setLevelStart({
          id: matchedStartLevel.id,
        });
      }
    }
  }, [isLoading, levelTypes?.data, initialValue]);

  const handleUpdate = () => {
    setError(null);
    setLevelStartError(null);

    const selectedPeriod = levelTypes.data.find((l) => l.id === levelStart?.id);

    if (!levelStart?.id) {
      setError("Please select a starting level for your school before saving.");
      setLevelStartError("Start Level  Required");
      return;
    }

    const isUnchanged = selectedPeriod.key === initialValue;

    if (isUnchanged) {
      setError(
        "You haven't made any changes yet. Please select a different Starting Level  to update."
      );
      return;
    }

    updateSetting({
      payload: {
        setting_id: rowData?.id,
        value: levelStart?.id,
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
              Level Start
            </label>
            <CustomDropdown
              data={
                levelTypes?.data?.map((l) => ({
                  id: l.id,
                  name: l.name,
                  description: l.description
                })) || []
              }
              isLoading={isLoading}
              onSelect={(selectedObject) => {
                setLevelStart(selectedObject);
                setError(null);
                setLevelStartError(null);
              }}
              displayKey={["name", "description"]}
              valueKey={["id"]}
              direction="up"
              placeholder="Select Start Level"
              error={levelStartError}
              errorMessage="Level Start Required"
              onError={(msg) => setLevelStartError(msg)}
              value={levelStart?.id}
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
export default LevelStartSetting;