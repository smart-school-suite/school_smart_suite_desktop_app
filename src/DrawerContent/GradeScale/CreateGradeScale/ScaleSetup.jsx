import { NumberInput } from "../../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { useRef, useState } from "react";
import ToastDanger from "../../../components/Toast/ToastDanger";
import ToastSuccess from "../../../components/Toast/ToastSuccess";
import ToastWarning from "../../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import { allFieldsValid } from "../../../utils/functions";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { useSelector, useDispatch } from "react-redux";
import {
  updatedGradeContext,
  resetScaleState,
} from "../../../Slices/academics/gradeScaleSlice";
import {  X } from "lucide-react";
function ScaleSetup({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.gradeScale.gradeScale);

  const scoreRef = useRef();
  const [formData, setFormData] = useState({
    score: drawerData?.max_score ?? "",
  });
  const [isValid, setIsValid] = useState({
    score: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const score = await scoreRef.current.triggerValidation();
    return {
      score,
    };
  };
  const handleNext = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    dispatch(
      updatedGradeContext({
        field: "category",
        data: { drawerData },
        maxScore: formData.score,
      }),
    );
    nextStep();
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Grade Scale Configuration</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            handleClose();
            dispatch(resetScaleState());
          }}
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
      <div className="drawer-content px-2 font-size-sm pt-2">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-end">
            <span className="text-end fw-medium text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
          </div>
          <span className="w-50">
            Set the maximum score for this grading scale. The predefined grades
            will be configured against this score.
          </span>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center gap-1">
              <span className="fw-semibold">Maximum score</span> (
              <small className="muted fw-normal">
                Lowest possible score is zero
              </small>
              )
            </div>
            <NumberInput
              ref={scoreRef}
              placeholder={"Enter Maximum Score"}
              onChange={(value) =>
                handleStateChange("score", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("score", value, setIsValid)
              }
              validationSchema={numberSchema({
                min: 1,
                max: 1000,
                required: true,
                messages: {
                  max: `Maximum Score Must Not Exceed 1000`,
                  min: `Maximum Score Must Be Atleast 1`,
                  required: "Maximum Score Required",
                },
              })}
              step={"0.1"}
              value={formData.score}
            />
          </div>
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
              onClick={() => handleNext()}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ScaleSetup;
