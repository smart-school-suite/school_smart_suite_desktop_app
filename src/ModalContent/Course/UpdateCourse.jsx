import { NumberInput, TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateCourse } from "../../hooks/course/useUpdateCourse";
import { courseCodeSchema, courseCreditSchema, courseDescriptionSchema, courseTitleSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateCourse({ handleClose, rowData }) {
  const { id: courseId, course_code, course_title, credit, description } = rowData;
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description: "",
  });
  const { mutate: updateCourse, isPending } = useUpdateCourse(
    handleClose,
    courseId
  );
  const { data: specialty, isFetching: isSpecailtyLoading } =
    useGetSpecialties();
  const { data: semesters, isLoading: isSemesterLoading } = useGetSemester();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidChange = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    updateCourse({ courseId, updateData: formData });
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
              <span className="m-0">Update Course</span>
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
          <div>
            <label htmlFor="courseTitle" className="font-size-sm">
              Course Title
            </label>
            <TextInput
              placeholder={course_title}
              onChange={(value) => handleInputChange("course_title", value)}
              onValidationChange={(value) =>
                handleValidChange("course_title", value)
              }
              validationSchema={courseTitleSchema}
            />
          </div>
          <div>
            <label htmlFor="courseCode" className="font-size-sm">
              Course Code
            </label>
            <TextInput
              placeholder={course_code}
              onChange={(value) => handleInputChange("course_code", value)}
              onValidationChange={(value) =>
                handleValidChange("course_code", value)
              }
              validationSchema={courseCodeSchema}
            />
          </div>
          <div>
            <label htmlFor="courseCredit" className="font-size-sm">
              Course Credit
            </label>
            <NumberInput
              placeholder={credit}
              onChange={(value) => handleInputChange("credit", value)}
              onValidationChange={(value) => handleValidChange("credit", value)}
              validationSchema={courseCreditSchema}
            />
          </div>
          <div>
            <label htmlFor="semester" className="font-size-sm">Semester</label>
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
                onSelect={(value) => handleInputChange('semester_id', value.id)}
              />
            )}
          </div>
          <div>
            <label htmlFor="specialty" className="font-size-sm">Specialty</label>
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
                renameMapping={{
                  id: "id",
                  specialty_name: "specialty_name",
                  leve_name: "level_name",
                }}
                isLoading={isSpecailtyLoading}
                direction="up"
                onSelect={(value) => handleInputChange('specialty_id', value.id)}
              />
            )}
          </div>
          <div>
         <label htmlFor="courseDescription" className="font-size-sm">Course Description</label>
         <TextAreaInput 
           onChange={(value) => handleInputChange('description', value)}
           validationSchema={courseDescriptionSchema}
           onValidationChange={(value) => handleValidChange('description', value)}
           placeholder={description}
         />
      </div>
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
              {isPending ? <SingleSpinner /> : "Update Course"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateCourse;
