import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdmin } from "../../hooks/schoolAdmin/useUpdateSchoolAdmin";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { allFieldsValid, objectHasEmpty } from "../../utils/functions";
import { emailValidationSchema, firstNameSchema, fullNameSchema, lastNameSchema } from "../../ComponentConfig/YupValidationSchema";
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidChange = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleAdminUpdate = () => {
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
                handleInputChange("first_name", value);
              }}
              placeholder={first_name}
              validationSchema={firstNameSchema}
              onValidationChange={(value) =>
                handleValidChange("first_name", value)
              }
            />
          </div>
        <div>
            <label htmlFor="lastname" className="font-size-sm">
              Last Name
            </label>
            <TextInput
              onChange={(value) => {
                handleInputChange("last_name", value);
              }}
              placeholder={last_name}
              validationSchema={lastNameSchema}
              onValidationChange={(value) =>
                handleValidChange("last_name", value)
              }
            />
          </div>
        <div>
          <label htmlFor="fullnames" className="font-size-sm">Full Names</label>
          <TextInput
              onChange={(value) => {
                handleInputChange("name", value);
              }}
              placeholder={name}
              validationSchema={fullNameSchema}
              onValidationChange={(value) =>
                handleValidChange("name", value)
              }
            />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">Email</label>
          <TextInput 
             onChange={(value) => {
                handleInputChange("name", value);
              }}
              placeholder={email}
              validationSchema={emailValidationSchema}
              onValidationChange={(value) =>
                handleValidChange("email", value)
              }
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
