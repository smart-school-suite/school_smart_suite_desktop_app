import { NumberInput, TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateCourse } from "../../hooks/course/useUpdateCourse";
import { courseCodeSchema, nameSchema, numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
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
  const [errors, setErrors] = useState({
    specialty_id: "",
    semester_id: "",
  })
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
     const handleFieldError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message
    }));
  };
  cons
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
              validationSchema={nameSchema({
                  min:3,
                  max:150,
                  required:false,
                  messages:{
                     min:"Course Title Must Be Atleast 3 Characters Long",
                     max:"Course Title Must Not Exceed 150 Characters"
                  }
              })}
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
              validationSchema={courseCodeSchema({
                  required:false,
                  min:3,
                  max:10,
                  messages:{
                     min:"Course Code Must Be Atleast 3 Characters Long",
                     max:"Course Code Must Not Exceed 10 Characters"
                  }
              })}
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
              validationSchema={numberSchema({
                  min:1,
                  max:10,
                  required:false,
                  integerOnly:true,
                  messages:{
                     min:"Course Credit Must Be Atleast 1",
                     max:"Course Code Must Not Exceed 10"
                  }
              })}
            />
          </div>
          <div>
            <label htmlFor="semester" className="font-size-sm">Semester</label>
              <CustomDropdown
                data={semesters.data}
                displayKey={["name"]}
                valueKey={["id"]}
                filter_array_keys={["id", "name"]}
                renameMapping={{ id: "id", name: "name" }}
                isLoading={isSemesterLoading}
                direction="up"
                onSelect={(value) => handleInputChange('semester_id', value.id)}
                error={errors.semester_id}
                onError={(value) => handleFieldError('semester_id', value)}
                placeholder="Select Semester"
              />
          </div>
          <div>
            <label htmlFor="specialty" className="font-size-sm">Specialty</label>
              <CustomDropdown
                data={specialty.data}
                displayKey={["specialty_name", "level_name"]}
                valueKey={["id"]}
                isLoading={isSpecailtyLoading}
                direction="up"
                onSelect={(value) => handleInputChange('specialty_id', value.id)}
                error={errors.specialty_id}
                onError={(value) => handleFieldError('specialty_id', value)}
                placeholder="Select Specailty"
              />
          </div>
          <div>
         <label htmlFor="courseDescription" className="font-size-sm">Course Description</label>
         <TextAreaInput 
           onChange={(value) => handleInputChange('description', value)}
           validationSchema={textareaSchema({
               min:10,
               max:1000,
               required:false,
               messages:{
                 min:"Description Must Be Atleast 10 Characters Long",
                 max:"Description Must Not Exceed 1000 Characters"
               }
           })}
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
