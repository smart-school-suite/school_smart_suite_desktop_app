import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdmin } from "../../hooks/schoolAdmin/useUpdateSchoolAdmin";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema, nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
const UpdateSchoolAdmin = ({ rowData, handleClose }) => {
  const { id: schoolAdminId, email, first_name, last_name, name } = rowData;
  const { mutate: update, isPending } = useUpdateSchoolAdmin(handleClose);
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
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
  const handleAdminUpdate = () => {
    if(optionalValidateObject(isFieldValid) == false){
      toast.custom(
        <ToastWarning 
          title={"Invalid Fields"}
          description={"Please ensure all fields are valid before updating."}
        />
      );
      return;
    }
    if(hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning 
          title={"Nothing to Update"}
          description={"Please ensure all fields are filled before updating."}
        />
      );
      return;
    }
    update({ schoolAdminId, updateData: formData });
  };
  return (
    <>
      <div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0 fw-semibold">Update School Admin</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="firstname" className="font-size-sm">
            First Name
          </label>
          <TextInput
            onChange={(value) => {
              handleStateChange("first_name", value, setFormData);
            }}
            placeholder={first_name}
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: false,
              messages: {
                min: "First Name Must Be Atleast 3 characters Long",
                max: "First Name Must Not Exceed 50 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("first_name", value, setFieldValid)
            }
            value={formData.first_name}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="font-size-sm">
            Last Name
          </label>
          <TextInput
            onChange={(value) => {
              handleStateChange("last_name", value, setFormData);
            }}
            placeholder={last_name}
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: false,
              messages: {
                min: "Last Name Must Be Atleast 3 Characters Long",
                max: "Last Name Must Not Exceed 50 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("last_name", value, setFieldValid)
            }
          />
        </div>
        <div>
          <label htmlFor="fullnames" className="font-size-sm">
            Full Names
          </label>
          <TextInput
            onChange={(value) => {
              handleStateChange("name", value, setFormData);
            }}
            placeholder={name}
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: false,
              messages: {
                min: "Full Names Must Be Atleast 3 Characters Long",
                max: "Full Names Must Not Exceed 150 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("name", value, setFieldValid)
            }
          />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">
            Email
          </label>
          <TextInput
            onChange={(value) => {
              handleStateChange("name", value, setFormData);
            }}
            placeholder={email}
            validationSchema={emailValidationSchema({
               required:true
            })}
            onValidationChange={(value) => handleStateChange("email", value, setFieldValid)}
            type="email"
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
            {isPending ? <SingleSpinner /> : <> Update Admin</>}
          </button>
        </div>
      </div>
    </>
  );
};
export default UpdateSchoolAdmin;
