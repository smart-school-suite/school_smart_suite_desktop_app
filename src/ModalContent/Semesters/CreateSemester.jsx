import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
function CreateSemester({ handleClose }) {
  const dateRangeRef = useRef();
  const semesterRef = useRef();
  const schoolYearRef = useRef();
  const { data: schoolAcademicYears, isLoading: isSchoolAcademicYearLoading} = useGetSchoolAcademicYears();
  const { data: semesters, isLoading: isFetchingSemesters } = useGetSemester();
  const { mutate: createSchoolSemester, isPending } = useCreateSchoolSemester(handleClose);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year_id: "",
    semester_id: ""
  });
  const [errors, setErrors] = useState({
    semester_id: "",
    school_year_id: "",
  });
  const [isValid, setIsValid] = useState({
    start_date: "",
    end_date: "",
  })
  const handlePrevalidation = async () => {
      const startDate = await dateRangeRef.current.preValidateStart();
      const endDate = await dateRangeRef.current.preValidateEnd();
      const semester = await semesterRef.current.triggerValidation();
      const schoolYear = await schoolYearRef.current.triggerValidation();
      return {
          startDate,
          endDate,
          semester,
          schoolYear
      }
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateSchoolSemester = async () => {
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
     if(!allFieldsValid(isValid)){
        toast.custom(
           <ToastWarning 
            title={"Invalid Fields"}
            description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
          />
        )

        return
     }
    createSchoolSemester({...formData, 
          semester_id:formData.semester_id.id,
          school_year_id:formData.school_year_id.id
    });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Create Semester</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="w-100 d-flex flex-row gap-2"></div>
        <div>
          <DateRangeInput
            validationSchema={dateRangeValidationSchema({
               futureOnly:true
            })}
            onEndDateChange={(value) => handleStateChange('end_date', value, setFormData)}
            onStartDateChange={(value) => handleStateChange('start_date', value, setFormData)}
            onStartDateValidationChange={(value) => handleStateChange('start_date', value, setIsValid)}
            onEndDateValidationChange={(value) => handleStateChange('end_date', value, setIsValid)}
            startValue={formData.start_date}
            endValue={formData.end_date}
            ref={dateRangeRef}
          />
        </div>
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">
            School Year
          </label>
            <CustomDropdown
            data={schoolAcademicYears?.data || []}
            displayKey={["specialty_name", "school_year"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isSchoolAcademicYearLoading}
            onSelect={(value) => handleStateChange("school_year_id", value, setFormData)}
            error={errors.school_year_id}
            errorMessage="School Academic Year Required"
            onError={(msg) => handleStateChange("school_year_id", msg, setErrors)}
            ref={schoolYearRef}
            value={formData.school_year_id}
          />
        </div>
        <div>
          <label htmlFor="semester" className="font-size-sm">
            Semester
          </label>
          <CustomDropdown
            data={semesters?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isFetchingSemesters}
            onSelect={(value) => handleStateChange("semester_id", value, setFormData)}
            error={errors.semester_id}
            errorMessage="Semester Required"
            onError={(msg) => handleStateChange("semester_id", msg, setErrors)}
            ref={semesterRef}
            value={formData.semester_id}
          />
        </div>
      </div>
      <div className="d-flex mt-3 flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          disabled={isPending}
          onClick={() => {
            handleCreateSchoolSemester();
          }}
        >
          {isPending ? <SingleSpinner /> : "Create Semester"}
        </button>
      </div>
    </>
  );
}
export default CreateSemester;
