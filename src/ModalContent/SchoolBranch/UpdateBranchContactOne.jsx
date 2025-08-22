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
import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateSchoolBranchContactOne({ handleClose }) {
  const [formData, setFormData] = useState({
    phone_one: "",
  });
  const [isValid, setIsInvalid] = useState({
    phone_one: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "Contact One"
  );
  const handleUpdateSchool = () => {
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
            <span className="m-0">Update Contact</span>
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
          <label htmlFor="contactOne" className="font-size-sm">
            Contact One
          </label>
          <PhoneNumberInput
            onChange={(value) =>
              handleStateChange("phone_one", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("phone_one", value, setIsInvalid)
            }
            validationSchema={phoneValidationSchema({
              optional: true,
              prefixes: ["6", "2"],
            })}
            value={formData.phone_one}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateSchool();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Contact"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchContactOne;
