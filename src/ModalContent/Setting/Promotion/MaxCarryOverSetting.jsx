import { CircleX } from "lucide-react";
import { useState } from "react";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";

function MaxCarryOverSetting({ handleClose, rowData }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const [maxCarryOver, setMaxCarryOver] = useState(rowData?.value ?? null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    setError(null);

    if (isValid === false) {
      setError("Please fix the validation errors before updating.");
      return;
    }
    if (maxCarryOver === rowData?.value) {
      setError(
        "The new value is the same as the current value. No changes to update.",
      );
      return;
    }

    updateSetting({
      payload: {
        setting_id: rowData.id,
        value: maxCarryOver,
      },
    });
  };

  return (
    <>
      <div className="w-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">Max Carry Over</span>
            </div>
            <button
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

        <div className="p-2 font-size-sm">
          {error && (
            <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
              <p className="m-0">{error}</p>
            </div>
          )}

          <div className="d-flex flex-column">
            <span className="mb-1">Max Carry Over</span>
            <NumberInput
              placeholder="E.g. 2, 4, 6"
              onChange={(value) => {
                setMaxCarryOver(value);
                if (error) setError(null);
              }}
              onValidationChange={(value) => setIsValid(value)}
              value={maxCarryOver}
              validationSchema={numberSchema({
                min: 0,
                max: 20,
                required: false,
                integerOnly: false,
                messages: {
                  min: "Minimum number of carry overs allowed is 0.",
                  max: "Maximum number of carry overs allowed is 20.",
                },
              })}
              step="0.1"
              optional={true}
              disabled={isPending}
            />
          </div>
        </div>

        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isPending}
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50 d-flex align-items-center justify-content-center gap-2"
            >
              {isPending ? (
                <>
                  <SingleSpinner />
                </>
              ) : (
                "Yes Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MaxCarryOverSetting;