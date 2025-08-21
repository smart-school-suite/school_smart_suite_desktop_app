import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useCreateExpenseCategory } from "../../hooks/expenseCategory/useCreateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {  nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateCategory({ handleClose }) {
  const nameRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
  });
   const [isValid, setIsValid] = useState({
    name: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({...prev, [field]:value }))
  }
  const handlePrevalidation = async () => {
      const name = await nameRef.current.triggerValidation();
      return {
          name
      }
  }  
  const { mutate: createCategory, isPending } = useCreateExpenseCategory(handleClose);
  const handleCreateCategory = () => {
    const prevalidation = handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
           <ToastWarning 
               title={"Invalid Fields"}
               description={"Please Ensure All Fields Are Valid Before Submitting"}
           />
        )
        return;
    }
     if(!allFieldsValid(isValid)){
        toast.custom(
           <ToastWarning 
               title={"Invalid Fields"}
               description={"Please Ensure All Fields Are Valid Before Submitting"}
           />
        )
        return;
    }
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
            validationSchema={nameSchema({
               min:3,
               max:100,
               required:true,
               messages:{
                 required:"Category Name Required",
                 min:"Category Name Must Be Atleast 3 Characters",
                 max:"Category Name Must Not Exceed 100 Characters"
               }
            })}
            onChange={(value) => handleStateChange('name', value, setFormData)}
            onValidationChange={(value) => handleStateChange('name', value, setIsValid)}
            value={formData.name}
            ref={nameRef}
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
