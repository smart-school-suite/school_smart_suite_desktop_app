import { useState } from "react";
import { useAddSchoolAdminMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { SingleSpinner } from "../../components/Spinners";
import { Icon } from "@iconify/react";
function CreateSchoolAdmin({ handleClose }) {
  const [addSchoolAdmin] = useAddSchoolAdminMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateSchoolAdmin = async () => {
    setIsCreating(true);
    try {
      await addSchoolAdmin(formData).unwrap();
      setIsCreating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Createed Succesfully"}
          description={"School Admin Created Succesfully"}
        />
      );
    } catch (e) {
      setIsCreating(false);
      toast.custom(
        <ToastDanger
          title={"Failed To Create"}
          description={"Failed to create school admin due to an error"}
        />
      );
    }
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
                <div className="block">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                    <h5 className="m-0">Create School Admin</h5>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
                    nesciunt sunt
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
            onClick={handleCreateSchoolAdmin}
            >
            {isCreating ? <SingleSpinner /> : "Create School Admin"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateSchoolAdmin;
