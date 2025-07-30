import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdmin } from "../../hooks/schoolAdmin/useUpdateSchoolAdmin";
const UpdateSchoolAdmin = ({ rowData, handleClose }) => {
  const { id:schoolAdminId, email, first_name, last_name, name } = rowData;
  const { mutate:update, isPending } = useUpdateSchoolAdmin(handleClose);
  const [formData, setFormData] = useState({
     name:"",
     first_name:"",
     last_name:"",
     email:"",
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleAdminUpdate =  () => {
    update({ schoolAdminId, updateData:formData })
  };
  return (
    <>
       <div>
          <div>
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0 fw-semibold">Update School Admin</span>
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
              placeholder={first_name}
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
              placeholder={last_name}
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
              placeholder={`${name}`}
              onChange={(e) => handleInputChange("name", e.target.value)}
              value={formData.name}
            />
          </div>
          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder={`${email}`}
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="my-1 w-100 mt-3">
            <button 
              className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm"
              onClick={() => {
                 handleAdminUpdate();
              }}
              disabled={isPending}
              >
             { isPending ? <SingleSpinner /> : <> Update Admin</> }
            </button>
          </div>
        </div>
    </>
  );
};
export default UpdateSchoolAdmin;
