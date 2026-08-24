import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateDepartment } from "../../hooks/department/useCreateDepartment";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, hasNonEmptyValue } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
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
  const { mutate: createDepartmentMutation, isPending } =
    useCreateDepartment(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const departmentName = await departmentNameRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    return {
      departmentName,
      description,
    };
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a department."
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a department."
          }
        />,
      );
      return;
    }
    createDepartmentMutation(formData);
  };
  return (
    <>
      <div className="drawer-content px-2 pt-2">
        <div>
          <label htmlFor="departmentName" className="font-size-sm">
            Department Name
          </label>
          <TextInput
            placeholder={"e.g Engineering Department"}
            onChange={(value) =>
              handleStateChange("department_name", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("department_name", value, setFieldValid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 100,
              required: true,
              messages: {
                required: "Department Name Required",
                min: "Department Name Must Be Atleast 3 characters Long",
                max: "Department Description Must Not Exceed 100 Characters",
              },
            })}
            value={formData.value}
            ref={departmentNameRef}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">
            Department Description
          </label>
          <TextAreaInput
            placeholder={`Write a short description of ${formData.department_name}`}
            onChange={(value) =>
              handleStateChange("description", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("description", value, setFieldValid)
            }
            validationSchema={textareaSchema({
              min: 10,
              max: 1000,
              required: true,
              messages: {
                required: "Department Description Required!",
                min: "Description Must Be Atleast 10 characters long",
                max: "Description Must Not Exceed 1000 characters",
              },
            })}
            ref={descriptionRef}
            value={formData.description}
          />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Department"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateDepartment;
