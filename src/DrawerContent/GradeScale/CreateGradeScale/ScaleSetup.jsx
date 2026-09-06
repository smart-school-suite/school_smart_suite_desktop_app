import { NumberInput } from "../../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { useRef, useState } from "react";
import ToastDanger from "../../../components/Toast/ToastDanger";
import ToastSuccess from "../../../components/Toast/ToastSuccess";
import ToastWarning from "../../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { allFieldsValid } from "../../../utils/functions";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import {
  updatedGradeContext,
  resetScaleState,
} from "../../../Slices/academics/gradeScaleSlice";
import { X, Scale, Dot, Sparkles, Cog, CircleCheck, Check } from "lucide-react";
function ScaleSetup({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const moduleState = useSelector((state) => state.gradeScale.gradeScale);
  const scoreRef = useRef();
  const [formData, setFormData] = useState({
    score: drawerData?.max_score ?? "",
    gen_type: "automatic",
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
        configType: formData.gen_type,
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
            queryClient.invalidateQueries({
              queryKey: [
                "grade-scale-category",
                moduleState.drawerData.id,
              ],
            });
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
        <div className="d-flex flex-column gap-5">
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                style={{ height: "2.5rem", width: "2.5rem" }}
              >
                <Scale size={16} />
              </div>
              <div className="d-flex flex-column">
                <small className="text-muted">Category</small>
                <div className="d-flex flex-row align-items-center gap-1">
                  <span className="fw-semibold font-size-md">
                    {drawerData.grade_title}
                  </span>
                  <Dot size={16} />
                  <span className="fw-semibold font-size-md text-capitalize">
                    {drawerData.exam_type}
                  </span>
                  {formData.score && (
                    <>
                      <Dot size={16} />
                      <span className="fw-semibold font-size-md text-capitalize">
                        {formData.score}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <span className="text-end fw-medium text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="fw-medium">
              How would you like to configure this scale?
            </span>
            <div className="d-flex flex-row align-items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card p-2 rounded-4 transition-all
                   d-flex flex-column gap-3 pointer-cursor w-50
                  ${
                    formData.gen_type === "automatic"
                      ? "shadow-fern-100-lg border-fern-300"
                      : "border-none border shadow-sm"
                  } `}
                onClick={() => {
                  handleStateChange("gen_type", "automatic", setFormData);
                }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-1">
                    <Sparkles size={16} />
                    <span className="fw-semibold">Generate automatically</span>
                  </div>
                  <AnimatePresence>
                    {formData.gen_type === "automatic" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <CircleCheck size={16} className="green-color" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-muted">
                  Create a grade scale based on your maximum score. You can
                  review and customize it before saving.
                </p>
                <small className="text-muted">Recommended</small>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card p-2 rounded-4 transition-all w-50
                   d-flex flex-column gap-3 pointer-cursor 
                  ${
                    formData.gen_type === "manual"
                      ? "shadow-fern-100-lg border-fern-300"
                      : "border-none border shadow-sm"
                  } `}
                onClick={() => {
                  handleStateChange("gen_type", "manual", setFormData);
                }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-1">
                    <Cog size={16} />
                    <span className="fw-semibold">Configure manually</span>
                  </div>
                  <AnimatePresence>
                    {formData.gen_type === "manual" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <CircleCheck size={16} className="green-color" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-muted">
                  Set the score ranges, grade points, and other values yourself.
                </p>
                <small className="text-muted">Custom build</small>
              </motion.div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center gap-1">
              <span className="fw-medium">Maximum score</span>
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
