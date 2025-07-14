import { Icon } from "@iconify/react";
import { useState } from "react";
import { useGetAssignablePermission } from "../../hooks/permission/useGetAssignablePermissions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function ManagePermission({ rowData, handleClose }) {
  const [toggle, setToggle] = useState({
    assignablePermission: true,
    removablePermission: false,
    usePermission: true,
  });
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Manage School Admin Permissions</span>
          <span>
            <Icon icon="proicons:cancel" width="24" height="24" />
          </span>
        </div>
        <div className="d-flex gap-2 flex-row my-4">
          <button 
            className={` permission-toggle ${toggle.assignablePermission ? "permission-toggle-active" : "permission-toggle-inactive"}`}
            
            >
            Assignable Permissions
          </button>
          <button className={` permission-toggle ${toggle.removablePermission ? "permission-toggle-active" : "permission-toggle-inactive"}`}>
            Removable Permissions
          </button>
          <button className={` permission-toggle ${toggle.removablePermission ? "permission-toggle-active" : "permission-toggle-inactive"}`}>
            Assigned Permissions
          </button>
        </div>
        <AssignablePermissions schoolAdminId={rowData.id}/>
      </div>
    </>
  );
}
export default ManagePermission;

function RemovePermissions() {

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <span className="font-size-sm">Select All</span>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </div>
        <div>
          <input
            type="search"
            className="w-100 form-control my-2"
            placeholder="Search Permission"
          />
        </div>
        <div>
          <span className="fw-semibold font-size-sm">Permission Category</span>
          <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">Permission Name</span>
              <span className="font-size-sm fw-light">
                Permission Descripion
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">Permission Name</span>
              <span className="font-size-sm fw-light">
                Permission Descripion
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </div>
        <button className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white">
          Remove Permission
        </button>
      </div>
    </>
  );
}

function UserPermissions() {
  return (
    <>
      <div>
        <div>
          <input
            type="search"
            className="w-100 form-control my-2"
            placeholder="Search Permission"
          />
        </div>
        <div>
          <span className="fw-semibold font-size-sm">Permission Category</span>
          <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">Permission Name</span>
              <span className="font-size-sm fw-light">
                Permission Descripion
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">Permission Name</span>
              <span className="font-size-sm fw-light">
                Permission Descripion
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AssignablePermissions({ schoolAdminId }) {
    const { data:permission, isFetching } = useGetAssignablePermission(schoolAdminId)
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <span className="font-size-sm">Select All</span>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </div>
        <div>
          <input
            type="search"
            className="w-100 form-control my-2"
            placeholder="Search Permission"
          />
        </div>
        <div className="modal-content-child">
                  {
          isFetching ? 
           <SingleSpinner /> :
            <>
             {
               permission.data.map((items) => {
             return(
                <>
                <div>
          <span className="fw-semibold font-size-sm">{items.category.name}</span>
           {
             items.permissions.map((permission) => (
              <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm">{permission.name}</span>
              <span className="font-size-sm fw-light">
                Permission Descripion
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
             ))
           }
        </div>
                </>
             )
          })
             }
            </>
        }
        </div>
        <button className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white">
          Assign Permission
        </button>
      </div>
    </>
  );
}
