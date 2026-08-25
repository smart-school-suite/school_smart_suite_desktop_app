import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useCreateSchoolAdmin } from "../../hooks/schoolAdmin/useCreateSchoolAdmin";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  nameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, objectHasEmpty } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateSchoolAdmin({ handleClose }) {
  const { mutate: createAdmin, isPending } = useCreateSchoolAdmin(handleClose);
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const fullNameRef = useRef();
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
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const firstName = await firstNameRef.current.triggerValidation();
    const lastName = await lastNameRef.current.triggerValidation();
    const fullName = await fullNameRef.current.triggerValidation();
    const email = await emailRef.current.triggerValidation();
    return {
      firstName,
      lastName,
      fullName,
      email,
    };
  };
  const handleCreateSchoolAdmin = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a school admin."
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a school admin."
          }
        />,
      );
      return;
    }
    createAdmin(formData);
  };
  return (
    <>
      <div className="drawer-content px-2 pt-2">
        <div>
          <label htmlFor="firstName" className="font-size-sm">
            First Name
          </label>
          <TextInput
            onChange={(value) => {
              handleStateChange("first_name", value, setFormData);
            }}
            placeholder={"Enter First Name"}
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: true,
              messages: {
                required: "First Name Required",
                min: "First Name Must Be Atleast 3 characters Long",
                max: "First Name Must Not Exceed 50 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("first_name", value, setFieldValid)
            }
            value={formData.first_name}
            ref={firstNameRef}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="font-size-sm">
            Last Name
          </label>
          <TextInput
            onChange={(value) =>
              handleStateChange("last_name", value, setFormData)
            }
            placeholder={"Enter Last Name"}
            onValidationChange={(value) =>
              handleStateChange("last_name", value, setFieldValid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: true,
              messages: {
                required: "Last Name Required",
                min: "Last Name Must Be Atleast 3 Characters Long",
                max: "Last Name Must Not Exceed 50 Characters",
              },
            })}
            value={formData.last_name}
            ref={lastNameRef}
          />
        </div>
        <div>
          <label htmlFor="fullname" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => handleStateChange("name", value, setFormData)}
            placeholder={"Enter Full Names"}
            onValidationChange={(value) =>
              handleStateChange("name", value, setFieldValid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: true,
              messages: {
                required: "Full Name Required",
                min: "Full Names Must Be Atleast 3 Characters Long",
                max: "Full Names Must Not Exceed 150 Characters",
              },
            })}
            value={formData.name}
            ref={fullNameRef}
          />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">
            Email
          </label>
          <TextInput
            onChange={(value) => handleStateChange("email", value, setFormData)}
            placeholder={"example@gmail.com"}
            onValidationChange={(value) =>
              handleStateChange("email", value, setFieldValid)
            }
            type="email"
            validationSchema={emailValidationSchema({
              required: true,
            })}
            value={formData.email}
            ref={emailRef}
          />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleCreateSchoolAdmin()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create School Admin"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateSchoolAdmin;
