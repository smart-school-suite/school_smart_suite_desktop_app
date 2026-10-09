import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateResitExam } from "../../hooks/resitExam/useUpdateResitExam";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import { useState } from "react";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function UpdateResitExam({ drawerData, handleClose }) {
  const { id: examId } = drawerData;
  const [isValid, setIsValid] = useState({
    start_date: null,
    end_date: null,
    max_score: null,
  });
  const [formData, setFormData] = useState({
    start_date: drawerData?.start_date ?? "",
    end_date: drawerData?.end_date ?? "",
    max_score: drawerData?.max_score ?? "",
  });
  const { mutate: updateExam, isPending } = useUpdateResitExam(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleExamUpdate = async () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />,
      );
      return;
    }
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );

    updateExam({ resitExamId: examId, updateData: cleanedFormData });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-2">
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
              handleStateChange("max_score", value, setFormData)
            }
            value={formData.max_score}
            onValidationChange={(value) =>
              handleStateChange("max_score", value, setIsValid)
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
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleExamUpdate()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Resit Exam"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateResitExam;
