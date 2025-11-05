import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateSemester({ handleClose }) {
  const dateRangeRef = useRef();
  const semesterRef = useRef();
  const specialtyRef = useRef();
  const studentBatchRef = useRef();
  const schoolYearRef = useRef();
  const { data: specialties, isLoading: isFetchingSpecialties } =
    useGetSpecialties();
  const { data: studentBatches, isLoading: isFetchingStudentBatches } =
    useGetBatches();
  const { data: semesters, isLoading: isFetchingSemesters } = useGetSemester();
  const { mutate: createSchoolSemester, isPending } =
    useCreateSchoolSemester(handleClose);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year: "",
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
  });
  const [errors, setErrors] = useState({
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
    school_year: "",
  });
  const [isValid, setIsValid] = useState({
    start_date: "",
    end_date: "",
  })
  const handlePrevalidation = async () => {
      const startDate = await dateRangeRef.current.preValidateStart();
      const endDate = await dateRangeRef.current.preValidateEnd();
      const semester = await semesterRef.current.triggerValidation();
      const specialty = await specialtyRef.current.triggerValidation();
      const studentBatch = await studentBatchRef.current.triggerValidation();
      const schoolYear = await schoolYearRef.current.triggerValidation();
      return {
          startDate,
          endDate,
          semester,
          studentBatch,
          specialty,
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
          specialty_id:formData.specialty_id.id,
          student_batch_id:formData.student_batch_id.id,
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
          <SchoolYearSelector
            onSelect={(value) => handleStateChange("school_year", value, setFormData)}
            onError={(msg) => handleStateChange("school_year", msg, setErrors)}
            error={errors.school_year}
            placeholder={formData.year}
            required={true}
            ref={schoolYearRef}
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
        <div>
          <label htmlFor="specialty" className="font-size-sm">
            Specialty
          </label>
          <CustomDropdown
            data={specialties?.data || []}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isFetchingSpecialties}
            onSelect={(value) => handleStateChange("specialty_id", value, setFormData)}
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) => handleStateChange("specialty_id", msg, setErrors)}
            ref={specialtyRef}
            value={formData.specialty_id}
          />
        </div>
        <div>
          <label htmlFor="studentBatch" className="font-size-sm">
            Student Batch
          </label>
          <CustomDropdown
            data={studentBatches?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange("student_batch_id", value, setFormData)
            }
            isLoading={isFetchingStudentBatches}
            error={errors.student_batch_id}
            errorMessage="Student Batch Required"
            onError={(msg) => handleStateChange("student_batch_id", msg, setErrors)}
            ref={studentBatchRef}
            value={formData.student_batch_id}
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
