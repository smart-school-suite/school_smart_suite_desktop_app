import { useState } from "react";
import { InputGroup,TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import {  useCreateSpecialty } from "../../hooks/specialty/useCreateSpecialty";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useSelector } from "react-redux";
import { nameSchema, numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateSpecialty({ handleClose }) {
      const currencyState = useSelector((state) => state.auth.user);
    const currency =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description:""
  });
  const [isFieldValid, setIsFieldValid] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description:""
  });
  const [errors, setErrors] = useState({
     department_id: "",
    level_id: "",
  })
  const { mutate: createSpecialtyMutation, isPending } = useCreateSpecialty(handleClose); 
  const {
    data: educationLevels,
    isLoading: educationIsLoading,
  } = useGetLevels();

  const {
    data: departments,
    isFetching: departmentIsLoading,
  } = useGetDepartments();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
    setIsFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({...prev, [field]:value}))
  }
  const handleSubmit = async () => {
    createSpecialtyMutation(formData)
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Create Specialty</span>
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
        placeholder={"e.g Software Engineering"}
        onChange={(value) =>  handleInputChange('specialty_name', value)}
        onValidationChange={(value) => handleFieldValid('specialty_name', value)}
        validationSchema={nameSchema({
            min:3,
            max:150,
            required:true,
            messages:{
               required:"Specialty Name Required", 
               min:`Specialty Name Must Be Atleast 3 Characters`,
               max:`Specialty Name Must Not Exceed 150 Characters`
            }
        })}
       />
      </div>
      <div>
        <label htmlFor="registrationFees" className="font-size-sm">Registration Fees</label>
        <InputGroup 
          placeholder={"E.g 80,000"}
          onChange={(value) => handleInputChange('registration_fee', value)}
          onValidationChange={(value) => handleFieldValid('registration_fee', value)}
          step="0.01"
          validationSchema={numberSchema({ 
            min:1, 
            max:500000,
            required:true,
            messages:{
               max:`Registration Fees Must Not Exceed 500000 ${currency}`,
               min:`Registration Fees Must Be Atleast 1 ${currency}`,
               required:"Registration Fees Required"
            }
          })}
          InputGroupText={currency}
        />
      </div>
      <div>
        <label htmlFor="schoolFees" className="font-size-sm">School Fees</label>
        <InputGroup 
         placeholder={"e.g 150,000"}
         onChange={(value) => handleInputChange('school_fee', value)}
         onValidationChange={(value) => handleFieldValid('school_fee', value)}
         step="0.01"
         validationSchema={numberSchema({ 
          min:1, 
          max:1000000,
          integerOnly:false,
          messages:{
             max:`School Fee Must Not Exceeed 1000000  ${currency}`,
             min:`School Fee Must Be Atleast 1 ${currency}`,
             required:"School Fee Required"
          }
        })}
         type="number"
         InputGroupText={currency}
        />
      </div>
      <div>
        <label htmlFor="departmentName" className="font-size-sm">Department Name</label>
          <CustomDropdown
            data={departments?.data || []}
            displayKey={["department_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "department_name"]}
            renameMapping={{ id: "id", department_name: "department_name" }}
            isLoading={departmentIsLoading}
            direction="up"
            onSelect={(value) => handleInputChange('department_id', value.id)}
            placeholder="Select Department"
            error={errors.department_id}
            onError={(value) => handleFieldError('department_id', value)}
          />
      </div>
      <div>
        <label htmlFor="level" className="font-size-sm">Level</label>
          <CustomDropdown
            data={educationLevels?.data || []}
            displayKey={["name", "level"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name", "level"]}
            renameMapping={{ id: "id", name: "name", level: "level" }}
            isLoading={educationIsLoading}
            direction="up"
            onSelect={(value) => handleInputChange('level_id', value.id)}
            placeholder="Select Level"
            error={errors.level_id}
            onError={(value) => handleFieldError('level_id', value)}
          />
      </div>
      <div>
        <label htmlFor="specialtyDescription" className="font-size-sm">Specialty Description</label>
        <TextAreaInput 
           onValidationChange={(value) =>  handleFieldValid('description', value)}
           onChange={(value) => handleInputChange('description', value)}
           placeholder={ formData.specialty_name === null || ""
                  ? "Write A short Description Of Specialty"
                  : ` Write A short Description Of ${formData.specialty_name}`}
          validationSchema={textareaSchema({
              min:10,
              max:1000,
              required:true,
              messages:{
                 min:"Description Must Be Atleast 10 Characters",
                 max:"Description Must Not Exceed 1000 Characters",
                 required:"Description Is Required"
              }
          })}

        />
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
           { isPending ? <SingleSpinner /> : "Create Specialty" }
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateSpecialty;
