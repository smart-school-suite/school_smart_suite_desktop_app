import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useCreateSchoolAdmin } from "../../hooks/schoolAdmin/useCreateSchoolAdmin";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  firstNameSchema,
  fullNameSchema,
  lastNameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, objectHasEmpty } from "../../utils/functions";
function CreateSchoolAdmin({ handleClose }) {
  const { mutate: createSchoolAdminMutation, isPending } =
    useCreateSchoolAdmin(handleClose);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
  });
  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidChange = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateSchoolAdmin = async () => {
    createSchoolAdminMutation(formData);
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Create School Admin</span>
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
            onChange={(value) => {
              handleInputChange("first_name", value);
            }}
            placeholder={"Enter First Name"}
            validationSchema={firstNameSchema}
            onValidationChange={(value) => handleValidChange("first_name", value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="font-size-sm">
            Last Name
          </label>
          <TextInput
            onChange={(value) => handleInputChange("last_name", value)}
            placeholder={"Enter Last Name"}
            onValidationChange={(value) =>
              handleValidChange("last_name", value)
            }
            validationSchema={lastNameSchema}
          />
        </div>
        <div>
          <label htmlFor="fullname" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => handleInputChange("name", value)}
            placeholder={"Enter Full Names"}
            onValidationChange={(value) => handleValidChange("name", value)}
            validationSchema={fullNameSchema}
          />
        </div>
        <div>
          <label htmlFor="fullNames" className="font-size-sm">
            Email
          </label>
          <TextInput
            onChange={(value) => handleInputChange("email", value)}
            placeholder={"example@gmail.com"}
            onValidationChange={(value) => handleValidChange("email", value)}
            type="email"
            validationSchema={emailValidationSchema}
          />
        </div>
        <div className="mt-2">
          <button
            className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
            onClick={handleCreateSchoolAdmin}
            disabled={isPending || objectHasEmpty(formData) || !allFieldsValid(isFieldValid) }
          >
            {isPending ? <SingleSpinner /> : "Create School Admin"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateSchoolAdmin;
