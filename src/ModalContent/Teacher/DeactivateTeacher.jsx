import { useFetchTeacherDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import {
  useDeactivateTeacherMutation,
  useActivateTeacherMutation,
} from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners";
function DeactivateTeacher({ row_id: teacherId, handleClose }) {
  const { data: teacherDetails, isLoading } = useFetchTeacherDetailsQuery({
    teacher_id: teacherId,
  });
  
  const [activateTeacher] = useActivateTeacherMutation();
  const [deactivateTeacher] = useDeactivateTeacherMutation();
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isChangesMade, setIsChangesMade] = useState(false);
    useEffect(() => {
      if (teacherDetails && teacherDetails.data) {
        setCurrentStatus(teacherDetails.data.status);
      }
    }, [teacherDetails]);
  const handleActivateAccount = async () => {
    if (!isChangesMade) {
      toast.custom(
        <ToastWarning
          title={"No Changes Made ❌"}
          description={
            "No changes were made to the account status. Please make changes to deactivate the account"
          }
        />
      );
      return;
    }
    setIsDeactivating(true);
    try {
      await activateTeacher({ teacherId }).unwrap();
      handleClose();
      toast.custom(
        <ToastSuccess
          title="Account Activated ✅"
          description="Account Has Been Successfully Activated"
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Account Activation Failed ❌"}
          description={
            "❌ Something went wrong! The Account Activation failed due to an error. Please try again later."
          }
        />
      );
    } finally {
      setIsDeactivating(false);
    }
  };
  const handleDeactivateAccount = async () => {
    if (!isChangesMade) {
      toast.custom(
        <ToastWarning
          title={"No Changes Made ❌"}
          description={
            "No changes were made to the account status. Please make changes to activate the account"
          }
        />
      );
      return;
    }
    setIsActivating(true);
    try {
      await deactivateTeacher({
        teacherId,
      }).unwrap();
      handleClose();
      toast.custom(
        <ToastSuccess
          title="Account Deactivated ✅"
          description="Account Has Been Successfully Deactivated"
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Account deactivation Failed ❌"}
          description={
            "❌ Something went wrong! The Account deactivation failed due to an error. Please try again later."
          }
        />
      );
    } finally {
      setIsActivating(false);
    }
  };
  const handleRadioChange = (status) => {
    setCurrentStatus(status);
    setIsChangesMade(status !== teacherDetails.data.status);
  };
  if(isLoading){
     return <Pageloaderspinner />
  }
  return (
    <>
      <div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <h5 className="fw-semibold m-0">Account Status Management</h5>
            <Icon
              icon="charm:cross"
              className="font-size-lg"
              onClick={handleClose}
            />
          </div>
          <p className="font-size-sm gainsboro-color">
            Manage the status of the school admin account here.
          </p>
        </div>
        <div className="my-2">
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
            <div className="d-block">
              <div className="d-flex flex-row align-items-center gap-2">
                <span className="fw-semibold">Activate Account</span>
                {teacherDetails.data.status === "active" && (
                  <span
                    className="rounded-1 font-size-sm fw-medium"
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
              <span className="font-size-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, sunt velit facilis, similique minus eaque quibusdam eius
              </span>
            </div>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="radio"
                name="accountStatus"
                checked={currentStatus === "active"}
                onChange={() => handleRadioChange("active")}
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-block">
              <div className="d-flex flex-row align-items-center gap-2">
                <p className="m-0 fw-semibold">Deactivate Account</p>
                {teacherDetails.data.status === "inactive" && (
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
              <span className="font-size-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, sunt velit facilis, similique minus eaque quibusdam eius
              </span>
            </div>
            <div className="form-check">
              <input
                className="form-check-input mx-1"
                type="radio"
                name="accountStatus"
                checked={currentStatus === "inactive"}
                onChange={() => handleRadioChange("inactive")}
              />
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-row align-items-center gap-2">
          <button
            className="p-2 font-size-sm border-none primary-background text-white w-100 rounded-3"
            onClick={() => {
              teacherDetails.data.status === "active"
                ? handleDeactivateAccount()
                : handleActivateAccount();
            }}
            disabled={!isChangesMade || isDeactivating || isActivating}
          >
            {isDeactivating || isActivating ? (
              <SingleSpinner />
            ) : teacherDetails.data.status === "active" ? (
              "Deactivate Account"
            ) : (
              "Activate Account"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeactivateTeacher;
