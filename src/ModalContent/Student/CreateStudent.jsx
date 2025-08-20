import { useRef, useState } from "react";
import{
  TextInput
} from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  nameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudent } from "../../hooks/student/useCreateStudent";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetAllParents } from "../../hooks/parent/useGetParents";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { gender } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateStudent({ handleClose }) {
  const nameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const specialtyRef = useRef();
  const studentBatchRef = useRef();
  const guardianRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
    email: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
  });
  const { mutate: createStudent, isPending } = useCreateStudent(handleClose);
  const handlePrevalidation = async () => {
      const email = emailRef.current.triggerValidation();
      const firstName = firstNameRef.current.triggerValidation();
      const lastName = lastNameRef.current.triggerValidation();
      const fullName = nameRef.current.triggerValidation();
      const specialty = specialtyRef.current.triggerValidation();
      const studentBatch = studentBatchRef.current.triggerValidation();
      const gender = genderRef.current.triggerValidation();
      const guardian = guardianRef.current.triggerValidation();

      return {
         email,
         firstName,
         lastName,
         fullName,
         specialty,
         studentBatch,
         gender,
         guardian
      }
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { data: specialties, isFetching: isSpecialtiesLoading } =
    useGetSpecialties();
  const { data: studentBatch, isFetching: isStudentBatchLoading } =
    useGetBatches();
  const { data: parents, isFetching: isParentsLoading } = useGetAllParents();
  const handleCreateStudent = async () => {
     const prevalidation = await handlePrevalidation();
     if(!allFieldsValid(prevalidation)){
        toast.custom(
          <ToastWarning 
              title={"Invalid Fields"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
         />  
        )
        return;
     }
     if(!allFieldsValid(isValid)){
       toast.custom(
          <ToastWarning 
              title={"Invalid Fields"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
         />  
        )
        return
     }
    createStudent(formData);
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Create Student</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <div className="w-50">
        <label htmlFor="firstName" className="font-size-sm">
          First Name
        </label>
        <TextInput
          onChange={(value) => handleStateChange("first_name", value, setFormData)}
          onValidationChange={(value) => handleStateChange("first_name", value, setIsValid)}
          value={formData.first_name}
          validationSchema={nameSchema({
             min:3,
             max:50,
             required:true,
             messages:{
               required:"First Name Required",
               min:"First Name Must Be Atleast 3 characters Long",
               max:"First Name Must Not Exceed 50 Characters"
             }
          })}
          placeholder={"Enter Student First Name"}
          ref={firstNameRef}
        />
      </div>
      <div className="w-50">
        <label htmlFor="lastName" className="font-size-sm">
          Last Name
        </label>
        <TextInput
          onChange={(value) => handleStateChange("last_name", value, setFormData)}
          onValidationChange={(value) => handleStateChange("last_name", value, setIsValid)}
          validationSchema={nameSchema({
             min:3,
             max:50,
             required:true,
             messages:{
               required:"Last Name Required",
               min:"Last Name Must Be Atleast 3 Characters Long",
               max:"Last Name Must Not Exceed 50 Characters"
             }
          })}
          placeholder={"Enter Student Last Name"}
          ref={lastNameRef}
        />
      </div>
      </div>
      <div>
        <label htmlFor="fullNames" className="font-size-sm">
          Full Names
        </label>
        <TextInput
          onChange={(value) => handleStateChange("name", value, setFormData)}
          onValidationChange={(value) => handleStateChange("name", value, setIsValid)}
          validationSchema={nameSchema({
              min:3,
              max:150,
              messages:{
                 required:"Full Name Required",
                 min:"Full Names Must Be Atleast 3 Characters Long",
                 max:"Full Name Must Not Exceed 150 Characters"
              }
          })}
          placeholder={"Enter Full Names"}
          ref={nameRef}
        />
      </div>
      <div>
        <label htmlFor="email" className="font-size-sm">
          Email
        </label>
        <TextInput
          onChange={(value) => handleStateChange("email", value, setFormData)}
          onValidationChange={(value) => handleStateChange("email", value, setIsValid)}
          validationSchema={emailValidationSchema({
              required:true
          })}
          value={formData.email}
          placeholder={"e.g example@gmail.com"}
          ref={emailRef}
        />
      </div>
      <div>
        <label htmlFor="gender" className="font-size-sm">Gender</label>
        <CustomDropdown 
          data={gender}
          displayKey={['name']}
          valueKey={['name']}
          direction="up"
          onSelect={(value) => handleStateChange('gender', value.name, setFormData)}
          onError={(value) => handleStateChange('gender', value, setErrors)}
          errorMessage="Gender Required"
          error={errors.gender}
          placeholder="Select Gender"
          ref={genderRef}
        />
      </div>
     <div className="d-flex flex-row align-items-center gap-2">
       <div className="w-50">
        <label htmlFor="studentBatch" className="font-size-sm">
          Student Batch
        </label>
        <CustomDropdown
          data={studentBatch?.data || []}
          displayKey={["name"]}
          valueKey={["id"]}
          direction="up"
          onSelect={(value) => handleStateChange("student_batch_id", value.id, setFormData)}
          isLoading={isStudentBatchLoading}
          onError={(value) => handleStateChange('student_batch_id', value, setErrors)}
          errorMessage="Student Batch Required"
          error={errors.student_batch_id}
          placeholder="Select Student Batch"
          ref={studentBatchRef}
        />
      </div>
      <div className="w-50">
        <label htmlFor="specialty" className="font-size-sm">
          Specialty
        </label>
        <CustomDropdown
          data={specialties?.data || []}
          displayKey={["specialty_name", "level_name"]}
          valueKey={["id"]}
          direction="up"
          onSelect={(value) => handleStateChange("specialty_id", value.id, setFormData)}
          placeholder="Select Specialty"
          isLoading={isSpecialtiesLoading}
          error={errors.specialty_id}
          onError={(value) => handleStateChange('specialty_id', value, setErrors)}
          errorMessage="Specialty Required"
          ref={specialtyRef}
        />
      </div>
     </div>
      <div className="my-1">
        <label htmlFor="guardian" className="font-size-sm">
          Select Guardian
        </label>
        <CustomDropdown
          data={parents?.data || []}
          displayKey={["guardian_name"]}
          valueKey={["id"]}
          direction="up"
          onSelect={(value) => handleStateChange("guardian_id", value.id, setFormData)}
          isLoading={isParentsLoading}
          error={errors.guardian_id}
          onError={(value) => handleStateChange('guardian_id', value, setErrors)}
          errorMessage="Guardian Required"
          placeholder="Select Guardian"
          ref={guardianRef}
        />
      </div>
      <div className="mt-3">
        <button
          onClick={() => {
            handleCreateStudent();
          }}
          className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
        >
          {isPending ? <SingleSpinner /> : "Create Student"}
        </button>
      </div>
    </>
  );
}
export default CreateStudent;
