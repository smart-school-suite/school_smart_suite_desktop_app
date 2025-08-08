import { Icon } from "@iconify/react";
import { useEffect } from "react";
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
function SubcriptionPlan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData)
  const { userInput, calculatedCost, ranges } = useSelector(
    (state) => state.pricing
  );
  const { handleSubscription, loading } = useAuth();
  const { data: data, isLoading, isError, error } = useGetSubscriptonRates();

  const handleSubcription = async (billing_type) => {
    await handleSubscription(navigate, {
      school_branch_name: schoolCredentials.school_branch_name,
      school_name: schoolCredentials.school_name,
      country_id: schoolCredentials.country_id,
      type: schoolCredentials.type,
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
      <div className="container height-100 w-100 d-flex flex-column pb-5">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img
              src="/logo/blue_logo.png"
              alt=""
              className="signup-app-logo"
            />
          </div>
          <div className="d-flex flex-row gap-4">
            <button className="border-none rounded-pill px-3 py-2 border bg-white font-size-sm">
              Save And Exit
            </button>
            <button className="border-none rounded-pill px-3 py-2 border bg-white  font-size-sm">
              Questions?
            </button>
          </div>
        </div>
        <h4 className="text-center">Choose The Best Plan For Your School</h4>
        <div className="mb-3 d-flex flex-row justify-content-center">
          <div className="w-75">
            <span className="font-size-sm mb-2">Number of students</span>
            <input
              type="number"
              className="form-control w-100"
              placeholder="10, 20, 30"
              min={ranges[0]?.min || 0}
              max={ranges[ranges.length - 1]?.max || 100}
              value={userInput.students < 0 ? null : userInput.students}
              onChange={(e) =>
                dispatch(setUserInput({ students: +e.target.value }))
              }
            />
          </div>
        </div>
        <div className="d-flex gap-3  flex-row justify-content-center">
          <div className=" card  rounded-4 d-flex flex-column p-2" style={{ width: "25%", height:"60dvh" }}>
              <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                 <span className="fw-semibold fs-lg">Yearly</span>
                 <button className="border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2">
                   <span><Icon icon="streamline-plump:trending-content-solid" /></span>
                   <span>Most Popular</span>
                 </button>
              </div>
              <div>
                <p className="font-size-xs gainsboro-color mt-3"
                >Save more with a yearly plan — enjoy discounted rates, seamless management, and peace of mind for the entire school year!
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
              <span className="font-size-sm mt-2 mb-2 pb-1"
               style={{ borderBottom:"1px solid #f5f5f5" }}
              ></span>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>School Adminstrators</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>Teachers</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>Parents</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Unlimited Emails</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Unlimited SMS</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Physical Support</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Pro Features</span>
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
          <div className=" card p-2 rounded-4 d-flex flex-column" style={{ width: "25%", height:"60dvh" }}>
             <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                 <span className="fw-semibold fs-lg">Monthly</span>
                 <button className="border-none rounded-pill font-size-xs py-1 px-2 d-flex gap-2">
                   <span><Icon icon="streamline-plump:trending-content-solid" /></span>
                   <span>Less Popular</span>
                 </button>
              </div>
              <div>
                <p className="font-size-xs gainsboro-color mt-3"
                >Save more with a yearly plan — enjoy discounted rates, seamless management, and peace of mind for the entire school year!
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
              <span className="font-size-sm mt-2 mb-2 pb-1"
               style={{ borderBottom:"1px solid #f5f5f5" }}
              ></span>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>School Adminstrators</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>Teachers</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between font-size-sm my-2">
                <span>Parents</span>
                <span>100</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Unlimited Emails</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Unlimited SMS</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Physical Support</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Pro Features</span>
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
          <div className=" card p-2 rounded-4 d-flex flex-column" style={{ width: "25%", height:"60dvh" }}>
              <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                 <span className="fw-semibold fs-lg">Custom Plan</span>
              </div>
              <div>
                <p className="font-size-xs gainsboro-color mt-3"
                >Perfect For Very Large Scale Uses
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
              <span className="font-size-sm mt-2 mb-2 pb-1"
               style={{ borderBottom:"1px solid #f5f5f5" }}
              ></span>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Custom Number Of Teachers</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Custom Number Of Administrators</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Custom Number Of Students</span>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-start font-size-sm gap-2 my-2">
                <span><Icon icon="jam:check" className="green-color"/></span>
                <span>Custom Features</span>
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
                          animate={{ width:"100%" }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="auth-progress-bar">
                       <motion.div
                          className="primary-background h-100"
                          initial={{ width: 0 }}
                          animate={{ width:`${progressPercentage}%` }}
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
