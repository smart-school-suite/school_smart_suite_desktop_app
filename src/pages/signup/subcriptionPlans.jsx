import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInput,
  setRates,
} from "../../Slices/Asynslices/subcriptionPricingSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import NumberFlow from "@number-flow/react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSubscriptonRates } from "../../hooks/subscription/useGetSubscriptionRate";
import { motion, AnimatePresence } from "framer-motion";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function SubcriptionPlan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentNumberRef = useRef();
  const [isValid, setIsValid] = useState({
    student_number: null,
  });
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { userInput, calculatedCost, ranges } = useSelector(
    (state) => state.pricing
  );
  const { handleSubscription, loading } = useAuth();
  const { data: data, isLoading, isError, error } = useGetSubscriptonRates();

  const handlePrevalidation = async () => {
    const studentNumber = await studentNumberRef.current.triggerValidation();
    return {
      studentNumber,
    };
  };
  const handleErrorChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubcription = async (billing_type) => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
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
        />
      );
      return;
    }
    await handleSubscription(navigate, {
      school_branch_name: schoolCredentials.school_branch_name,
      school_name: schoolCredentials.school_name,
      country_id: schoolCredentials.country_id.id,
      type: schoolCredentials.type.name.toLowerCase(),
      abbreviation: schoolCredentials.abbreviation,
      rates_card_id: calculatedCost.activeRateId,
      billing_frequency: billing_type,
      num_students: Number(userInput.students),
    });
  };
  useEffect(() => {
    if (data) {
      dispatch(setRates(data.data));
    }
  }, [data, dispatch]);

  const isStepComplete = userInput.students > 0;
  const progressPercentage = isStepComplete ? 100 : 0;
  if (isLoading) return <Pageloaderspinner />;
  if (isError)
    return (
      <div className="alert alert-warning">
        Error: {error?.data?.message || "Failed to fetch rates"}
      </div>
    );
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } container w-100 height-100 pt-3 d-flex flex-column pb-5`}
      >
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img src="/logo/blue_logo.png" alt="" className="signup-app-logo" />
          </div>
          <div className="d-flex flex-row gap-4">
            <button
              className={`${
                darkMode
                  ? "dark-bg-light dark-mode-text border-none"
                  : "bg-white border"
              }  rounded-pill px-3 py-2  font-size-sm`}
            >
              Save And Exit
            </button>
            <button
              className={`${
                darkMode
                  ? "dark-bg-light dark-mode-text border-none"
                  : "bg-white border"
              }  rounded-pill px-3 py-2  font-size-sm`}
            >
              Questions?
            </button>
          </div>
        </div>
        <h4 className="text-center">Choose The Best Plan For Your School</h4>
        <div className="mb-3 d-flex flex-row justify-content-center">
          <div className="w-75">
            <label className="font-size-sm">Number of students</label>
            <NumberInput
              placeholder={"Enter Number of Students"}
              validationSchema={numberSchema({
                min: 1,
                max: 100000,
                required: true,
                integerOnly: true,
                messages: {
                  required: "Number of students required",
                  min: "Minimum Number of students must be atleast 1",
                  max: "Students Must not exceed 100000",
                },
              })}
              onChange={(value) =>
                dispatch(setUserInput({ students: Number(value) }))
              }
              value={userInput.students < 0 ? null : userInput.students}
              onValidationChange={(value) =>
                handleErrorChange("student_number", value, setIsValid)
              }
              ref={studentNumberRef}
            />
          </div>
        </div>
        <div className="d-flex gap-3  flex-row justify-content-center">
          <div
            className={`${
              darkMode
                ? "card  rounded-4 d-flex flex-column p-2 dark-bg dark-mode-text dark-mode-border"
                : "card rounded-4 d-flex flex-column p-2"
            }`}
            style={{ width: "25%", height: "55dvh" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center mt-2">
              <span className="fw-semibold fs-lg">Yearly</span>
              <button
                className={`${
                  darkMode ? "dark-bg-light text-white" : null
                } border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2`}
              >
                <span>
                  <Icon icon="streamline-plump:trending-content-solid" />
                </span>
                <span>Most Popular</span>
              </button>
            </div>
            <div>
              <p className="font-size-xs gainsboro-color mt-3">
                Save more with a yearly plan — enjoy discounted rates, seamless
                management, and peace of mind for the entire school year!
              </p>
            </div>
            <div>
              <h1 className="mt-2 fw-bold" style={{ fontSize: "1.4rem" }}>
                XAF <NumberFlow value={calculatedCost.yearlyCost.toFixed(2)} />
                <span className="font-size-sm gainsboro-color fw-medium ms-1 p-0">
                  /Year
                </span>
              </h1>
            </div>
            <span
              className="font-size-sm my-2 pb-1"
              style={{
                borderBottom: `${
                  darkMode ? "1px solid #333" : "1px solid #f5f5f5"
                }`,
              }}
            ></span>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>School Adminstrators</span>
                  <span>100</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>Teachers</span>
                  <span>100</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>Parents</span>
                  <span>100</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Unlimited Emails</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Unlimited SMS</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 ">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Physical Support</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Pro Features</span>
                </div>
              </div>
            </div>
            <div className="w-100 mt-auto">
              <button
                className="border-none p-2 w-100 rounded-3 primary-background text-white font-size-sm"
                onClick={() => {
                  handleSubcription("yearly");
                }}
                disabled={loading.subscribe || !isStepComplete}
              >
                {loading.subscribe ? <SingleSpinner /> : "Pick Plan"}
              </button>
            </div>
          </div>
          <div
            className={`${
              darkMode
                ? "card  rounded-4 d-flex flex-column p-2 dark-bg dark-mode-text dark-mode-border"
                : "card rounded-4 d-flex flex-column p-2"
            }`}
            style={{ width: "25%", height: "55dvh" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center mt-2">
              <span className="fw-semibold fs-lg">Monthly</span>
              <button
                className={`${
                  darkMode ? "dark-bg-light text-white" : null
                } border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2`}
              >
                <span>
                  <Icon icon="streamline-plump:trending-content-solid" />
                </span>
                <span>Less Popular</span>
              </button>
            </div>
            <div>
              <p className="font-size-xs gainsboro-color mt-3">
                Save more with a yearly plan — enjoy discounted rates, seamless
                management, and peace of mind for the entire school year!
              </p>
            </div>
            <div>
              <h1 className="mt-2 fw-bold" style={{ fontSize: "1.4rem" }}>
                XAF <NumberFlow value={calculatedCost.monthlyCost.toFixed(2)} />
                <span className="font-size-sm gainsboro-color fw-medium ms-1 p-0">
                  /Month
                </span>
              </h1>
            </div>
            <span
              className="font-size-sm mt-2 mb-2 pb-1"
              style={{
                borderBottom: `${
                  darkMode ? "1px solid #333" : "1px solid #f5f5f5"
                }`,
              }}
            ></span>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>School Adminstrators</span>
                  <span>100</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>Teachers</span>
                  <span>100</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
                  <span>Parents</span>
                  <span>100</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Unlimited Emails</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Unlimited SMS</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Physical Support</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                  <span>
                    <Icon icon="jam:check" className="green-color" />
                  </span>
                  <span>Pro Features</span>
                </div>
              </div>
            </div>
            <div className="w-100 mt-auto">
              <button
                className="border-none p-2 w-100 rounded-3 font-size-sm"
                onClick={() => {
                  handleSubcription("monthly");
                }}
                disabled={loading.subscribe || !isStepComplete}
              >
                {loading.subscribe ? <SingleSpinner /> : "Pick Plan"}
              </button>
            </div>
          </div>
          <div
            className={`${
              darkMode
                ? "card  rounded-4 d-flex flex-column p-2 dark-bg dark-mode-text dark-mode-border"
                : "card rounded-4 d-flex flex-column p-2"
            }`}
            style={{ width: "25%", height: "55dvh" }}
          >
            <div className="d-flex flex-row justify-content-between align-items-center mt-2">
              <span className="fw-semibold fs-lg">Custom Plan</span>
            </div>
            <div>
              <p className="font-size-xs gainsboro-color mt-3">
                Perfect For Very Large Scale Uses
              </p>
            </div>
            <div>
              <h1 className="mt-2 fw-bold" style={{ fontSize: "2.5rem" }}>
                ??
                <span className="font-size-sm gainsboro-color fw-medium ms-1 p-0">
                  /Month
                </span>
              </h1>
            </div>
            <span
              className="font-size-sm my-2"
              style={{
                borderBottom: `${
                  darkMode ? "1px solid #333" : "1px solid #f5f5f5"
                }`,
              }}
            ></span>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                <span>
                  <Icon icon="jam:check" className="green-color" />
                </span>
                <span>Custom Number Of Teachers</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                <span>
                  <Icon icon="jam:check" className="green-color" />
                </span>
                <span>Custom Number Of Administrators</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                <span>
                  <Icon icon="jam:check" className="green-color" />
                </span>
                <span>Custom Number Of Students</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2">
                <span>
                  <Icon icon="jam:check" className="green-color" />
                </span>
                <span>Custom Features</span>
              </div>
            </div>
            <div className="w-100 mt-auto">
              <button
                className="border-none p-2 w-100 rounded-3 font-size-sm"
                disabled={loading.subscribe}
              >
                {loading.subscribe ? <SingleSpinner /> : "Contact Sales"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto w-100 px-3">
          <div className="mb-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <AnimatePresence mode="wait">
                {isStepComplete ? (
                  <div className="d-flex flex-row align-items-center gap-2">
                    <motion.span
                      key="completed"
                      className="font-size-sm"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      Step 3 of 4 Completed
                    </motion.span>
                    <Icon
                      icon="icon-park-solid:check-one"
                      className={`font-size-md ${
                        isStepComplete ? "green-color" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <motion.span
                    key="incomplete"
                    className="font-size-sm"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Step 3 of 4 Incomplete
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center w-100">
            <div className="w-100 d-flex flex-row align-items-center gap-2">
              <div className="auth-progress-bar">
                <motion.div
                  className="primary-background h-100"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="auth-progress-bar">
                <motion.div
                  className="primary-background h-100"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="auth-progress-bar">
                <motion.div
                  className="primary-background h-100"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="auth-progress-bar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SubcriptionPlan;
