import { useUpdateExpenseCategory } from "../../hooks/expenseCategory/useUpdateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { categoryNameSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateCategory({ handleClose, rowData }) {
  const { id: categoryId, name } = rowData;
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid  = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]:value }));
  }
  const { mutate: updateCategory, isPending } = useUpdateExpenseCategory();
  const handleUpdate = () => {
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
            onChange={(value) => handleInputChange('name', value)}
            onValidationChange={(value) => handleFieldValid('name', value)}
            validationSchema={categoryNameSchema(3, 50, true)}
            placeholder={name}
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
