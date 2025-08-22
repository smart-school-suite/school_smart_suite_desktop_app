import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateSchoolBranchEmail({ handleClose }) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isValid, setIsValid] = useState({
    email: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "email"
  );
  const handleUpdate = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />
      );
      return;
    }
    update({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update email</span>
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
        <div className="my-1">
          <label htmlFor="email" className="font-size-sm">
            E-mail
          </label>
          <TextInput
            onChange={(value) => handleStateChange("email", value, setFormData)}
            value={formData.email}
            onValidationChange={(value) => handleStateChange('email', value, setIsValid)}
            validationSchema={emailValidationSchema({
              required: false,
            })}
            placeholder={"e.g Example@gmail.com"}
            type="email"
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update email"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchEmail;
