import { useFetchPermissionsQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAssignPermissionMutation } from "../../Slices/Asynslices/postSlice";
import { useState } from "react";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { replaceDashesWithSpaces } from "../../utils/functions"
function SchoolAdminPermissions({ handleClose, row_id: schoolAdminId }) {
    const { data: data, error, isLoading } = useFetchPermissionsQuery();
    const [assignPermission, { isLoading: isAssigning }] = useAssignPermissionMutation();
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
        const allPermissions = data.data.map((item) => item);
        setSelectedPermissions(allPermissions);
      } else {
        setSelectedPermissions([]);
      }
    };
  
    const handleSaveChanges = async () => {
      if (selectedPermissions.length > 0) {
        await assignPermission({
          schoolAdminId,
          permissions: selectedPermissions,
        });
        handleClose();
      } else {
        alert("Please select at least one permission to assign.");
      }
    };
  
    if (isLoading) {
      return <Pageloaderspinner />;
    }
  
    if (error) {
      return <div>Error loading permissions</div>;
    }
  
    return (
      <>
        <div className="my-1">
          <h5>Assign Permissions To School Admin</h5>
        </div>
        <div
          style={{
            maxHeight: "50dvh",
            height: "auto",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
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
          {data.data.map((item) => {
            const isChecked = selectedPermissions.includes(item.name);
            return (
              <div
                className="d-flex flex-row align-items-center gap-4"
                key={item.name}
              >
                <div className="w-100 border-bottom">
                  <div className="d-block">
                    <p className="my-0">{replaceDashesWithSpaces(item.name)}</p>
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
                  onChange={() => handlePermissionChange(item.name)}
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
            disabled={isAssigning}
          >
            {isAssigning ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </>
    );
  }
  export default SchoolAdminPermissions;