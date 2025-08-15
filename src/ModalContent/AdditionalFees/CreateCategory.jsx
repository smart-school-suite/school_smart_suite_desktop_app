import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCreateAdditionalFeeCategory } from "../../hooks/additionalFee/useCreateAdditionalFeeCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { categoryNameSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateCategory({ handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
  });
  const [isValid, setIsValid] = useState({
    title: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
     setIsValid((prev) => ({ ...prev, [field]:value }))
  }
  const { mutate: createCategory, isPending } =
    useCreateAdditionalFeeCategory(handleClose);
  const handleCreateCategory = () => {
    createCategory(formData);
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
       <div>
         <div>
          <label htmlFor="categoryTitle" className="font-size-sm">Category Name</label>
          <TextInput 
            onChange={(value) => handleInputChange('title', value)}
            onValidationChange={(value) => handleFieldValid('title', value)}
            validationSchema={categoryNameSchema({ min:10, max:50 })}
            placeholder={"e.g Student Id Card"}
            value={formData.title}
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
