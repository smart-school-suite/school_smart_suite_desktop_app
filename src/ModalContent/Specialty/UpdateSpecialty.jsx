import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  SpecialtyTitleInput,
  SchoolFeeInput,
  RegistrationFeeInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useUpdateSpecialty } from "../../hooks/specialty/useUpdateSpecialty";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { useGetLevels } from "../../hooks/level/useGetLevels";
function UpdateSpecialty({  handleClose, rowData }) {
  const specialtyId = rowData.id;
  const { data: specialty, isFetching:specialtyIsFetching } = useGetSpecialtyDetails(specialtyId);
  const { mutate: updateSpecialty, isPending } = useUpdateSpecialty(handleClose);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description: "",
  });
  const { data: educationLevels, isFetching: educationIsLoading } =
    useGetLevels();

  const { data: departments, isFetching: departmentIsLoading } =
    useGetDepartments();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleEducationSelect = (selectedValues) => {
    setFormData((prevalue) => ({ ...prevalue, level_id: selectedValues.id }));
  };

  const handleDepartmentSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      department_id: selectedValues.id,
    }));
  };
  const handleSpecialtyUpdate = async () => {
    if (!isValid) return;
    updateSpecialty({ specialtyId, updateData:formData });
  };
  if (specialtyIsFetching) {
    return <SingleSpinner />;
  }
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Update Specialty</h5>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <SpecialtyTitleInput
            onValidationChange={handleValidation}
            value={formData.specialty_name}
            onChange={(value) => handleInputChange("specialty_name", value)}
            placeholder={specialty.data.specialty_name ?? null}
          />
        </div>
        <div className="d-flex flex-row align-item-center gap-2">
        <div className="my-1">
          <RegistrationFeeInput
            onValidationChange={handleValidation}
            value={formData.registration_fee}
            onChange={(value) => handleInputChange("registration_fee", value)}
            placeholder={specialty.data.registration_fee ?? null}
          />
        </div>
        <div className="my-1">
          <SchoolFeeInput
            onValidationChange={handleValidation}
            value={formData.school_fee}
            onChange={(value) => handleInputChange("school_fee", value)}
            placeholder={specialty.data.school_fee ?? null}
          />
        </div>
        </div>
        <div className="my-1">
          <span>Department</span>
          {departmentIsLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={departments.data}
              displayKey={["department_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "department_name"]}
              renameMapping={{ id: "id", department_name: "department_name" }}
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
              data={educationLevels.data}
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
        <div class="my-2">
          <label for="exampleFormControlTextarea1" className="form-label">
            Specialty Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder={
              specialty.data.description === null || " "
                ? formData.specialty_name === null || ""
                  ? "Write A short Description Of the department"
                  : ` Write A short Description Of ${formData.specialty_name}`
                : specialty.data.description
            }
          ></textarea>
        </div>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={handleSpecialtyUpdate}
          >
            {isPending ? <SingleSpinner /> : <>Update Specialty</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateSpecialty;
