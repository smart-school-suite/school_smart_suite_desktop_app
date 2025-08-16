import Pageloaderspinner from "../../components/Spinners/Spinners";
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
  const [errors, setErrors] = useState({
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
    school_year: "",
  });
    const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
    const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdateSchoolSemester = () => {
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
          onEndDateChange={(value) => handleInputChange('end_date', value)}
          onStartDateChange={(value) => handleInputChange('start_date', value)}
          validationSchema={dateRangeValidationSchema}
          placeholderEnd={end_date}
          placeholderStart={start_date}
          startValue={formData.start_date}
          endValue={formData.end_date}
        />
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
          <SchoolYearSelector 
            onSelect={(value) => handleInputChange('school_year', value)}
            onError={(value) => handleFieldError('school_year', value)}
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
            onSelect={(value) => handleInputChange("semester_id", value.id)}
            error={errors.semester_id}
            errorMessage="Semester Required"
            onError={(msg) => handleFieldError("semester_id", msg)}
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
            onSelect={(value) => handleInputChange("specialty_id", value.id)}
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) => handleFieldError("specialty_id", msg)}
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
              handleInputChange("student_batch_id", value.id)
            }
            isLoading={isFetchingStudentBatches}
            error={errors.student_batch_id}
            errorMessage="Student Batch Required"
            onError={(msg) => handleFieldError("student_batch_id", msg)}
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
