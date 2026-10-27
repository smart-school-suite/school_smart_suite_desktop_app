import { X } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../../components/errors/Error";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useGetLevels } from "../../../hooks/level/useGetLevels";
import { useUpdateSetting } from "../../../hooks/schoolBranchSetting/useUpdateSetting";

function LevelResitBillingFeeSetting({ handleClose = () => {}, drawerData }) {
  const {
    data: levels,
    isLoading: isLevelLoading,
    error: levelError,
  } = useGetLevels();

  const { mutate: updateSetting, isPending } = useUpdateSetting(handleClose);

  const currency = useSelector(
    (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? ""
  );

  const initialDataMap = useMemo(() => {
    const raw = drawerData?.value;
    if (!raw) return {};

    let parsed = raw;
    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch {
        return {};
      }
    }

    const map = {};
    if (Array.isArray(parsed)) {
      parsed.forEach((item) => {
        if (item?.level_id) {
          map[item.level_id] = item?.fee ?? item?.amount ?? null;
        }
      });
    } else if (typeof parsed === "object" && parsed !== null) {
      Object.entries(parsed).forEach(([key, val]) => {
        map[key] = val;
      });
    }

    return map;
  }, [drawerData?.value]);

  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLevelLoading || !levels?.data) return;

    const initialFormData = {};
    const initialValidData = {};

    levels.data.forEach((level) => {
      const existingValue = initialDataMap[level.id] ?? null;
      initialFormData[level.id] = existingValue;
      initialValidData[level.id] = existingValue !== null && existingValue !== "";
    });

    setFormData(initialFormData);
    setIsValid(initialValidData);
  }, [isLevelLoading, levels?.data, initialDataMap]);

  const handleChange = (field, value, setter) => {
    setError(null);
    setter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    setError(null);

    const levelList = Array.isArray(levels?.data) ? levels.data : [];

    const hasEmptyFields = levelList.some((l) => {
      const val = formData[l.id];
      return val === null || val === undefined || String(val).trim() === "";
    });

    if (hasEmptyFields) {
      setError("Please enter a resit fee for all listed levels before saving.");
      return;
    }

    const hasInvalidFields = levelList.some((l) => isValid[l.id] === false);

    if (hasInvalidFields) {
      setError("Please fix all input errors before saving.");
      return;
    }

    const isUnchanged = levelList.every((l) => {
      const initialVal = initialDataMap[l.id] ?? null;
      const currentVal = formData[l.id] ?? null;
      return String(initialVal) === String(currentVal);
    });

    if (isUnchanged) {
      setError(
        "You haven't made any changes yet. Please update at least one level fee to save."
      );
      return;
    }

    const payload = levelList.map((l) => ({
      level_id: l.id,
      fee: Number(formData[l.id]),
    }));

    updateSetting({
      payload: {
        setting_id: drawerData?.id,
        value: payload,
      },
    });
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 font-size-sm p-2">
        <span className="fw-medium">Level Resit Billing Settings</span>
        <button
          type="button"
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={handleClose}
          style={{
            width: "2rem",
            height: "2rem",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="drawer-content pt-3 font-size-sm px-2">
        {error && (
          <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-3">
            <p className="m-0">{error}</p>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {isLevelLoading ? (
            [...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))
          ) : levelError ? (
            <NotFoundError
              title={
                levelError?.response?.data?.errors?.title ?? "An Error Occurred"
              }
              description={
                levelError?.response?.data?.errors?.description ??
                "Unable to load levels."
              }
            />
          ) : (
            levels?.data?.map((l) => (
              <Fragment key={l.id}>
                <div className="d-flex flex-column gap-1">
                  <span className="fw-medium">{l?.name} Resit Fee</span>
                  <NumberInput
                    placeholder={"E.g 2000, 4000, 5000"}
                    value={formData[l?.id] ?? ""}
                    onChange={(value) =>
                      handleChange(l?.id, value, setFormData)
                    }
                    onValidationChange={(valid) =>
                      handleChange(l?.id, valid, setIsValid)
                    }
                    validationSchema={numberSchema({
                      min: 1,
                      max: 500000,
                      required: true,
                      integerOnly: false,
                      messages: {
                        required: `Please enter a resit fee for ${l?.name}`,
                        min: `${l?.name} Resit Fee must be at least 1 ${currency}`,
                        max: `${l?.name} Resit Fee must not exceed 500,000 ${currency}`,
                      },
                    })}
                  />
                </div>
              </Fragment>
            ))
          )}
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none p-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 bg-primary-500 text-white font-size-sm px-3 py-2"
              onClick={handleUpdate}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LevelResitBillingFeeSetting;