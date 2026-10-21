import { AlertCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
   addressSchema,
   dateTimeRangeValidationSchema,
   textareaSchema,
   titleSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import {
   DateTimeRangeInput,
   TextAreaInput,
   TextInput,
} from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetGraduationBatchDetails } from "../../hooks/graduationBatch/useGetGraduationBatchDetails";
import { useUpdateGraduationBatch } from "../../hooks/graduationBatch/useUpdateGraduationBatch";

function UpdateGraduationBatch({ drawerData = {}, handleClose = () => {} }) {
  const batchId = drawerData?.id;
  const {
    data: details,
    isLoading,
    error,
  } = useGetGraduationBatchDetails(batchId);

  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    graduation_start_date: "",
    graduation_end_date: "",
    description: "",
    name: "",
    location: "",
  });
  const [isValid, setIsValid] = useState({
    graduation_start_date: null,
    graduation_end_date: null,
    description: null,
    name: null,
    location: null,
  });

  const { mutate: updateBatch, isPending = false } =
    useUpdateGraduationBatch(handleClose) || {};

  const handleStateChange = useCallback((field, value, stateFn) => {
    if (typeof stateFn === "function") {
      stateFn((prev) => ({ ...prev, [field]: value }));
    }
    setSubmitError(null);
  }, []);

  useEffect(() => {
    if (!isLoading && details?.data) {
      setFormData((prev) => ({
        ...prev,
        graduation_start_date: details?.data?.graduation_start_date ?? "",
        graduation_end_date: details?.data?.graduation_end_date ?? "",
        description: details?.data?.description ?? "",
        name: details?.data?.name ?? "",
        location: details?.data?.location ?? "",
      }));
    }
  }, [isLoading, details?.data]);

  const handleUpdateBatch = async () => {
    try {
      if (!batchId) {
        setSubmitError("Invalid batch selected. Unable to process update.");
        return;
      }

      const hasInvalidField = Object.values(isValid).some(
        (status) => status === false
      );

      if (hasInvalidField) {
        setSubmitError("Please correct the highlighted errors before submitting.");
        return;
      }

      if (typeof updateBatch === "function") {
        const payload = {
          batch_id: batchId,
          name: formData?.name?.trim() || "",
          graduation_start_date: formData?.graduation_start_date || null,
          graduation_end_date: formData?.graduation_end_date || null,
          location: formData?.location?.trim() || "",
          description: formData?.description?.trim() || "",
        };
        updateBatch({payload, batchId});
      }
    } catch {
      setSubmitError("An unexpected error occurred while updating the graduation batch. Please try again.");
    }
  };

  return (
    <>
      <div className="drawer-content px-2 pt-3 font-size-sm">
        {submitError && (
          <div className="bg-red-100 p-3 rounded-3 text-red-700 mb-3 d-flex align-items-center gap-2 border border-red-200">
            <AlertCircle size={18} className="flex-shrink-0" />
            <p className="m-0 font-size-sm fw-medium">{submitError}</p>
          </div>
        )}

        {isLoading ? (
          <RectangleSkeleton />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title || "Graduation Batch Not Found"}
            description={
              error?.response?.data?.errors?.description ||
              "Unable to load graduation batch details. Please try again."
            }
          />
        ) : (
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">Title</span>
              <TextInput
                onChange={(value) =>
                  handleStateChange("name", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("name", value, setIsValid)
                }
                value={formData?.name || ""}
                validationSchema={titleSchema?.({
                  required: false,
                  min: 3,
                  max: 150,
                  messages: {
                    max: "Graduation Batch Title must not exceed 150 characters",
                    min: "Graduation Batch Title must be at least 3 characters long",
                  },
                })}
                placeholder={"E.g. Class of 2026"}
              />
            </div>

            <DateTimeRangeInput
              startValue={formData?.graduation_start_date || ""}
              endValue={formData?.graduation_end_date || ""}
              onStartDateTimeChange={(value) =>
                handleStateChange("graduation_start_date", value, setFormData)
              }
              onEndDateTimeChange={(value) =>
                handleStateChange("graduation_end_date", value, setFormData)
              }
              onStartDateTimeValidationChange={(value) =>
                handleStateChange("graduation_start_date", value, setIsValid)
              }
              onEndDateTimeValidationChange={(value) =>
                handleStateChange("graduation_end_date", value, setIsValid)
              }
              validationSchema={dateTimeRangeValidationSchema?.({
                required: false,
                futureOrNow: true,
                messages: {
                  startRequired: "Event start time required",
                  endRequired: "Event end time required",
                },
              })}
            />

            <div className="d-flex flex-column gap-1">
              <label htmlFor="location" className="fw-medium">
                Location
              </label>
              <TextInput
                type={"address"}
                onChange={(value) =>
                  handleStateChange("location", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("location", value, setIsValid)
                }
                value={formData?.location || ""}
                validationSchema={addressSchema?.({
                  required: false,
                  min: 3,
                  max: 150,
                  messages: {
                    max: "Location must not exceed 150 characters",
                    min: "Location must be at least 3 characters long",
                  },
                })}
                placeholder={"E.g. EXHIST Hall"}
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">Graduation Batch Description</span>
              <TextAreaInput
                onChange={(value) =>
                  handleStateChange("description", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("description", value, setIsValid)
                }
                value={formData?.description || ""}
                placeholder={"Add Graduation Batch Description"}
                validationSchema={textareaSchema?.({
                  required: false,
                })}
                optional={true}
              />
            </div>
          </div>
        )}
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none cursor-pointer"
              onClick={() => handleClose?.()}
              disabled={isPending}
            >
              Close
            </button>
            <button
              type="button"
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={handleUpdateBatch}
              disabled={isPending || isLoading}
            >
              {isPending ? <SingleSpinner /> : "Update Graduation Batch"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateGraduationBatch;