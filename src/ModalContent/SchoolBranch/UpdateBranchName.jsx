import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolBranchName({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isValid, setIsInvalid] = useState({
     name:""
  })
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "name"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Branch Name");
  const handleUpdate = () => {
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
            <span className="m-0">Update name</span>
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
          <label htmlFor="schoolName" className="font-size-sm">School Branch Name</label>
          <TextInput 
            onChange={(value) => handleStateChange('name', value, setFormData)}
            onValidationChange={(value) => handleStateChange('name', value, setIsInvalid)}
            validationSchema={nameSchema({
                min:3,
                max:150,
                required:false,
                message:{
                    min:"School Branch Name Must Be Atleast 3 Characters Long",
                    max:"School Branch Name Must Not Exceed 150 Characters"
                }
            })}
            value={formData.name}
            type="text"
            placeholder="Enter School Branch Name"
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
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update name"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchName;
