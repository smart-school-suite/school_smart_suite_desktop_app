import { Icon } from "@iconify/react";
import { useFetchDepartmentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState, useEffect } from "react";
import {
  useDeactivateDepartmentMutation,
  useActivateDepartmentMutation,
} from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
function DeactivateDepartment({ handleClose, row_id: departmentId }) {
  const { data: departmentDetails, isLoading } = useFetchDepartmentDetailsQuery(
    {
      department_id: departmentId,
    }
  );
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [deactivateDepartment] = useDeactivateDepartmentMutation();
  const [activateDepartment] = useActivateDepartmentMutation();
  const [isChangesMade, setIsChangesMade] = useState(false);
   useEffect(() => {
      if (departmentDetails && departmentDetails.data) {
        setCurrentStatus(departmentDetails.data.status);
      }
    }, [departmentDetails]);
  const handleDeactivateDepartment = async () => {
    setIsDeactivating(true);
    try {
      await deactivateDepartment({ departmentId }).unwrap();
      handleClose();
      setIsDeactivating(false);
      toast.success(
        <ToastSuccess
          title={"Department Deactivated ✅"}
          description={"Department Has Been Successfully Deactivated"}
        />
      );
    } catch (e) {
      setIsDeactivating(false);
      toast.error(
        <ToastDanger
          title={"Department Deactivation Failed ❌"}
          description={
            "❌ Something went wrong! The Department deactivation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleActivateDepartment = async () => {
    try {
      setIsActivating(true);
      await activateDepartment({ departmentId }).unwrap();
      handleClose();
      setIsActivating(false);
      toast.custom(
        <ToastSuccess
          title={"Department Activated ✅"}
          description={"Department Has Been Successfully Activated"}
        />
      );
    } catch (e) {
      setIsActivating(false);
      toast.error(
        <ToastDanger
          title={"Department Activation Failed ❌"}
          description={
            "❌ Something went wrong! The Department activation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleRadioChange = (status) => {
    setCurrentStatus(status);
    setIsChangesMade(status !== departmentDetails.data.status);
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Manage Department Status</h5>
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
              {departmentDetails.data.status === "active" && (
                <span className="rounded-1 font-size-sm" style={{ background: "#e3f5e3", color: "#2d6830", padding: "0.2rem" }}>
                  <span>Department Active</span>
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
            {departmentDetails.data.status === "inactive" && (
              <span className="rounded-1 font-size-sm" style={{ background: "#fffec1", color: "#a66a02", padding: "0.2rem" }}>
                <span>Department Deactivated</span>
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
                departmentDetails.data.status === "active"
                  ? handleDeactivateDepartment()
                  : handleActivateDepartment();
              }}
              disabled={!isChangesMade || isDeactivating || isActivating}
            >
              {
                 isActivating || isDeactivating ? <SingleSpinner /> : (
                  departmentDetails.data.status === "active"
                    ? "Deactivate Department"
                    : "Activate Department"
                 )
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeactivateDepartment;
