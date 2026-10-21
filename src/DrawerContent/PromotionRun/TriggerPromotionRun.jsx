import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarClock,
  Circle,
  Dot,
  GraduationCap,
  Info,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { dateTimeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { DateTimeInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useTriggerPromotionRun } from "../../hooks/promotionRun/useTriggerPromotionRun";
import { allFieldsValid } from "../../utils/functions";

function TriggerPromotionRun({ drawerData = {}, handleClose = () => {} }) {
  const { mutate: triggerPromotionRun, isPending = false } =
    useTriggerPromotionRun(handleClose) || {};

  const publishedAtRef = useRef(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: "active",
    published_at: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    status: null,
    published_at: null,
  });

  const handlePrevalidation = async () => {
    try {
      const publishedAt = await publishedAtRef.current?.triggerValidation;
      return { publishedAt };
    } catch {
      return { publishedAt: false };
    }
  };

  const handleStateChange = (field, value, stateFn) => {
    if (typeof stateFn === "function") {
      stateFn((prev) => ({ ...prev, [field]: value }));
    }
    if (error !== null) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData?.status) {
        setError("Please select an execution method before proceeding.");
        return;
      }

      if (formData.status === "scheduled") {
        const prevalidation = await handlePrevalidation();
        const isPrevalid = allFieldsValid?.(prevalidation) ?? true;
        const isFieldValidState = allFieldsValid?.(isFieldValid) ?? true;

        if (!formData.published_at) {
          setError("Please select a date and time for the scheduled promotion run.");
          return;
        }

        if (!isPrevalid || !isFieldValidState) {
          setError(
            "The selected publication date and time is invalid. Please check and try again."
          );
          return;
        }
      }

      if (typeof triggerPromotionRun === "function") {
        triggerPromotionRun({
          status: formData.status,
          initiated_at: formData.published_at || null,
          promotion_run_id: drawerData?.id
        });
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const getButtonText = () => {
    if (isPending) return <SingleSpinner />;
    if (formData?.status === "active") return "Run Promotion Now";
    if (formData?.status === "scheduled") return "Schedule Promotion Run";
    return "Trigger Promotion Run";
  };

  return (
    <>
      <div className="px-2 font-size-sm pt-2 mb-4">
        <div className="d-flex flex-column gap-2">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-red-100 p-3 rounded-3 text-red-700 mb-2 d-flex align-items-center gap-2 border border-red-200">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <p className="m-0 font-size-sm fw-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
              style={{ height: "2.5rem", width: "2.5rem" }}
            >
              <GraduationCap size={20} strokeWidth={1.5} />
            </div>
            <div className="d-flex flex-column">
              <span className="fw-medium">
                {drawerData?.specialty || "General"} Promotion Run
              </span>
              <div className="d-flex flex-row align-items-center gap-1 text-iron-500 fw-normal">
                <span>
                  {drawerData?.level_name || "N/A"}{" "}
                  {drawerData?.level ? `(${drawerData.level})` : ""}
                </span>
                <Dot size={16} />
                <span>{drawerData?.academic_year || "N/A"}</span>
                <Dot size={16} />
                <span>{drawerData?.department || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-content ps-2 font-size-sm">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column">
              <span className="fw-medium">Execution method</span>
              <span className="fw-light">
                How would you like to start this promotion run?
              </span>
            </div>
            <div className="d-flex flex-column gap-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`card rounded-3 p-2 cursor-pointer transition-all
                  ${
                    formData?.status === "active"
                      ? "border-1 border-primary-500 bg-primary-100 text-primary-500 shadow-sm"
                      : "border-none border bg-white"
                  }
                `}
                onClick={() =>
                  handleStateChange("status", "active", setFormData)
                }
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <div
                      className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 border"
                      style={{ height: "2.5rem", width: "2.5rem" }}
                    >
                      <Zap size={20} strokeWidth={1.5} />
                    </div>
                    <div className="d-flex flex-column">
                      <span>Run immediately</span>
                      <span className="fw-light">
                        Start evaluation and promotion processing now.
                      </span>
                    </div>
                  </div>
                  {formData?.status === "active" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Icon
                        icon="akar-icons:circle-check-fill"
                        width={24}
                        height={24}
                      />
                    </motion.div>
                  ) : (
                    <Circle size={24} strokeWidth={1.5} color="#ccc" />
                  )}
                </div>
              </motion.div>

              <div className="d-flex flex-column gap-2">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`card rounded-3 p-2 cursor-pointer transition-all
                    ${
                      formData?.status === "scheduled"
                        ? "border-1 border-primary-500 bg-primary-100 text-primary-500 shadow-sm"
                        : "border-none border bg-white"
                    }
                  `}
                  onClick={() =>
                    handleStateChange("status", "scheduled", setFormData)
                  }
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <div
                        className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 border"
                        style={{ height: "2.5rem", width: "2.5rem" }}
                      >
                        <CalendarClock size={20} strokeWidth={1.5} />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">Schedule for later</span>
                        <span className="text-iron-500 fw-light">
                          Set a future date and time for execution.
                        </span>
                      </div>
                    </div>
                    {formData?.status === "scheduled" ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Icon
                          icon="akar-icons:circle-check-fill"
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    ) : (
                      <Circle size={24} strokeWidth={1.5} color="#ccc" />
                    )}
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {formData?.status === "scheduled" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="d-flex flex-column gap-1 pt-2">
                        <span>Publication Date & Time</span>
                        <DateTimeInput
                          onChange={(value) =>
                            handleStateChange(
                              "published_at",
                              value,
                              setFormData
                            )
                          }
                          onValidationChange={(value) =>
                            handleStateChange(
                              "published_at",
                              value,
                              setFieldValid
                            )
                          }
                          value={formData?.published_at || ""}
                          validationSchema={dateTimeValidationSchema?.({
                            required: true,
                            futureOrToday: true,
                            messages: {
                              required:
                                "Publication date and time are required for scheduled promotions.",
                            },
                          })}
                          ref={publishedAtRef}
                        />
                        <div className="d-flex flex-row align-items-center gap-1 text-iron-500">
                          <Info size={16} />
                          <span className="fw-light">
                            The run will be queued for the selected date and time
                            using the school's configured time zone.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.4} />

          <div className="d-flex flex-column gap-2">
            <span className="fw-medium">Promotion scope</span>
            <div className="card border-none border rounded-4 p-2">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-light text-iron-500">Academic Year</span>
                  <span className="fw-medium">
                    {drawerData?.academic_year || "N/A"}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-light text-iron-500">
                    Processing order
                  </span>
                  <span className="fw-medium">Highest level first</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-light text-iron-500">
                    Promotion rules
                  </span>
                  <span className="fw-medium">Configured rules</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <Info size={16} />
              <span className="fw-light">
                The system evaluates students against configured rules. Students
                who need an administrative decision can be flagged for review.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-2 px-2">
            <button
              type="button"
              className="border-none bg-none cursor-pointer"
              onClick={() => handleClose?.()}
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: isPending ? 1 : 1.02 }}
              whileTap={{ scale: isPending ? 1 : 0.98 }}
              type="button"
              disabled={isPending}
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={handleSubmit}
            >
              {getButtonText()}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TriggerPromotionRun;