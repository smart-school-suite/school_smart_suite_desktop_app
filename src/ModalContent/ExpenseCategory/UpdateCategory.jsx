import { useUpdateExpenseCategory } from "../../hooks/expenseCategory/useUpdateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateCategory({ handleClose, rowData }) {
  const { id: categoryId, name } = rowData;
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]:value }));
  }
  const { mutate: updateCategory, isPending } = useUpdateExpenseCategory();
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Category");
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
    updateCategory({ categoryId: categoryId, updateData: formData }, { onError: handleServerError });
  };
  return (
    <>
      <div>
       <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update Expenses Category</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        <div>
          <label htmlFor="categoryName" className="font-size-sm">Category Name</label>
          <TextInput 
            onChange={(value) => handleStateChange('name', value, setFormData)}
            onValidationChange={(value) => handleStateChange('name', value, setIsValid)}
            validationSchema={nameSchema({
              min: 3,
              max: 100,
              required: false,
              messages: {
                min: "Category Name Must Be Atleast 3 Characters",
                max: "Category Name Must Not Exceed 100 Characters",
              },
            })}
            placeholder={name}
            value={formData.name}
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
          {isPending ? <SingleSpinner /> : "Update Category"}
        </button>
      </div>
    </>
  );
}
export default UpdateCategory;
