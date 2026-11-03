import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import {  useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolBranchCity({ handleClose }) {
  const [formData, setFormData] = useState({
    city: "",
  });
  const [isValid, setIsValid] = useState({
      city:""
  })
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "city"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Branch City");
  const handleUpdate = () => {
    if(optionalValidateObject(isValid) == false){
          setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting")
          return;
      }
      if(hasNonEmptyValue(formData) == false){
          setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting")
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
            <span className="m-0">Update city</span>
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
          <label htmlFor="city" className="font-size-sm">City</label>
          <TextInput 
             onChange={(value) => handleStateChange('city', value, setFormData)}
             onValidationChange={(value) => handleStateChange('city', value, setIsValid)}
              value={formData.city}
               placeholder={"Enter City"} 
               validationSchema={nameSchema({
                  required:false,
                  min:2,
                  max:150,
                  messages:{
                     min:"City Name Must Be Atleast 2 Characters Long",
                     max:"City Name Must Not Exceed 150 Characters"
                  }
               })} 
               type="city"
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
          {isPending ? <SingleSpinner /> : "Update city"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchCity;
