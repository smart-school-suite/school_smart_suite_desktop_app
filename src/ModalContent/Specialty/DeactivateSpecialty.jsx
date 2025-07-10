import {
  useActivateSpecialtyMutation,
  useDeactivateSpecialtyMutation,
} from "../../Slices/Asynslices/postSlice";
import { useFetchSpecialtyDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useEffect, useState } from "react";
import  Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function DeactivateSpecialty({ handleClose, row_id: specialtyId }) {
  const { data: specialtyDetails, isLoading } = useFetchSpecialtyDetailsQuery({
    specialty_id: specialtyId,
  });
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [deactivateSpecialty] = useDeactivateSpecialtyMutation();
  const [activateSpecialty] = useActivateSpecialtyMutation();
  const [isChangesMade, setIsChangesMade] = useState(false);
  useEffect(() => {
    if (specialtyDetails && specialtyDetails.data) {
      setCurrentStatus(specialtyDetails.data.status);
    }
  }, [specialtyDetails]);
  const handleDeactivateSpecialty = async () => {
    setIsDeactivating(true);
    try {
      await deactivateSpecialty({ specialtyId }).unwrap();
      handleClose();
      setIsDeactivating(false);
      toast.success(
        <ToastSuccess
          title={"Specialty Deactivated ✅"}
          description={"Specialty Has Been Successfully Deactivated"}
        />
      );
    } catch (e) {
      setIsDeactivating(false);
      toast.error(
        <ToastDanger
          title={"Specialty Deactivation Failed ❌"}
          description={
            "❌ Something went wrong! The Specialty deactivation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleActivateSpecialty = async () => {
    try {
      setIsActivating(true);
      await activateSpecialty({ specialtyId }).unwrap();
      handleClose();
      setIsActivating(false);
      toast.custom(
        <ToastSuccess
          title={"Specialty Activated ✅"}
          description={"Specialty Has Been Successfully Activated"}
        />
      );
    } catch (e) {
      setIsActivating(false);
      toast.custom(
        <ToastDanger
          title={"Specialty Activation Failed ❌"}
          description={
            "❌ Something went wrong! The Specialty activation failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const handleRadioChange = (status) => {
    setCurrentStatus(status);
    setIsChangesMade(status !== specialtyDetails.data.status);
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Manage Specialty Status</h5>
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
              {specialtyDetails.data.status === "active" && (
                <span className="rounded-1 font-size-sm" style={{ background: "#e3f5e3", color: "#2d6830", padding: "0.2rem" }}>
                  <span>Specialty Active</span>
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
            {specialtyDetails.data.status === "inactive" && (
              <span className="rounded-1 font-size-sm" style={{ background: "#fffec1", color: "#a66a02", padding: "0.2rem" }}>
                <span>Specialty Deactivated</span>
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
                specialtyDetails.data.status === "active"
                  ? handleDeactivateSpecialty()
                  : handleActivateSpecialty();
              }}
              disabled={!isChangesMade || isDeactivating || isActivating}
            >
              {
                 isActivating || isDeactivating ? <SingleSpinner /> : (
                  specialtyDetails.data.status === "active"
                    ? "Deactivate Specialty"
                    : "Activate  Specialty"
                 )
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeactivateSpecialty;
