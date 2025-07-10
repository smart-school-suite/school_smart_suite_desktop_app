import {
  useActivateCourseMutation,
  useDeactivateCourseMutation,
} from "../../Slices/Asynslices/postSlice";
import { useFetchCourseDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, {SingleSpinner} from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
function DeactivateCourse({ handleClose, row_id: courseId }) {
  const { data: courseDetails, isLoading } = useFetchCourseDetailsQuery({
    course_id: courseId,
  });
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [deactivateCourse] = useDeactivateCourseMutation();
  const [activateCourse] = useActivateCourseMutation();
  const [isChangesMade, setIsChangesMade] = useState(false);
  useEffect(() => {
    if (courseDetails && courseDetails.data) {
      setCurrentStatus(courseDetails.data.status);
    }
  }, [courseDetails]);
  const handleDeactivateCourse = async () => {
    setIsDeactivating(true);
    try {
      await deactivateCourse({ courseId }).unwrap();
      handleClose();
      setIsDeactivating(false);
      toast.success(
        <ToastSuccess
          title={"Course Deactivated ✅"}
          description={"Course Has Been Successfully Deactivated"}
        />
      );
    } catch (e) {
      setIsDeactivating(false);
      toast.error(
        <ToastDanger
          title={"Course Deactivation Failed ❌"}
          description={
            "❌ Something went wrong! The Course deactivation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleActivateCourse = async () => {
    try {
      setIsActivating(true);
      await activateCourse({ courseId }).unwrap();
      handleClose();
      setIsActivating(false);
      toast.custom(
        <ToastSuccess
          title={"Course Activated ✅"}
          description={"Course Has Been Successfully Activated"}
        />
      );
    } catch (e) {
      setIsActivating(false);
      toast.error(
        <ToastDanger
          title={"Course Activation Failed ❌"}
          description={
            "❌ Something went wrong! The Course activation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleRadioChange = (status) => {
    setCurrentStatus(status);
    setIsChangesMade(status !== courseDetails.data.status);
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Manage Course Status</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <p className="my-3 fw-light" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-block">
            <div className="d-flex flex-row align-items-center gap-2">
              <span className="fw-medium">Activate Account</span>
              {courseDetails.data.status === "active" && (
                <span
                  className="rounded-1 font-size-sm"
                  style={{
                    background: "#e3f5e3",
                    color: "#2d6830",
                    padding: "0.2rem",
                  }}
                >
                  <span>Course Active</span>
                </span>
              )}
            </div>
            <p className="my-0 fw-light font-size-sm gainsboro-color">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi, eius cupiditate reprehenderit, nam tenetur
              necessitatibus aperiam doloribus
            </p>
          </div>
          <div className="form-check mx-1">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={currentStatus === "active"}
              onChange={() => handleRadioChange("active")}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between my-2">
          <div className="d-block">
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="m-0 fw-medium">Deactivate Account</p>
              {courseDetails.data.status === "inactive" && (
                <span
                  className="rounded-1 font-size-sm"
                  style={{
                    background: "#fffec1",
                    color: "#a66a02",
                    padding: "0.2rem",
                  }}
                >
                  <span>Course Deactivated</span>
                </span>
              )}
            </div>
            <p className="my-0 fw-light font-size-sm gainsboro-color">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi, eius cupiditate reprehenderit, nam tenetur
              necessitatibus aperiam doloribus
            </p>
          </div>
          <div className="form-check mx-1">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={currentStatus === "inactive"}
              onChange={() => handleRadioChange("inactive")}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                courseDetails.data.status === "active"
                  ? handleDeactivateCourse()
                  : handleActivateCourse();
              }}
              disabled={!isChangesMade || isDeactivating || isActivating}
            >
              {isActivating || isDeactivating ? (
                <SingleSpinner />
              ) : courseDetails.data.status === "active" ? (
                "Deactivate Course"
              ) : (
                "Activate Course"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeactivateCourse;
