import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  CourseCodeInput,
  CourseTitleInput,
  CourseCreditInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useCreateCourse } from "../../hooks/course/useCreateCourse";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
function CreateCourse({ handleClose }) {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description:"",
  });
  const { mutate:createCourseMutation, isPending } = useCreateCourse(handleClose, formData.specialty_Id, formData.semester_Id);
  const { data:specialty, isFetching:isSpecailtyLoading  } = useGetSpecialties();
  const { data: semesters, isLoading: isSemesterLoading } = useGetSemester();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleSemesterSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      semester_id: selectedValues.id,
    }));
  };

  const handleSpecialtySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      specialty_id: selectedValues.id,
    }));
  };
  const handleSubmit = async () => {
    if (!isValid) return;
    createCourseMutation(formData)
    
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row align-items-center">
        <div className="w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Create Course</span>
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
      </div>
      <div className="modal-content-container">
         <div className="my-1">
        <CourseTitleInput
          onValidationChange={handleValidation}
          value={formData.course_title}
          onChange={(value) => handleInputChange("course_title", value)}
          placeholder={"Enter Course Title"}
        />
      </div>
      <div className="my-1">
        <CourseCreditInput
          onValidationChange={handleValidation}
          value={formData.course_code}
          onChange={(value) => handleInputChange("credit", value)}
        />
      </div>
      <div className="my-1">
        <CourseCodeInput
          onValidationChange={handleValidation}
          value={formData.course_code}
          onChange={(value) => handleInputChange("course_code", value)}
        />
      </div>
      <div className="my-1">
        <span>Semester</span>
        {isSemesterLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={semesters.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isSemesterLoading}
            direction="up"
            onSelect={handleSemesterSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Specialty</span>
        {isSemesterLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={specialty.data}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name", "level_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name", leve_name:"level_name" }}
            isLoading={isSpecailtyLoading}
            direction="up"
            onSelect={handleSpecialtySelect}
          />
        )}
      </div>
       <div>
            <span>Description</span>
            <textarea name="description" placeholder="Enter Course Descripton"
              className="form-control"
              onChange={(e) => handleInputChange('description', e.target.value)}
            ></textarea>
      </div>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={!isValid}
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateCourse;
