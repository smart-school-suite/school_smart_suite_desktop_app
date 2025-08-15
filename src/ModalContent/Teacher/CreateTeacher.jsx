import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCreateTeacher } from "../../hooks/teacher/useCreateTeacher";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  emailValidationSchema,
  firstNameSchema,
  fullNameSchema,
  lastNameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
function CreateTeacher({ handleClose }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: "",
    phone_one: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: "",
    phone_one: "",
  });

  const { mutate: createTeacherMutation, isPending } =
    useCreateTeacher(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValid = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateTeacher = async () => {
    createTeacherMutation(formData);
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Create Teacher</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <label htmlFor="firstName" className="font-size-sm">
            First Name
          </label>
          <TextInput
            placeholder={"Enter Teacher First Name"}
            onChange={(value) => handleInputChange("first_name", value)}
            onValidationChange={(value) => handleValid("first_name", value)}
            validationSchema={firstNameSchema}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="font-size-sm">
            Last Name
          </label>
          <TextInput
            placeholder={"Enter Teacher Last Name"}
            onChange={(value) => handleInputChange("last_name", value)}
            onValidationChange={(value) => handleValid("last_name", value)}
            validationSchema={lastNameSchema}
          />
        </div>
        <div>
          <label htmlFor="fullNames" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => handleInputChange("name", value)}
            onValidationChange={(value) => handleValid("name", value)}
            validationSchema={fullNameSchema}
            placeholder={"Enter Teacher Full Names"}
          />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">
            E-mail
          </label>
          <TextInput
            onChange={(value) => handleInputChange("email", value)}
            onValidationChange={(value) => handleValid("email", value)}
            placeholder={"e.g example@gmail.com"}
            validationSchema={emailValidationSchema}
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
          <button
            className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
            onClick={() => {
              handleCreateTeacher();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Teacher"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateTeacher;
