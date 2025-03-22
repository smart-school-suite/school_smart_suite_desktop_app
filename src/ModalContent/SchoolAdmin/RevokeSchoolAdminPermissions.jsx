import { useFetchPermissionsBySchoolAdminQuery } from "../../Slices/Asynslices/fetchSlice";
import { useRevokePermissionsMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import { replaceDashesWithSpaces } from "../../utils/functions";
import { useState } from "react";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
const RevokeSchoolAdminPermissions = ({
  row_id: schoolAdminId,
  handleClose,
}) => {
  const {
    data: data,
    isLoading,
    error,
  } = useFetchPermissionsBySchoolAdminQuery({ schoolAdminId: schoolAdminId });
  const [revokePermissions, { isLoading: isRevoking }] =
    useRevokePermissionsMutation();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prevSelected) => {
      if (prevSelected.includes(permission)) {
        return prevSelected.filter((item) => item !== permission);
      } else {
        return [...prevSelected, permission];
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allPermissions = data.data.map((item) => item.name);
      setSelectedPermissions(allPermissions);
    } else {
      setSelectedPermissions([]);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedPermissions.length <= 0) {
      toast.custom(
        <ToastWarning
          title={"No Permission Selected ❌"}
          description={"⚠️ Please select at least one permission to revoke."}
        />
      );
      return;
    }
    try {
      await revokePermissions({
        schoolAdminId,
        permissions: selectedPermissions,
      }).unwrap();
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Permissions Revoked Successfully ✅"}
          description={"The permissions have been revoked successfully"}
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Permissions Revocation Failed ❌"}
          description={
            "❌ Something went wrong! The permissions revocation failed due to an error. Please try again later."
          }
        />
      );
    }
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="my-1">
        <h5>Revoke Permissions</h5>
      </div>
      <div className="d-flex align-items-center justify-content-end gap-2 me-3">
        <label>Select All</label>
        <input
          type="checkbox"
          className="form-check-input"
          onChange={handleSelectAll}
          checked={selectedPermissions.length === data.data.length}
          indeterminate={
            selectedPermissions.length > 0 &&
            selectedPermissions.length < data.data.length
          }
        />
      </div>
      <div
        style={{
          maxHeight: "50dvh",
          height: "auto",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {data.data.map((permission) => {
          const isChecked = selectedPermissions.includes(permission);
          return (
            <div
              className="d-flex flex-row align-items-center gap-4"
              key={permission}
            >
              <div className="w-100 border-bottom">
                <div className="d-block">
                  <p className="my-0">{replaceDashesWithSpaces(permission)}</p>
                  <span className="font-size-sm gainsboro-color">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aperiam, iure facilis. Officiis placea
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={() => handlePermissionChange(permission)}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-4 d-flex justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="border-none px-3 py-2 rounded-3 w-50 font-size-sm primary-background text-white"
          onClick={handleSaveChanges}
          disabled={isRevoking}
        >
          {isRevoking ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
};

export default RevokeSchoolAdminPermissions;
