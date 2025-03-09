import { useState } from "react";
import { useAddSpecialtyMutation } from "../../Slices/Asynslices/postSlice";
function CreateSpecialty({ handleClose }) {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
      specialty_name: "",
      registration_fee: "",
      school_fee: "",
      department_id: "",
      level_id: "",
    });
    const [addSpecialty] = useAddSpecialtyMutation();
    const {
      data: education_level,
      error: educationError,
      isLoading: educationIsLoading,
  } = useFetchEducationLevelsQuery();
  
  const { 
      data: department,
      error: departmentError,
      isLoading: departmentIsLoading,
  } = useFetchDepartmentsQuery();
  
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleValidation = (isInputValid) => {
      setIsValid(isInputValid);
    };
     
    const handleEducationSelect = (selectedValues) => {
      setFormData((prevalue) => ({...prevalue, level_id:selectedValues.id}))
      console.log('Selected Education Level:', selectedValues);
    };
  
    const handleDepartmentSelect = (selectedValues) => {
      setFormData((prevalue) => ({...prevalue, department_id:selectedValues.id}))
      console.log('Selected Department:', selectedValues);
    };
  
    const handleSubmit = async () => {
      if (!isValid) return;
      try {
        await addSpecialty(formData).unwrap();
        toast.success("Department created successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to create department. Try again.");
      }
    };
    return (
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <h5>Create Specialty</h5>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
              nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <SpecialtyTitleInput
            onValidationChange={handleValidation}
            value={formData.specialty_name}
            onChange={(value) => handleInputChange("specialty_name", value)}
          />
        </div>
        <div className="my-1">
          <RegistrationFeeInput
            onValidationChange={handleValidation}
            value={formData.registration_fee}
            onChange={(value) => handleInputChange("registration_fee", value)}
          />
        </div>
        <div className="my-1">
          <SchoolFeeInput
            onValidationChange={handleValidation}
            value={formData.school_fee}
            onChange={(value) => handleInputChange("school_fee", value)}
          />
        </div>
        <div className="my-1">
          <span>Department</span>
          {departmentIsLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={department.department}
              displayKey={["department_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "department_name"]}
              renameMapping={{ id: "id", department_name:"department_name" }}
              isLoading={departmentIsLoading}
              direction="up"
              onSelect={handleDepartmentSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Level</span>
          {educationIsLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={education_level.education_level}
              displayKey={["name", "level"]}
              valueKey={["id"]}
              filter_array_keys={["id", "name", "level"]}
              renameMapping={{ id: "id", name: "name", level: "level" }}
              isLoading={educationIsLoading}
              direction="up"
              onSelect={handleEducationSelect}
            />
          )}
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
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default CreateSpecialty;