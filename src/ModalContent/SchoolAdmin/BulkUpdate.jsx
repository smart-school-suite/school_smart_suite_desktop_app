import { useState } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useBulkUpdateSchoolAdminMutation } from "../../Slices/Asynslices/updateSlice";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
function BulkUpdate({ handleClose, data }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [bulkUpdateSchoolAdmin] = useBulkUpdateSchoolAdminMutation();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleBulkUpdate = async () => {
    setIsUpdating(true);
    const updateData = data.map((items) => ({
         id:items.id,
         email:formData.email,
         name:formData.name,
         last_name:formData.last_name,
         first_name:formData.first_name
    }))
    const formattedData = {
        school_admins: updateData,
      };
     try{
        await bulkUpdateSchoolAdmin(formattedData).unwrap();
        setIsUpdating(false);
        handleClose();
        toast.custom(
            <ToastSuccess 
              title={"Updated Successfully"}
              description={"School Admin Updated Sucessfully"}
            />
        )
     }
     catch(e){
        setIsUpdating(false);
        toast.custom(
            <ToastDanger 
              title={"Update Failed"}
              description={"An error occurred while trying to update Admin"}
            />
        )
     }
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Bulk Update School Admin</h5>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@mail.com"
            name="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Jhone"
            name="first_name"
            onChange={(e) => handleInputChange("first_name", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Doe"
            name="last_name"
            onChange={(e) => handleInputChange("last_name", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="fullNames">Full Names</label>
          <input
            type="text"
            className="form-control"
            placeholder="Jhone Doe"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button
            className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
            onClick={handleBulkUpdate}
          >
            {isUpdating ? <SingleSpinner /> : "Update All School Admin"}
          </button>
        </div>
      </div>
    </>
  );
}
export default BulkUpdate;
