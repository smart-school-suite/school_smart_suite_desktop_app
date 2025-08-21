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
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateCategory({ handleClose, rowData }) {
  const { id: categoryId, name } = rowData;
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]:value }));
  }
  const { mutate: updateCategory, isPending } = useUpdateExpenseCategory();
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
    updateCategory({ categoryId: categoryId, updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
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
