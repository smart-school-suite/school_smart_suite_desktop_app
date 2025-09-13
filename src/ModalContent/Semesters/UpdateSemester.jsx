import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolSemester } from "../../hooks/schoolSemester/useUpdateSchoolSemester";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateSemester({ handleClose, rowData }) {
  const {id:semesterId, school_year, start_date, end_date} = rowData;
  const { data: specialties, isLoading: isFetchingSpecialties } =
    useGetSpecialties();
  const { data: studentBatches, isLoading: isFetchingStudentBatches } =
    useGetBatches();
  const { data: semesters, isLoading: isFetchingSemesters } =
    useGetSemester();
  const { mutate:updateSchoolSemester, isPending } = useUpdateSchoolSemester(handleClose, semesterId);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year: "",
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
  });
  const [isValid, setIsValid] = useState({
    start_date: null,
    end_date: null,
  })
  const [errors, setErrors] = useState({
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
    school_year: "",
  });
    const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdateSchoolSemester = () => {
    if(optionalValidateObject(isValid) == false){
          toast.custom(
            <ToastWarning 
               title={"Invalid Fields"}
               description={"Please Ensure All Fields Are Valid Before Submitting"}
            />
          )
          return;
        }
        if(hasNonEmptyValue(formData) == false){
          toast.custom(
             <ToastWarning 
               title={"Nothing To Update"}
              description={"Please Ensure Atleast One Field Is Updated Before Submitting"}
             />
          )
          return;
        }
     updateSchoolSemester({schoolSemesterId:semesterId,  updateData:formData})
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Update Semester</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <DateRangeInput 
          onEndDateChange={(value) => handleStateChange('end_date', value, setFormData)}
          onStartDateChange={(value) => handleStateChange('start_date', value, setFormData)}
          onStartDateValidationChange={(value) => handleStateChange('start_date', value, setIsValid)}
          onEndDateValidationChange={(value) => handleStateChange('end_date', value, setIsValid)}
          validationSchema={dateRangeValidationSchema({
             optional:true,
             futureOnly:true
          })}
          placeholderEnd={end_date}
          placeholderStart={start_date}
          startValue={formData.start_date}
          endValue={formData.end_date}
        />
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
          <SchoolYearSelector 
            onSelect={(value) => handleStateChange('school_year', value, setFormData)}
            onError={(value) => handleFieldError('school_year', value, setErrors)}
            error={errors.school_year}
            placeholder={school_year}
          />
        </div>
        <div>
          <label htmlFor="semester" className="font-size-sm">Semester</label>
           <CustomDropdown 
             data={semesters?.data || []}
             displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isFetchingSemesters}
            onSelect={(value) => handleStateChange("semester_id", value.id, setFormData)}
            error={errors.semester_id}
            errorMessage="Semester Required"
            onError={(msg) => handleStateChange("semester_id", msg, setErrors)}
            optional={true}
            placeholder={rowData.semester_name ? rowData.semester_name : "Select Semester"}
           />
        </div>
        <div>
          <label htmlFor="specialty" className="font-size-sm">Specialty</label>
          <CustomDropdown 
            data={specialties?.data || []}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isFetchingSpecialties}
            onSelect={(value) => handleStateChange("specialty_id", value.id, setFormData)}
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) => handleStateChange("specialty_id", msg, setErrors)}
            optional={true}
            placeholder={rowData.specialty_name ? `${rowData.specialty_name}, ${rowData.level_name}` : "Select Specialty"}
          />
        </div>
        <div>
          <label htmlFor="studentBatch" className="font-size-sm">Student Batch</label>
          <CustomDropdown
            data={studentBatches?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange("student_batch_id", value.id, setFormData)
            }
            isLoading={isFetchingStudentBatches}
            error={errors.student_batch_id}
            errorMessage="Student Batch Required"
            onError={(msg) => handleStateChange("student_batch_id", msg, setErrors)}
            optional={true}
            placeholder={rowData.student_batch ? rowData.student_batch : 'Select Student Batch'}
          />
        </div>
      </div>
      <div className="d-flex mt-3 flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          disabled={isPending}
          onClick={() => {
            handleUpdateSchoolSemester();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Semester"}
        </button>
      </div>
    </>
  );
}
export default UpdateSemester;
