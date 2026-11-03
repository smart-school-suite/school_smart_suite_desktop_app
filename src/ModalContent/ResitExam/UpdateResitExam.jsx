import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateResitExam } from "../../hooks/resitExam/useUpdateResitExam";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateResitExam({ handleClose, rowData }) {
  const { id: examId } = rowData;
  const [isValid, setIsValid] = useState({
    start_date: null,
    end_date: null,
    weighted_mark: null,
  });
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    weighted_mark: "",
    school_year: "",
  });
  const [errors, setErrors] = useState({
    school_year: "",
  });
  const { mutate: updateExam, isPending } = useUpdateResitExam(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Resit Exam");
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleExamUpdate = async () => {
    if (optionalValidateObject(isValid) == false) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
      return;
    }
    clearFormError();
    updateExam({ resitExamId: examId, updateData: formData }, { onError: handleServerError });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Resit Exam</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
      </div>
      <DateRangeInput
        validationSchema={dateRangeValidationSchema({
          futureOnly: true,
          optional: true,
        })}
        onStartDateChange={(value) =>
          handleStateChange("start_date", value, setFormData)
        }
        onEndDateChange={(value) =>
          handleStateChange("end_date", value, setFormData)
        }
        onStartDateValidationChange={(value) =>
          handleStateChange("start_date", value, setIsValid)
        }
        onEndDateValidationChange={(value) =>
          handleStateChange("end_date", value, setIsValid)
        }
        startValue={formData.start_date}
        endValue={formData.end_date}
      />
      <div>
        <label htmlFor="weightedMark" className="font-size-sm">
          Exam Score
        </label>
        <NumberInput
          onChange={(value) =>
            handleStateChange("weighted_mark", value, setFormData)
          }
          value={formData.weighted_mark}
          onValidationChange={(value) =>
            handleStateChange("weighted_mark", value, setIsValid)
          }
          step={"0.01"}
          placeholder={"e.g 100"}
          validationSchema={numberSchema({
            required: false,
            min: 1,
            max: 500,
            messages: {
              min: "Exam Score must be greater than 0",
              max: "Exam Score must be less than 500",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="schoolYear" className="font-size-sm">
          School Year
        </label>
        <SchoolYearSelector
          onSelect={(value) =>
            handleStateChange("school_year", value, setFormData)
          }
          onError={(msg) => handleStateChange("school_year", msg, setErrors)}
          error={errors.school_year}
        />
      </div>
      <FormErrorBanner
        ref={errorBannerRef}
        error={formError}
        onDismiss={clearFormError}
        className="mb-2"
      />
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 mt-2">
        <button
          disabled={isPending}
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleExamUpdate();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Exam"}
        </button>
      </div>
    </>
  );
}
export default UpdateResitExam;
