import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useCreateCourse } from "../../hooks/course/useCreateCourse";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { NumberInput, TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { courseCodeSchema, nameSchema, numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateCourse({ handleClose }) {
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description:"",
  });
  const [isFieldValid, setFieldValid] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description:"",
  });
    const [errors, setErrors] = useState({
    specialty_id: "",
    semester_id: "",
  })
  const { mutate:createCourseMutation, isPending } = useCreateCourse(handleClose, formData.specialty_Id, formData.semester_Id);
  const { data:specialty, isFetching:isSpecailtyLoading  } = useGetSpecialties();
  const { data: semesters, isLoading: isSemesterLoading } = useGetSemester();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidChange = (field, value) => {
    setFieldValid((prev) => ({ ...prev, [field]: value }));
  };
   const handleFieldError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message
    }));
  };
  const handleSubmit = async () => {
    createCourseMutation(formData)
  };

  return (
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
      <div>
        <div>
          <label htmlFor="courseTitle" className="font-size-sm">Course Title</label>
         <TextInput 
           placeholder={"e.g Engineering Mathematics"}
           onChange={(value) => handleInputChange('course_title', value)}
           onValidationChange={(value) => handleValidChange('course_title', value)}
           validationSchema={nameSchema({
             min:3,
             max:150,
             required:true,
             messages:{
                required:"Course Title Required",
                min:"Course Title Must Be Atleast 3 Characters Long",
                max:"Course Title Must Not Exceed 150 Characters"
             }
           })}
         />
        </div>
      <div>
        <label htmlFor="courseCode" className="font-size-sm">Course Code</label>
        <TextInput 
         placeholder={"e.g SWE005"}
         onChange={(value) => handleInputChange('course_code', value)}
         onValidationChange={(value) => handleValidChange('course_code', value)}
         validationSchema={courseCodeSchema({
            min:3,
            max:10,
            required:true,
            messages:{
               required:"Course Code Required",
               min:"Course Code Must Be Atleast 3 Characters Long",
               max:"Course Code Must Not Exceed 10 Characters"
            }
         })}
        />
      </div>
      <div>
        <label htmlFor="courseCredit" className="font-size-sm">Course Credit</label>
        <NumberInput 
         placeholder={"e.g 2 Credit"}
         onChange={(value) => handleInputChange('credit', value)}
         onValidationChange={(value) => handleValidChange('credit', value)}
         validationSchema={numberSchema({
             min:1,
             max:100,
             required:true,
             integerOnly:true,
             messages:{
                required:"Course Credit Required",
                min:"Course Credit Must Be Atleast 1",
                max:"Course Credit Must Not Exceed 100"
             }
         })}
        />
      </div>
      <div>
        <label htmlFor="semester" className="font-size-sm">Semester</label>
          <CustomDropdown
            data={semesters?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) => handleInputChange('semester_id', value.id)}
            isLoading={isSemesterLoading}
            error={errors.semester_id}
            errorMessage="Semester Required"
            onError={(msg) => handleFieldError("semester_id", msg)}
            placeholder="Select Semester"
          />
      </div>
      <div>
        <label htmlFor="specialty" className="font-size-sm">Specialty</label>
          <CustomDropdown
            data={specialty?.data || []}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) => handleInputChange('specialty_id', value.id)}
            isLoading={isSpecailtyLoading}
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) =>  handleFieldError("specialty_id", msg)}
            placeholder="Select Specialty"
          />
      </div>
       <div>
         <label htmlFor="courseDescription" className="font-size-sm">Course Description</label>
         <TextAreaInput 
           onChange={(value) => handleInputChange('description', value)}
           validationSchema={textareaSchema({
               min:10,
               max:1000,
               messages:{
                  required:"Course Description Required",
                  min:"Course Description Must Be Atleast 10 Characters Long",
                  max:"Course Description Must Not Exceed 1000 Characters"
               }
           })}
           onValidationChange={(value) => handleValidChange('description', value)}
           placeholder={formData.course_title ? `Enter A Short Description For ${formData.course_title}` : 
             "Enter A Short Description Of The Course"
           }
         />
      </div>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
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
