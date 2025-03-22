import { useState } from "react";
import { useFetchRolesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAssignRoleMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
function SchoolAdminRoles({ handleClose, row_id: schoolAdminId }) {
    const { data: data, error, isLoading } = useFetchRolesQuery();
    const [roles, setRoles] = useState([]);
    const [assignRole, { isLoading: isAssigning }] = useAssignRoleMutation();
    const handleSaveChanges = async () => {
      if(roles.length <= 0){
        toast.custom(<ToastWarning 
          title={"No Role Selected ❌"}
          description={"⚠️ Please select at least one role to assign."}
        />)
      }
      try{
        await assignRole({ schoolAdminId, roles }).unwrap();
        handleClose();
      }
      catch(e){
        toast.custom(
          <ToastDanger 
            title={"Role Assignment Failed ❌"}
            description={"❌ Something went wrong! The role assignment failed due to an error. Please try again later."} 
          />)
      }
    };
    function handleSelectRole(roleTitle) {
      setRoles([roleTitle]);
    }
  
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="my-1">
          <h5>Assign Role To School Admin</h5>
        </div>
        {data.data.map((item) => {
          const isChecked = roles.includes(item.name);
          return (
            <div
              className="d-flex flex-row align-items-center gap-4"
              key={item.name}
            >
              <div className="w-100 border-bottom">
                <div className="d-block">
                  <p className="my-0">
                    {item.name} {schoolAdminId}
                  </p>
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
                onChange={() => {
                  handleSelectRole(item.name);
                }}
              />
            </div>
          );
        })}
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
            disabled={isAssigning} // Disable while assigning
          >
            {isAssigning ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </>
    );
  }
  export default SchoolAdminRoles;