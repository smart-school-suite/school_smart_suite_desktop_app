import { useState } from "react";
import{
  TextInput,
  GenderSelector
} from "../../components/FormComponents/InputComponents";
import {
  firstNameSchema,
  lastNameSchema,
  emailValidationSchema,
  fullNameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudent } from "../../hooks/student/useCreateStudent";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetAllParents } from "../../hooks/parent/useGetParents";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
function CreateStudent({ handleClose }) {
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValid = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };
  const { data: specialties, isFetching: isSpecialtiesLoading } =
    useGetSpecialties();
  const { data: studentBatch, isFetching: isStudentBatchLoading } =
    useGetBatches();
  const { data: parents, isFetching: isParentsLoading } = useGetAllParents();
  const handleCreateStudent = () => {
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
      <div>
        <label htmlFor="firstName" className="font-size-sm">
          First Name
        </label>
        <TextInput
          onChange={(value) => handleInputChange("first_name", value)}
          onValidationChange={(value) => handleValid("first_name", value)}
          validationSchema={firstNameSchema}
          placeholder={"Enter Student First Name"}
        />
      </div>
      <div>
        <label htmlFor="lastName" className="font-size-sm">
          Last Name
        </label>
        <TextInput
          onChange={(value) => handleInputChange("last_name", value)}
          onValidationChange={(value) => handleValid("last_name", value)}
          validationSchema={lastNameSchema}
          placeholder={"Enter Student Last Name"}
        />
      </div>
      <div>
        <label htmlFor="fullNames" className="font-size-sm">
          Full Names
        </label>
        <TextInput
          onChange={(value) => handleInputChange("name", value)}
          onValidationChange={(value) => handleValid("name", value)}
          validationSchema={fullNameSchema}
          placeholder={"Enter Full Names"}
        />
      </div>
      <div>
        <label htmlFor="email" className="font-size-sm">
          Email
        </label>
        <TextInput
          onChange={(value) => handleInputChange("email", value)}
          onValidationChange={(value) => handleValid("email", value)}
          validationSchema={emailValidationSchema}
          placeholder={"e.g example@gmail.com"}
        />
      </div>
      <div>
        <label htmlFor="gender" className="font-size-sm">Gender</label>
        <GenderSelector
          onSelect={(value) => handleInputChange("gender", value)}
          onError={(value) => handleFieldError("gender", value)}
          error={errors.gender}
        />
      </div>
      <div>
        <label htmlFor="studentBatch" className="font-size-sm">
          Student Batch
        </label>
        <CustomDropdown
          data={studentBatch?.data || []}
          displayKey={["name"]}
          valueKey={["id"]}
          direction="up"
          onSelect={(value) => handleInputChange("student_batch_id", value.id)}
          isLoading={isStudentBatchLoading}
        />
      </div>
      <div>
        <label htmlFor="specialty" className="font-size-sm">
          Specialty
        </label>
        <CustomDropdown
          data={specialties?.data || []}
          displayKey={["specialty_name", "level_name"]}
          valueKey={["id"]}
          direction="up"
          onSelect={(value) => handleInputChange("specialty_id", value.id)}
          placeholder="Select Specialty"
          isLoading={isSpecialtiesLoading}
        />
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
          onSelect={(value) => handleInputChange("guardian_id", value.id)}
          isLoading={isParentsLoading}
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
