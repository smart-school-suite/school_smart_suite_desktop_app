import { useState } from "react";
import { useFetchSchoolAdminDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { SingleSpinner } from "../../components/Spinners";
import { Icon } from "@iconify/react";
import {
  useDeactiveSchoolAdminAccountMutation,
  useActivateSchoolAdminAccountMutation,
} from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useEffect } from "react";
function AccountStatus({ handleClose, row_id: schoolAdminId }) {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [isChangesMade, setIsChangesMade] = useState(false);

  const [activateSchoolAdminAccount] = useActivateSchoolAdminAccountMutation();
  const [deactiveSchoolAdminAccount] = useDeactiveSchoolAdminAccountMutation();
  
  const { data: schoolAdminDetails, isLoading } = useFetchSchoolAdminDetailsQuery({
    school_admin_id: schoolAdminId,
  });

  useEffect(() => {
    if (schoolAdminDetails && schoolAdminDetails.data) {
      setCurrentStatus(schoolAdminDetails.data.status);
    }
  }, [schoolAdminDetails]);

  const handleDeactivateAccount = async () => {
    if (!isChangesMade) {
      toast.custom(
        <ToastWarning
          title={"No Changes Made ❌"}
          description={"No changes were made to the account status. Please make changes to deactivate the account"}
        />
      );
      return;
    }
    setIsDeactivating(true);
    try {
      await deactiveSchoolAdminAccount({ schoolAdminId }).unwrap();
      handleClose();
      toast.custom(<ToastSuccess title="Account Deactivated ✅" description="Account Has Been Successfully Deactivated" />);
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Account Deactivation Failed ❌"}
          description={"❌ Something went wrong! The Account deactivation failed due to an error. Please try again later."}
        />
      );
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleActivateAccount = async () => {
    if (!isChangesMade) {
      toast.custom(
        <ToastWarning
          title={"No Changes Made ❌"}
          description={"No changes were made to the account status. Please make changes to activate the account"}
        />
      );
      return; // Early exit if no changes made
    }
    setIsActivating(true);
    try {
      await activateSchoolAdminAccount({ schoolAdminId:schoolAdminId }).unwrap();
      handleClose();
      toast.custom(<ToastSuccess title="Account Activated ✅" description="Account Has Been Successfully Activated" />);
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Account Activation Failed ❌"}
          description={"❌ Something went wrong! The Account activation failed due to an error. Please try again later."}
        />
      );
    } finally {
      setIsActivating(false);
    }
  };

  const handleRadioChange = (status) => {
    setCurrentStatus(status);
    setIsChangesMade(status !== schoolAdminDetails.data.status);
  };

  if (isLoading) {
    return <SingleSpinner />;
  }

  return (
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
              {schoolAdminDetails.data.status === "active" && (
                <span className="rounded-1 font-size-sm fw-medium" style={{ background: "#e3f5e3", color: "#2d6830", padding: "0.2rem" }}>
                  <span>Account Active</span>
                </span>
              )}
            </div>
            <span className="font-size-sm">
              Manage the activation status of the account here.
            </span>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
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
            {schoolAdminDetails.data.status === "inactive" && (
              <span className="rounded-1 font-size-sm" style={{ background: "#fffec1", color: "#a66a02", padding: "0.2rem" }}>
                <span>Account Deactivated</span>
              </span>
            )}
            </div>
            <span className="font-size-sm">
              Manage the deactivation status of the account here.
            </span>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
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
            schoolAdminDetails.data.status === "active" ? handleDeactivateAccount() : handleActivateAccount();
          }}
          disabled={!isChangesMade || isDeactivating || isActivating}
        >
          {isDeactivating || isActivating ? <SingleSpinner /> : (schoolAdminDetails.data.status === "active" ? "Deactivate Account" : "Activate Account")}
        </button>
      </div>
    </div>
  );
}

export default AccountStatus;