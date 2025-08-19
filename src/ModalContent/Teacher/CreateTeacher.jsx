import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCreateTeacher } from "../../hooks/teacher/useCreateTeacher";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { emailValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { gender } from "../../data/data";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
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
  const [errors, setErrors] = useState({
    gender: "",
  });
  const { mutate: createTeacherMutation, isPending } =
    useCreateTeacher(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValid = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
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
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: true,
              message: {
                min: "First Name Must Be Atleast 3 Characters Long",
                max: "First Name Must Not Exceed 50 Characters",
                required: "First Name Required",
              },
            })}
            value={formData.first_name}
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
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: true,
              message: {
                min: "Last Name Must Be Atleast 3 Characters Long",
                max: "Last Name Must Not Exceed 3 Characters",
                required: "Last Name Required",
              },
            })}
            value={formData.last_name}
          />
        </div>
        <div>
          <label htmlFor="fullNames" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => handleInputChange("name", value)}
            onValidationChange={(value) => handleValid("name", value)}
            value={formData.name}
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: true,
              message: {
                min: "Name Must Be Atleast 3 Characters Long",
                max: "Name Must Not Exceed 150 Characters",
                required: "Full Name Required",
              },
            })}
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
            validationSchema={emailValidationSchema({
                required:true
            })}
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="gender" className="font-size-sm">
            Gender
          </label>
          <CustomDropdown
            data={gender}
            displayKey={["name"]}
            valueKey={["name"]}
            direction="up"
            onSelect={(value) => handleInputChange("gender", value.name)}
            onError={(value) => handleFieldError("gender", value)}
            errorMessage="Gender Required"
            error={errors.gender}
            placeholder="Select Gender"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="font-size-sm">
            Phone Number
          </label>
          <PhoneNumberInput
            onChange={(value) => handleInputChange("phone_one", value)}
            value={formData.phone_one}
            error={errors.phone_one}
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
