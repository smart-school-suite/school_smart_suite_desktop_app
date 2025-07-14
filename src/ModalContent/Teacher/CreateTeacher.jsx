import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCreateTeacher } from "../../hooks/teacher/useCreateTeacher";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateTeacher({ handleClose }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender:"",
    phone_one:""
  });

  const { mutate:createTeacherMutation, isPending } = useCreateTeacher();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

   const handleCreateTeacher = async () => {
    createTeacherMutation(formData);
  };
  return (
    <>
      <div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Create Teacher</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
            sint reprehenderit tempora. Aliquid
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-2">
          <div>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="example@gmai.com"
          />
        </div>
        <div>
          <label htmlFor="">Full Names</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label htmlFor="">gender</label>
          <input
            type="text"
            className="form-control"
            name="gender"
            onChange={(e) => handleInputChange("gender", e.target.value)}
            placeholder="male"
          />
        </div>
        <div>
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone_one"
            placeholder="Enter Phone Number"
            onChange={(e) => handleInputChange("phone_one", e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
            onClick={() => {
                handleCreateTeacher();
            }}
          >
            {
                isPending ? <SingleSpinner /> : "Create Teacher"
            }
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateTeacher;
