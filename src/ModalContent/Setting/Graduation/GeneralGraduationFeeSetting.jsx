import { CircleX } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";

function GeneralGraduationFeeSetting({ handleClose, rowData }) {
  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);
  const currency = useSelector(
    (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? "",
  );

  const [graduationFee, setGraduationFee] = useState(rowData?.value ?? null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    setError(null);

    if (isValid === false) {
      setError("Please fix the input error before saving.");
      return;
    }

    if (
      graduationFee === null ||
      graduationFee === undefined ||
      String(graduationFee).trim() === ""
    ) {
      setError("Please enter a graduation fee amount.");
      return;
    }

    const isUnchanged = String(graduationFee) === String(rowData?.value ?? "");

    if (isUnchanged) {
      setError(
        "You haven't made any changes yet. Please enter a new amount to update.",
      );
      return;
    }

    updateSetting({
      payload: {
        setting_id: rowData?.id,
        value: Number(graduationFee),
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
              <span className="font-size-sm fw-semibold">
                General Graduation Fee
              </span>
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
            <span className="fw-medium">Graduation Fee</span>
            <NumberInput
              placeholder="E.g. 5000, 10000, 25000"
              onChange={(value) => {
                setGraduationFee(value);
                if (error) setError(null);
              }}
              onValidationChange={(valid) => setIsValid(valid)}
              value={graduationFee ?? ""}
              validationSchema={numberSchema({
                min: 1,
                max: 1000000,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Please enter a graduation fee amount.",
                  min: `Minimum graduation fee allowed is 1 ${currency}`,
                  max: `Maximum graduation fee allowed is 1,000,000 ${currency}`,
                },
              })}
              step="0.1"
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

export default GeneralGraduationFeeSetting;
