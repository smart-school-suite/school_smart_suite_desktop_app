import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetExamTypes } from "../ExamType/useGetExamType";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useUpdateExam } from "../../hooks/exam/useUpdateExam";
import { DateRangeInput, NumberInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema, numberSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateExam({ handleClose, rowData }) {
    const {id:examId, start_date, end_date, weighted_mark, school_year } = rowData;
    const { mutate:updateExam, isPending } = useUpdateExam(handleClose)
    const [formData, setFormData] = useState({
      start_date: "",
      end_date: "",
      exam_type_id: "",
      weighted_mark: "",
      specialty_id: "",
      school_year: "",
    });
    const [errors, setErrors] = useState({
    school_year: "",
    student_batch_id:"",
    specialty_id: "",
    exam_type_id: "",
  })
    const [isInvalid, setIsInvalid] = useState({
     start_date: "",
    end_date: "",
    exam_type_id: "",
    weighted_mark: "",
    specialty_id: "",
    school_year: "",
    student_batch_id:""
  });
  
    const { data: examType, isLoading: isExamTypeLoading } =
      useGetExamTypes();
    const { data: specialty, isLoading: isSpecailtyLoading } =
      useGetSpecialties();
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
      const handleValidation = (field, value) => {
    setIsInvalid((prev) => ({ ...prev, [field]: value }));
  };
    const handleFieldError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message
    }));
  };
    const handleSubmit = () => {
      updateExam({examId:examId, updateData:formData})
      
    };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Update Exam</span>
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
      <div>
      <div>
        <DateRangeInput 
          onStartDateChange={(value) => handleInputChange('start_date', value)}
          onEndDateChange={(value) => handleInputChange('end_date', value)}
          placeholderEnd={start_date}
          placeholderStart={end_date}
          validationSchema={dateRangeValidationSchema}
        />
      </div>
      <div>
       <NumberInput 
         onChange={(value) => handleInputChange('weighted_mark', value)}
         onValidationChange={(value) => handleValidation('weighted_mark', value)}
         placeholder={weighted_mark}
         validationSchema={numberSchema({ min:1, max:100, optional:true })}
       />
      </div>
      <div>
        <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
        <SchoolYearSelector 
          onSelect={(value) => handleInputChange('school_year', value)}
          onError={(value) => handleInputChange('school_year', value)}
          error={errors.school_year}
          placeholder={school_year}
        />
      </div>
      <div>
        <label htmlFor="examType" className="font-size-sm">Exam Type</label>
          <CustomDropdown
            data={examType?.data || []}
            displayKey={["exam_name"]}
            valueKey={["id"]}
            isLoading={isExamTypeLoading}
            direction="up"
            onSelect={(value) => handleInputChange('exam_type_id', value)}
            placeholder={"Select Exam Type"}
            errorMessage="Exam Type Required"
            onError={(value) => handleFieldError('exam_type_id', value)}
            error={errors.exam_type_id}
          />
      </div>
      <div>
        <label htmlFor="specialty" className="font-size-sm">Specialty</label>
          <CustomDropdown
            data={specialty?.data || []}
            displayKey={["specialty_name", "level"]}
            valueKey={["id"]}
            isLoading={isSpecailtyLoading}
            direction="up"
            onSelect={(value) => handleInputChange('specialty_id', value)}
            placeholder="Select Specialty"
            onError={(value) => handleFieldError('specialty_id', value)}
            errorMessage="Specialty Required"
            error={errors.specialty_id}
          />
      </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          disabled={isPending}
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleSubmit();
          }}
        >
         {
           isPending ? <SingleSpinner /> : "Update Exam"
         }
        </button>
      </div>
    </>
  );
}
export default UpdateExam;
