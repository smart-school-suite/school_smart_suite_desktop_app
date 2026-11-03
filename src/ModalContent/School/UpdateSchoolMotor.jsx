import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import { textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolMotor({ handleClose }) {
  const [formData, setFormData] = useState({
    motor: "",
  });
  const [isValid, setIsValid] = useState({
     motor:""
  })
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateMotor, isPending } = useUpdateSchool(
    handleClose,
    "motor"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Motor");
  const handleUpdateMotor = () => {
       if (optionalValidateObject(isValid) == false) {
          setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
          return;
        }
        if (hasNonEmptyValue(formData) == false) {
          setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
          return;
        }
    clearFormError();
    updateMotor({ updateData:formData }, { onError: handleServerError });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update School Motor</span>
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
          <label htmlFor="schoolMotor" className="font-size-sm">School Motor</label>
          <TextAreaInput 
            onChange={(value) => handleStateChange('motor', value, setFormData)}
            onValidationChange={(value) => handleStateChange('motor', value, setIsValid)}
            value={formData.motor}
            optional={true}
            validationSchema={textareaSchema({
                min:10,
                max:100,
                required:false,
                messages:{
                   min:"School Motor Must Be Atleast 10 characters Long",
                   max:"School Motor Must Not Exceed 100 Characters"
                }
            })}
            placeholder={"Enter School Motor"}
          />
          </div>
          <FormErrorBanner
            ref={errorBannerRef}
            error={formError}
            onDismiss={clearFormError}
            className="mb-2"
          />
          <button
            className="border-none px-3 mt-4 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdateMotor();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update School Motor"}
          </button>    
      </div>
    </>
  );
}
export default UpdateSchoolMotor;
