import { useRef, useState } from "react";
import { InputGroup,TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import {  useCreateSpecialty } from "../../hooks/specialty/useCreateSpecialty";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useSelector } from "react-redux";
import { nameSchema, numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateSpecialty({ handleClose }) {
  const currency = useSelector(
  (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? ''
);
 const specialtyNameRef = useRef();
 const registrationFeeRef = useRef();
 const descriptionRef = useRef();
  const schoolFeesRef = useRef();
  const educationLevelRef = useRef();
  const departmentRef = useRef();
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

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
     const specialtyName = await specialtyNameRef.current.triggerValidation();
     const department = await departmentRef.current.triggerValidation();
     const level = await educationLevelRef.current.triggerValidation();
     const registrationFee = await registrationFeeRef.current.triggerValidation();
     const schoolFee = await schoolFeesRef.current.triggerValidation();
     const description = await descriptionRef.current.triggerValidation(); 
     return {
        specialtyName,
        department,
        level,
        registrationFee,
        schoolFee,
        description
     }
  }
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
          <ToastWarning 
             title={"Invalid Fields"}
             description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
          />
        )
        return
    }
    if(!allFieldsValid(isFieldValid)){
      toast.custom(
        <ToastWarning 
          title={"Invalid Fields"}
          description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
        />
      )
      return
    }
     const payload = {
      specialty_name: formData.specialty_name,
      registration_fee: formData.registration_fee,
      school_fee: formData.school_fee,
      department_id: formData.department_id.id,
      level_id: formData.level_id.id,
      description: formData.description,
    };
    createSpecialtyMutation(payload);
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
        ref={specialtyNameRef}
        placeholder={"e.g Software Engineering"}
        onChange={(value) =>  handleStateChange('specialty_name', value, setFormData)}
        onValidationChange={(value) => handleStateChange('specialty_name', value, setIsFieldValid)}
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
        value={formData.specialty_name}
       />
      </div>
      <div className="d-flex flex-row w-100 gap-2">
        <div className="w-50">
        <label htmlFor="registrationFeeRef" className="font-size-sm">Registration Fees</label>
        <InputGroup 
          ref={registrationFeeRef}
          placeholder={"E.g 80,000"}
          onChange={(value) => handleStateChange('registration_fee', value, setFormData)}
          onValidationChange={(value) => handleStateChange('registration_fee', value, setIsFieldValid)}
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
          value={formData.registration_fee}
        />
      </div>
      <div className="w-50">
        <label htmlFor="schoolFeesRef" className="font-size-sm">School Fees</label>
        <InputGroup 
         ref={schoolFeesRef}
         placeholder={"e.g 150,000"}
         onChange={(value) => handleStateChange('school_fee', value, setFormData)}
         onValidationChange={(value) => handleStateChange('school_fee', value, setIsFieldValid)}
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
         value={formData.school_fee}
        />
      </div>
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
            onSelect={(value) => handleStateChange('department_id', value, setFormData)}
            placeholder="Select Department"
            error={errors.department_id}
            onError={(value) => handleStateChange('department_id', value, setErrors)}
            errorMessage="Department Required"
            ref={departmentRef}
            value={formData.department_id}
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
            onSelect={(value) => handleStateChange('level_id', value, setFormData)}
            placeholder="Select Level"
            error={errors.level_id}
            onError={(value) => handleStateChange('level_id', value, setErrors)}
            errorMessage="Level Required"
            ref={educationLevelRef}
            value={formData.level_id}
          />
      </div>
      <div>
        <label htmlFor="specialtyDescription" className="font-size-sm">Specialty Description</label>
        <TextAreaInput 
           onValidationChange={(value) =>  handleStateChange('description', value, setIsFieldValid)}
           onChange={(value) => handleStateChange('description', value, setFormData)}
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
          value={formData.description}
          ref={descriptionRef}
        />
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={handleSubmit}
          >
           { isPending ? <SingleSpinner /> : "Create Specialty" }
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateSpecialty;
