import Pageloaderspinner from "../../components/Spinners";
import { useFetchStudentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import {
  useActivateStudentAccountMutation,
  useDeactivateStudentAccountMutation,
} from "../../Slices/Asynslices/postSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
function DeactivateStudent({ handleClose, row_id: studentId }) {
  const { data: studentDetails, isLoading: isStudentLoading } =
    useFetchStudentDetailsQuery({
      student_id:studentId
    });
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [deactivateStudentAccount] = useDeactivateStudentAccountMutation();
  const [activateStudentAccount] = useActivateStudentAccountMutation();
  const [isChangesMade, setIsChangesMade] = useState(false);
    useEffect(() => {
      if (studentDetails && studentDetails.data) {
        setCurrentStatus(studentDetails.data.account_status);
      }
    }, [studentDetails]);
    const handleDeactivateStudentAccount = async () => {
      setIsDeactivating(true);
      try {
        await deactivateStudentAccount( studentId ).unwrap();
        handleClose();
        setIsDeactivating(false);
        toast.custom(
          <ToastSuccess
            title={"Account Deactivated ✅"}
            description={"Account Has Been Successfully Deactivated"}
          />
        );
      } catch (e) {
        setIsDeactivating(false);
        toast.custom(
          <ToastDanger
            title={"Account Deactivation Failed ❌"}
            description={
              "❌ Something went wrong! The Account deactivation failed due to an error. Please try again later."
            }
          />
        );
      }
    };
    const handleActivateStudentAccount = async () => {
      try {
        setIsActivating(true);
        await activateStudentAccount(studentId).unwrap();
        handleClose();
        setIsActivating(false);
        toast.custom(
          <ToastSuccess
            title={"Account Activated ✅"}
            description={"Account Has Been Successfully Activated"}
          />
        );
      } catch (e) {
        setIsActivating(false);
        toast.custom(
          <ToastDanger
            title={"Account Activation Failed ❌"}
            description={
              "❌ Something went wrong! The Course activation failed due to an error. Please try again later."
            }
          />
        );
      }
    };
    const handleRadioChange = (status) => {
      setCurrentStatus(status);
      setIsChangesMade(status !== studentDetails.data.account_status);
    };
  if (isStudentLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Manage Student Account Status</h5>
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
              {studentDetails.data.account_status === "active" && (
                <span
                  className="rounded-1 font-size-sm"
                  style={{
                    background: "#e3f5e3",
                    color: "#2d6830",
                    padding: "0.2rem",
                  }}
                >
                  <span>Account Active</span>
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
              {studentDetails.data.account_status=== "inactive" && (
                <span
                  className="rounded-1 font-size-sm"
                  style={{
                    background: "#fffec1",
                    color: "#a66a02",
                    padding: "0.2rem",
                  }}
                >
                  <span>Account Deactivated</span>
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
                studentDetails.data.account_status === "active"
                  ? handleDeactivateStudentAccount()
                  : handleActivateStudentAccount();
              }}
              disabled={!isChangesMade || isDeactivating || isActivating}
            >
              {isActivating || isDeactivating ? (
                <SingleSpinner />
              ) : studentDetails.data.account_status === "active" ? (
                "Deactivate Student Account"
              ) : (
                "Activate Student Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeactivateStudent;
