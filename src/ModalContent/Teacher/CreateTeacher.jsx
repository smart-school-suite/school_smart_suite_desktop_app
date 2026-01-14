import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useCreateTeacher } from "../../hooks/teacher/useCreateTeacher";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  emailValidationSchema,
  nameSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { gender } from "../../data/data";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetActiveGender } from "../../hooks/gender/useGetActiveGender";
function CreateTeacher({ handleClose }) {
  const {
    data: gender,
    isLoading: isGenderLoading,
    error,
  } = useGetActiveGender();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const phoneNumberRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender_id: "",
    phone: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    gender_id: "",
  });
  const { mutate: createTeacherMutation, isPending } =
    useCreateTeacher(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const firstName = await firstNameRef.current.triggerValidation();
    const lastName = await lastNameRef.current.triggerValidation();
    const fullName = await fullNameRef.current.triggerValidation();
    const email = await emailRef.current.triggerValidation();
    const gender = await genderRef.current.triggerValidation();
    const phoneNumber = await phoneNumberRef.current.triggerValidation();
    return {
      firstName,
      lastName,
      fullName,
      email,
      gender,
      phoneNumber,
    };
  };
  const handleCreateTeacher = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a teacher."
          }
        />
      );
      return;
    }
    if (!allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a teacher."
          }
        />
      );
      return;
    }
    console.log(formData.gender_id);
    createTeacherMutation({ ...formData, gender_id: formData?.gender_id?.id });
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
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="w-50">
            <label htmlFor="firstName" className="font-size-sm">
              First Name
            </label>
            <TextInput
              placeholder={"Enter Teacher First Name"}
              onChange={(value) =>
                handleStateChange("first_name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("first_name", value, setFieldValid)
              }
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
              ref={firstNameRef}
            />
          </div>
          <div className="w-50">
            <label htmlFor="lastName" className="font-size-sm">
              Last Name
            </label>
            <TextInput
              placeholder={"Enter Teacher Last Name"}
              onChange={(value) =>
                handleStateChange("last_name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("last_name", value, setFieldValid)
              }
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
              ref={lastNameRef}
            />
          </div>
        </div>
        <div>
          <label htmlFor="fullNames" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => handleStateChange("name", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("name", value, setFieldValid)
            }
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
            ref={fullNameRef}
          />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">
            E-mail
          </label>
          <TextInput
            onChange={(value) => handleStateChange("email", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("email", value, setFieldValid)
            }
            placeholder={"e.g example@gmail.com"}
            validationSchema={emailValidationSchema({
              required: true,
            })}
            value={formData.email}
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="gender" className="font-size-sm">
            Gender
          </label>
          <CustomDropdown
            data={gender?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange("gender_id", value, setFormData)
            }
            onError={(value) =>
              handleStateChange("gender_id", value, setErrors)
            }
            errorMessage="Gender Required"
            error={errors.gender}
            placeholder="Select Gender"
            ref={genderRef}
            value={formData.gender_id}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="font-size-sm">
            Phone Number
          </label>
          <PhoneNumberInput
            onChange={(value) => handleStateChange("phone", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("phone", value, setFieldValid)
            }
            value={formData.phone_one}
            validationSchema={phoneValidationSchema({
              optional: false,
              prefixes: ["6", "2"],
              messages: {
                required: "Phone Number Required",
              },
            })}
            ref={phoneNumberRef}
          />
        </div>
        <div className="mt-2">
          <button
            className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
            onClick={() => {
              handleCreateTeacher();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Create Teacher"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateTeacher;
