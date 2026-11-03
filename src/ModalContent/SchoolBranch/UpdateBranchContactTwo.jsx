import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolBranchContactTwo({ handleClose }) {
  const [formData, setFormData] = useState({
    phone_two: "",
  });
  const [isValid, setIsValid] = useState({
    phone_two: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "Contact Two"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Branch Contact Two");
  const handleUpdateSchool = () => {
    if (optionalValidateObject(isValid) == false) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
      return;
    }
    clearFormError();
    update({ updateData: formData }, { onError: handleServerError });
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
          <label htmlFor="contactTwo" className="font-size-sm">
            Contact Two
          </label>
          <PhoneNumberInput
            onChange={(value) =>
              handleStateChange("phone_two", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("phone_two", value, setIsValid)
            }
            validationSchema={phoneValidationSchema({
              optional: true,
              prefixes: ["6", "2"],
            })}
            value={formData.phone_two}
          />
        </div>
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
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
export default UpdateSchoolBranchContactTwo;
