import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { urlSchema } from "../../ComponentConfig/YupValidationSchema";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolBranchWebsite({ handleClose }) {
  const [formData, setFormData] = useState({
    website: "",
  });
  const [isValid, setIsValid] = useState({
     website:"",
  })
  const handleChangeState = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "website"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Branch Website");
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
            <span className="m-0">Update website</span>
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
          <label htmlFor="website" className="font-size-sm">Website</label>
          <TextInput 
            type="url"
            placeholder="e.g https://www.example.com"
            onChange={(value) =>  handleChangeState('website', value, setFormData)}
            onValidationChange={(value) =>  handleChangeState('state', value, setIsValid)}
            value={formData.website}
            validationSchema={urlSchema(true)}
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
          {isPending ? <SingleSpinner /> : "Update website"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchWebsite;
