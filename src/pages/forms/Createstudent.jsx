import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  FullNamesInput,
  PhoneNumberInput,
  FirstNameInput,
  LastNameInput,
} from "../../components/formComponents";
import { useState } from "react";
import {
  useFetchDepartmentsQuery,
  useFetchEducationLevelsQuery,
  useFetchParentsQuery,
  useFetchSpecialtiesQuery,
  useFetchStudentBatchQuery,
} from "../../Slices/Asynslices/fetchSlice";
import { useAddStudentMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import CustomDropdown from "../../components/Dropdowns";
function Createstudent() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    DOB: "",
    gender: "",
    phone_one: "",
    level_id: "",
    specialty_id: "",
    department_id: "",
    guadian_one_id: "",
    guadian_two_id: "",
    parent_id: "",
    email: "",
    password: "",
    student_batch_id: "",
  });

  const {
    data: department,
    isLoading: isDepartmentLoading,
    error: departmentError,
  } = useFetchDepartmentsQuery();
  const {
    data: education_level,
    isLoading: isEducationLevelLoading,
    error: educationLevelError,
  } = useFetchEducationLevelsQuery();
  const {
    data: specialty,
    isLoading: isSpecailtyLoading,
    error: specailtyError,
  } = useFetchSpecialtiesQuery();
  const {
    data: parents,
    isLoading: isParentsLoading,
    error: parentsError,
  } = useFetchParentsQuery();
  const {
    data: student_batches,
    isLoading: isStudentBatchLoading,
    error: studentBatchError,
  } = useFetchStudentBatchQuery();

  const [addStudent] = useAddStudentMutation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleDepartmentSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      department_id: selectedValues.id,
    }));
  };

  const handleSpecialtySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      specialty_id: selectedValues.id,
    }));
  };

  const handleSelectEducationLevel = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      level_id: selectedValues.id,
    }));
  };

  const handleSelectGuardianOne = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      guadian_one_id: selectedValues.id,
    }));
  };

  const handleSelectGuardianTwo = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      guadian_two_id: selectedValues.id,
    }));
  };

  const handleStudentBatchSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      student_batch_id: selectedValues.id,
    }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addStudent(formData).unwrap();
      toast.success("Student created successfully!");
      navigate("/students");
    } catch (error) {
      toast.error("Failed to create Student. Try again.");
    }
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <p className="my-0 fs-6 fw-semibold">Add New Student</p>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 px-4 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/students");
            }}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100">
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h5 className="text-center">Create New Teachers</h5>
          </div>
          <div className="my-1">
            <div className="d-flex flex-row gap-2 w-100 my-1">
              <div className="w-50">
                <FirstNameInput
                  onChange={(value) => handleInputChange("first_name", value)}
                  onValidationChange={handleValidation}
                  value={formData.first_name}
                />
              </div>
              <div className="w-50">
                <LastNameInput
                  onChange={(value) => handleInputChange("last_name", value)}
                  onValidationChange={handleValidation}
                  value={formData.last_name}
                />
              </div>
            </div>
            <div className="d-flex flex-row gap-2 w-100 my-1">
              <div className="w-50">
                <FullNamesInput
                  onChange={(value) => handleInputChange("name", value)}
                  value={formData.name}
                  onValidationChange={handleValidation}
                />
              </div>
              <div className="w-50">
                <EmailInput
                  onChange={(value) => handleInputChange("email", value)}
                  value={formData.email}
                  onValidationChange={handleValidation}
                />
              </div>
            </div>
            <div className="w-100 d-flex flex-row align-items-center gap-2">
              <div className="w-50">
              <PhoneNumberInput
                onChange={(value) => handleInputChange("phone_one", value)}
                value={formData.phone_one}
                onValidationChange={handleValidation}
              />
              </div>
              <div className="my-1 w-50">
              <span>Password</span>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                placeholder="Enter Strong Password"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              </div>
            </div>
            <div className="d-flex flex-row gap-2 w-100 my-1">
              <div className="w-50">
                <span>Date of Birth (DOB)</span>
                <input
                  type="date"
                  className="form-control"
                  name="DOB"
                  value={formData.DOB}
                  onChange={(e) => handleInputChange("DOB", e.target.value)}
                />
              </div>
              <div className="w-50">
                <span>Gender</span>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  placeholder="Female, Male"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-100">
                <span>Level</span>
                {isEducationLevelLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={education_level.education_level}
                    displayKey={["name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "name"]}
                    renameMapping={{ id: "id", name: "name" }}
                    isLoading={isEducationLevelLoading}
                    direction="up"
                    onSelect={handleSelectEducationLevel}
                  />
                )}
              </div>
              <div className="my-1 w-100">
                <span>Department</span>
                {isDepartmentLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={department.department}
                    displayKey={["department_name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "department_name"]}
                    renameMapping={{
                      id: "id",
                      department_name: "department_name",
                    }}
                    isLoading={isDepartmentLoading}
                    direction="up"
                    onSelect={handleDepartmentSelect}
                  />
                )}
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-50">
                <span>Specailty</span>
                {isSpecailtyLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={specialty.specialty}
                    displayKey={["specialty_name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "specialty_name"]}
                    renameMapping={{
                      id: "id",
                      specialty_name: "specialty_name",
                    }}
                    isLoading={isSpecailtyLoading}
                    direction="up"
                    onSelect={handleSpecialtySelect}
                  />
                )}
              </div>
              <div className="w-50 my-1">
                <span>Student Batches</span>
                {isStudentBatchLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={student_batches.student_batches}
                    displayKey={["name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "name"]}
                    renameMapping={{ id: "id", name: "name" }}
                    isLoading={isStudentBatchLoading}
                    direction="up"
                    onSelect={handleStudentBatchSelect}
                  />
                )}
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-100">
                <span>Guardian One</span>
                {isParentsLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={parents.parents}
                    displayKey={["name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "name"]}
                    renameMapping={{
                      id: "id",
                      name: "name",
                    }}
                    isLoading={isParentsLoading}
                    direction="up"
                    onSelect={handleSelectGuardianOne}
                  />
                )}
              </div>
              <div className="my-1 w-100">
                <span>Guardian Two</span>
                {isParentsLoading ? (
                  <select name="" className="form-select">
                    <option value="">loading</option>
                  </select>
                ) : (
                  <CustomDropdown
                    data={parents.parents}
                    displayKey={["name"]}
                    valueKey={["id"]}
                    filter_array_keys={["id", "name"]}
                    renameMapping={{
                      id: "id",
                      name: "name",
                    }}
                    isLoading={isParentsLoading}
                    direction="up"
                    onSelect={handleSelectGuardianTwo}
                  />
                )}
              </div>
            </div>
            <button 
               className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background"
               disabled={!isValid}
               onClick={() => {
                 handleSubmit();
               }}
               >
              Create Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createstudent;
