import { useState } from "react";
import { DepartmentNameInput } from "../../components/FormComponents/InputComponents";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateDepartment } from "../../hooks/department/useCreateDepartment";
function CreateDepartment({ handleClose }) {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    createDepartmentMutation(formData);
  };
  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Create Department</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
      </div>
      <div className="my-1">
        <DepartmentNameInput
          onValidationChange={handleValidation}
          value={formData.department_name}
          onChange={(value) => handleInputChange("department_name", value)}
        />
      </div>
      <div class="my-2">
        <label for="exampleFormControlTextarea1" className="form-label">
          Department Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder={
            formData.department_name === null || ""
              ? "Write A short Description Of the department"
              : ` Write A short Description Of ${formData.department_name}`
          }
        ></textarea>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            disabled={!isValid}
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
    </div>
  );
}
export default CreateDepartment;
