import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { useUpdateStudent } from "../../hooks/student/useUpdateStudent";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetAllParents } from "../../hooks/parent/useGetParents";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { gender } from "../../data/data";
function UpdateStudent({ handleClose, rowData }) {
  const {id:studentId, first_name, last_name, name, email }= rowData;
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
    gender: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
  });
  const { mutate: updateStudent, isPending } = useUpdateStudent(
    handleClose,
    studentId
  );
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]: value }));
  };
  const { data: specialties, isFetching: isSpecialtiesLoading } =
    useGetSpecialties();

  const { data: studentBatch, isFetching: isStudentBatchLoading } =
    useGetBatches();
  const { data: parents, isFetching: isParentsLoading } = useGetAllParents();
  const handleUpdateStudent = () => {
    updateStudent({ studentId, updateData: formData });
  };
  if (isStudentDetailsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Update Student</span>
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
          value={formData.name}
          validationSchema={nameSchema({
            min: 3,
            max: 50,
            required: false,
            message: {
              min: "First Name Must Be Atleast 3 Characters Long",
              max: "First Name Must Not Exceed 50 Characters",
            },
          })}
          placeholder={first_name}
          onValidationChange={(value) => handleFieldValid('first_name', value)}
        />
      </div>
      <div>
        <label htmlFor="lastName" className="font-size-sm">
          Last Name
        </label>
        <TextInput
          onChange={(value) => handleInputChange("last_name", value)}
          onValidationChange={(value) => handleValid("last_name", value)}
          validationSchema={nameSchema({
            min: 3,
            max: 50,
            required: false,
            messages: {
              min: "Last Name Must Be Atleast 3 Characters Long",
              max: "Last Name Must Not Exceed 50 Characters",
            },
          })}
          placeholder={last_name}
        />
      </div>
      <div>
        <label htmlFor="firstName" className="font-size-sm">
          Full Names
        </label>
        <TextInput
          onChange={(value) => handleInputChange("name", value)}
          onValidationChange={(value) => handleValid("name", value)}
          validationSchema={nameSchema({
            min: 3,
            max: 150,
            messages: {
              min: "Full Names Must Be Atleast 3 Characters Long",
              max: "Full Name Must Not Exceed 150 Characters",
            },
          })}
          placeholder={name}
          type="first_name"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-size-sm">Email</label>
        <TextInput
          onChange={(value) => handleInputChange("email", value)}
          onValidationChange={(value) => handleValid("email", value)}
          validationSchema={emailValidationSchema({
             required:false
          })}
          placeholder={email}
          value={formData.email}
          type="email"
        />
      </div>
      <div>
        <label htmlFor="gender" className="font-size-sm">Gender</label>
        <CustomDropdown 
          data={gender}
          displayKey={['name']}
          valueKey={['name']}
          direction="up"
          onSelect={(value) => handleInputChange('gender', value.name)}
          onError={(value) => handleFieldError('gender', value)}
          errorMessage="Gender Required"
          error={errors.gender}
          placeholder="Select Gender"
        />
      </div>
      <div>
        <label htmlFor="studentBatch" className="font-size-sm">Student Batch</label>
          <CustomDropdown
            data={studentBatch.data}
            displayKey={["name"]}
            valueKey={["id"]}
            isLoading={isStudentBatchLoading}
            direction="up"
            onSelect={(value) => handleInputChange('student_batch_id', value)}
            placeholder="Select Student Batch"
            error={errors.student_batch_id}
            onError={(value) => handleFieldError('student_batch_id', value)}
            errorMessage="Student Batch Required"
          />
      </div>
      <div>
        <label htmlFor="specialty" className="font-size-sm">Specialty</label>
          <CustomDropdown
            data={specialties.data}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            isLoading={isSpecialtiesLoading}
            direction="up"
            onSelect={(value) => handleInputChange('specialty_id', value)}
            onError={(value) => handleFieldError('specialty_id', value)}
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            placeholder="Select Specialty"
          />
      </div>
      <div>
        <label htmlFor="guardian" className="font-size-sm">Guardian</label>
          <CustomDropdown
            data={parents.data}
            displayKey={["guardian_name"]}
            valueKey={["id"]}
            isLoading={isParentsLoading}
            direction="up"
            onSelect={(value) => handleInputChange('guardian_id', value)}
            onError={(value) => handleFieldError('guardian_id', value)}
            error={errors.guardian_id}
            errorMessage="Guardian Required"
            placeholder="Select Specialty"
          />
      </div>
      <div className="mt-3">
        <button
          onClick={() => {
            handleUpdateStudent();
          }}
          className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
        >
          {isPending ? <SingleSpinner /> : "Update Student"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudent;
