import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchoolAdminMutation } from "../../Slices/Asynslices/updateSlice";
import { useFetchSchoolAdminDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
const UpdateSchoolAdmin = ({ row_id: schoolAdminId, handleClose }) => {
  const [updateSchoolAdmin] = useUpdateSchoolAdminMutation();
  const { data: schoolAdminDetails, isLoading, error,} = useFetchSchoolAdminDetailsQuery({
    school_admin_id: schoolAdminId,
  });
  const [formData, setFormData] = useState({
     name:"",
     first_name:"",
     last_name:"",
     email:"",
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [ isUpdating, setIsUpdating ] = useState(false);
  const handleAdminUpdate = async () => {
     setIsUpdating(true)
    try {
      await updateSchoolAdmin({ school_admin_id: schoolAdminId, updatedData:formData }).unwrap();
      setIsUpdating(false);
      handleClose();
      toast.custom(<ToastSuccess 
        title="Update Successfull ✅" 
        description="The school administrator has been updated successfully" />
      );
    } catch (e) {
      setIsUpdating(false);
      toast.custom(<ToastDanger
        title="Update Failed ❌" 
        description="❌ Something went wrong! The school administrator update failed due to an error. Please try again later."
        />);
    }
  };
  return (
    <>
      {isLoading ? (
        <SingleSpinner />
      ) : (
        <div>
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update School Admin</h5>
            <span className="m-0"
             onClick={() => {
               handleClose();
             }}
            >
            <Icon icon="charm:cross" width="22" height="22" />
            </span>
            </div>
            <span className="font-size-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatum sint reprehenderit tempora. Aliquid
            </span>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
          <div className="my-2">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder={schoolAdminDetails.data.first_name}
              name="first_name"
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              value={formData.first_name}
            />
          </div>
          <div className="my-2">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              placeholder={schoolAdminDetails.data.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              value={formData.last_name}
            />
          </div>
          </div>
          <div className="my-2">
            <label htmlFor="fullnames">Full Names</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder={`${schoolAdminDetails.data.name}`}
              onChange={(e) => handleInputChange("name", e.target.value)}
              value={formData.name}
            />
          </div>
          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder={`${schoolAdminDetails.data.email}`}
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="role">Role</label>
            <input 
             type="text" 
             className="form-control"
             name="role"
             value={formData.role}
             placeholder={`${schoolAdminDetails.data.role}`}
             onChange={(e) => handleInputChange("role", e.target.value)}
             />
          </div>
          <div className="my-1 w-100 mt-3">
            <button 
              className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm"
              onClick={() => {
                 handleAdminUpdate();
              }}
              >
             { isUpdating ? <SingleSpinner /> : <> Update Admin</> }
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default UpdateSchoolAdmin;
