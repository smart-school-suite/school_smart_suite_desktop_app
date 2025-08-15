import { useState } from "react";
import { Icon } from "@iconify/react";
import { useCreateExpenseCategory } from "../../hooks/expenseCategory/useCreateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { categoryNameSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateCategory({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
  });
   const [isValid, setIsValid] = useState({
    name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidField = (field, value) => {
    setIsValid((prev) => ({...prev, [field]:value }))
  }
  const { mutate: createCategory, isPending } = useCreateExpenseCategory(handleClose);
  const handleCreateCategory = () => {
    createCategory(formData);
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Create Expenses Category</span>
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
            placeholder={"E.g Utility Bills, Maintainance Bills"}
            validationSchema={categoryNameSchema(3, 100)}
            onChange={(value) => handleInputChange('name', value)}
            onValidationChange={(value) => handleValidField('name', value)}
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
    </>
  );
}
export default CreateCategory;
