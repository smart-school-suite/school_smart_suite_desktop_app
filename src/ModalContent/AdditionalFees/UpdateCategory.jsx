import { useUpdateAdditionalFeeCategory } from "../../hooks/additionalFee/useUpdateAdditionalFeeCategory";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { TextInput } from "../../components/FormComponents/InputComponents";
function UpdateCategory({ handleClose, rowData }) {
  const {id:categoryId, title } = rowData;
  const [formData, setFormData] = useState({
    title: "",
  });
    const [isValid, setIsValid] = useState({
    title: "",
  });
  const handleFieldValid = (field, value) => {
     setIsValid((prev) => ({ ...prev, [field]:value }))
  }
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateCategory, isPending } =
    useUpdateAdditionalFeeCategory(handleClose);
  const handleUpdateCategory = () => {
    updateCategory({categoryId:categoryId, updateData:formData});
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update Additional Category</span>
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
          <label htmlFor="categoryName" className="font-size-sm">Category Name</label>
          <TextInput 
            placeholder={title}
            onChange={(value) => handleInputChange('title', value)}
            onValidationChange={(value) => handleFieldValid('title', value)}
            validationSchema={nameSchema({
                min:3,
                max:100,
                required:false,
                message:{
                   min:"Category Name Must Be Atleast 3 Characters Long",
                   max:"Category Name Must Not Exceed 100 Characters",
                }
            })}
            value={formData.title}
          />
        </div>
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateCategory();
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
