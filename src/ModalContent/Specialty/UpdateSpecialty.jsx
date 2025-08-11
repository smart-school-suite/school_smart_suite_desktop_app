import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { NumberInput, TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useUpdateSpecialty } from "../../hooks/specialty/useUpdateSpecialty";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import { registrationFeeValidationSchema, schoolFeeValidationSchema, specialtyDescriptionSchema, specialtyValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { formatNumber } from "../../utils/functions";
function UpdateSpecialty({  handleClose, rowData }) {
  const { id:specialtyId, specialty_name, registration_fee, tuition_fee, description } = rowData;
  const { mutate: updateSpecialty, isPending } = useUpdateSpecialty(handleClose);
  const [formData, setFormData] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description: "",
  });
  const [isFieldValid, setIsFieldValid] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description:""
  });
  const { data: educationLevels, isFetching: educationIsLoading } =
    useGetLevels();

  const { data: departments, isFetching: departmentIsLoading } =
    useGetDepartments();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
   const handleFieldValid = (field, value) => {
    setIsFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleSpecialtyUpdate = async () => {
    updateSpecialty({ specialtyId, updateData:formData });
  };
  return (
    <>
      <div className="card w-100 border-none">
         <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <span className="m-0">Update Specialty</span>
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
                <label htmlFor="specialtyName" className="font-size-sm">Specialty Name</label>
               <TextInput 
                placeholder={specialty_name}
                onChange={(value) =>  handleInputChange('specialty_name', value)}
                onValidationChange={(value) => handleFieldValid('specialty_name', value)}
                validationSchema={specialtyValidationSchema}
               />
              </div>
              <div>
                <label htmlFor="registrationFees" className="font-size-sm">Registration Fees</label>
                <NumberInput 
                 placeholder={formatNumber(registration_fee)}
                 onChange={(value) => handleInputChange('registration_fee', value)}
                 onValidationChange={(value) => handleFieldValid('registration_fee', value)}
                 step="0.01"
                 validationSchema={registrationFeeValidationSchema}
                />
              </div>
              <div>
                <label htmlFor="schoolFees" className="font-size-sm">School Fees</label>
                <NumberInput 
                 placeholder={formatNumber(tuition_fee)}
                 onChange={(value) => handleInputChange('school_fee', value)}
                 onValidationChange={(value) => handleFieldValid('school_fee', value)}
                 step="0.01"
                 validationSchema={schoolFeeValidationSchema}
                />
              </div>
        <div>
          <label htmlFor="departmentName" className="font-size-sm">Department Name</label>
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
              direction="up"
              onSelect={(value) => handleInputChange('department_id', value.id)}
            />
          )}
        </div>
        <div>
          <label htmlFor="level" className="font-size-sm">Level</label>
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
              direction="up"
              onSelect={(value) => handleInputChange('level_id', value.id)}
            />
          )}
        </div>
        <div>
        <label htmlFor="specialtyDescription" className="font-size-sm">Specialty Description</label>
        <TextAreaInput 
           onValidationChange={(value) =>  handleFieldValid('description', value)}
           onChange={(value) => handleInputChange('description', value)}
           placeholder={description}
          validationSchema={specialtyDescriptionSchema}
        />
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
