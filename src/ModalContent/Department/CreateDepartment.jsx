import { useState } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateDepartment } from "../../hooks/department/useCreateDepartment";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { departmentDescriptionSchema, departmentValidationSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateDepartment({ handleClose }) {
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
   const handleValidChange = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
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
           onChange={(value) => handleInputChange('department_name', value)}
           onValidationChange={(value) => handleValidChange('department_name', value)}
           validationSchema={departmentValidationSchema}
        />
      </div>
      <div>
        <label htmlFor="description" className="font-size-sm">Department Description</label>
        <TextAreaInput 
          placeholder={`Write a short description of ${formData.department_name}`}
          onChange={(value) => handleInputChange('description', value)}
          onValidationChange={(value) => handleValidChange('description', value)}
          validationSchema={departmentDescriptionSchema}
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
