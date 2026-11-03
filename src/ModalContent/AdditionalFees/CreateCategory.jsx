import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useCreateAdditionalFeeCategory } from "../../hooks/additionalFee/useCreateAdditionalFeeCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {  nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function CreateCategory({ handleClose }) {
  const titleRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
  });
  const [isValid, setIsValid] = useState({
    title: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    return {
      title,
    };
  }
  const { mutate: createCategory, isPending } =
    useCreateAdditionalFeeCategory(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Category");
  const handleCreateCategory = () => {
    const prevalidation = handlePrevalidation();
     if (!allFieldsValid(prevalidation)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    clearFormError();
    createCategory(formData, { onError: handleServerError });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Create Additional Category</span>
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
       <FormErrorBanner
         ref={errorBannerRef}
         error={formError}
         onDismiss={clearFormError}
         className="mb-2"
       />
       <div>
         <div>
          <label htmlFor="categoryTitle" className="font-size-sm">Category Name</label>
          <TextInput 
            onChange={(value) => handleStateChange('title', value, setFormData)}
            onValidationChange={(value) => handleStateChange('title', value, setIsValid)}
            validationSchema={nameSchema({ 
                min:3,
                max:100,
                required:true,
                messages:{
                   min:"Category Name Must Be Atleast 3 Characters Long",
                   max:"Category Name Must Not Exceed 100 Characters",
                   required:"Category Name Required"
                }
             })}
            placeholder={"e.g Student Id Card"}
            value={formData.title}
            ref={titleRef}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleCreateCategory();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Create Category"}
        </button>
       </div>
      </div>
    </>
  );
}
export default CreateCategory;
