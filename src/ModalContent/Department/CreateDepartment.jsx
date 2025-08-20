import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateDepartment } from "../../hooks/department/useCreateDepartment";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, hasNonEmptyValue } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateDepartment({ handleClose }) {
  const departmentNameRef = useRef();
  const descriptionRef = useRef();
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
   const [isFieldValid, setFieldValid] = useState({
     department_name: "",
     description: "",
  });
    const { 
    mutate: createDepartmentMutation,
    isPending, 
  } = useCreateDepartment(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }; 
  const handlePrevalidation = async () => {
      const departmentName = await departmentNameRef.current.triggerValidation();
      const description = await descriptionRef.current.triggerValidation();
      return {
         departmentName,
         description
      }
  }
  const handleSubmit = async () => {
     const prevalidation = await handlePrevalidation();
     if(!allFieldsValid(prevalidation)){
        toast.custom(
           <ToastWarning 
             title={"Invalid Fields"}
             description={"Please ensure all fields are valid before creating a department."}
           />
        )
        return
     }
     if(!allFieldsValid(isFieldValid)){
        toast.custom(
           <ToastWarning 
             title={"Invalid Fields"}
             description={"Please ensure all fields are valid before creating a department."}
           />
        )
        return;
     }
    createDepartmentMutation(formData);
  };
  return (
    <div>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Create Department</span>
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
      <div>
        <label htmlFor="departmentName" className="font-size-sm">Department Name</label>
        <TextInput 
           placeholder={"e.g Engineering Department"}
           onChange={(value) => handleStateChange('department_name', value, setFormData)}
           onValidationChange={(value) => handleStateChange('department_name', value, setFieldValid)}
           validationSchema={nameSchema({
             min:3,
             max:100,
             required:true,
             messages:{
               required:"Department Name Required",
               min:"Department Name Must Be Atleast 3 characters Long",
               max:"Department Description Must Not Exceed 100 Characters"
             }
           })}
          value={formData.value}
          ref={departmentNameRef}
        />
      </div>
      <div>
        <label htmlFor="description" className="font-size-sm">Department Description</label>
        <TextAreaInput 
          placeholder={`Write a short description of ${formData.department_name}`}
          onChange={(value) => handleStateChange('description', value, setFormData)}
          onValidationChange={(value) => handleStateChange('description', value, setFieldValid)}
          validationSchema={textareaSchema({
             min:10,
             max:1000,
             required:true,
             messages:{
               required:"Department Description Required!",
               min:"Description Must Be Atleast 10 characters long",
               max:"Description Must Not Exceed 1000 characters"
             }
          })}
          ref={descriptionRef}
          value={formData.description}
        />
      </div>
      </div>
      <div className="mt-4">
        <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleSubmit();
            }}
          >
            {

            isPending ? <SingleSpinner />: "Create Department"
             }
          </button>
      </div>
    </div>
  );
}
export default CreateDepartment;
