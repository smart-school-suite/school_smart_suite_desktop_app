import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useUpdateDepartment } from "../../hooks/department/useUpdateDepartment";
import { useGetDepartmentDetails } from "../../hooks/department/useGetDepartmentDetails";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateDepartment({ handleClose, rowData }) {
  const { mutate: updateDepartment, isPending } =
    useUpdateDepartment(handleClose);
  const { id: departmentId, department_name, description } = rowData;
  const { data: departmentDetails, isLoading } =
    useGetDepartmentDetails(departmentId);
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    department_name: "",
    description: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleDepartmentUpdate = () => {
    if(optionalValidateObject(isFieldValid) == false){
         toast.custom(
          <ToastWarning 
            title={"Invalid Fields"}
            description={"Please ensure all fields are valid before updating."}
          />
         )
         return;
    }

    if(hasNonEmptyValue(formData) ==  false){
      toast.custom(
        <ToastWarning 
          title={"Nothing to Update"}
          description={"Please ensure all fields are filled before updating."}
        />
      );
      return;
    }
    updateDepartment({ departmentId, updateData: formData });
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Update Department</span>
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
            <label htmlFor="departmentName" className="font-size-sm">
              Department Name
            </label>
            <TextInput
              placeholder={
                isLoading
                  ? department_name
                  : departmentDetails.data.department_name
              }
              onChange={(value) => handleStateChange("department_name", value, setFormData)}
              onValidationChange={(value) =>
                handleStateChange("department_name", value, setFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 100,
                required: false,
                messages: {
                  min: "Department Name Must Be Atleast 3 characters Long",
                  max: "Department Description Must Not Exceed 100 Characters",
                },
              })}
            />
          </div>
          <div>
            <label htmlFor="description" className="font-size-sm">
              Department Description
            </label>
            <TextAreaInput
              placeholder={
                isLoading ? description : departmentDetails.data.description
              }
              onChange={(value) => handleStateChange("description", value, setFormData)}
              onValidationChange={(value) =>
                handleStateChange("description", value, setFieldValid)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: false,
                messages: {
                  min: "Description Must Be Atleast 10 characters long",
                  max: "Description Must Not Exceed 1000 characters",
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="w-100  position-relative mt-2 py-2">
        <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
          <button
            className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm"
            onClick={handleDepartmentUpdate}
          >
            {isPending ? <SingleSpinner /> : <> Update Department</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateDepartment;
