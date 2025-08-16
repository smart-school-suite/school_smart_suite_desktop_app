import { useState } from "react";
import { DateRangeInput, NumberInput} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateExam } from "../../hooks/exam/useCreateExam";
import { Icon } from "@iconify/react";
import { useGetExamTypes } from "../ExamType/useGetExamType";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { dateRangeValidationSchema, weightedMarkValidationSchema } from "../../ComponentConfig/YupValidationSchema";

function CreateExam({ handleClose }) {
    const { data: examType, isLoading: isExamTypeLoading } =
    useGetExamTypes();
  const { data: specialty, isLoading: isSpecailtyLoading } =
    useGetSpecialties();
  const { data: studentBatches, isLoading: isStudentBatchLoading } = useGetBatches();
  const { mutate:createExam, isPending } = useCreateExam(handleClose)
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    exam_type_id: "",
    weighted_mark: "",
    specialty_id: "",
    school_year: "",
    student_batch_id:""
  });
  const [isInvalid, setIsInvalid] = useState({
     start_date: "",
    end_date: "",
    exam_type_id: "",
    weighted_mark: "",
    specialty_id: "",
    school_year: "",
    student_batch_id:""
  });
  const [errors, setErrors] = useState({
    school_year: "",
    student_batch_id:"",
    specialty_id: "",
    exam_type_id: "",
  })
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
    createExam(formData) 
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
       <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Create Exam</span>
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
      <div>
      <div>
        <DateRangeInput 
         validationSchema={dateRangeValidationSchema}
         onStartDateChange={(value) => handleInputChange('start_date', value)}
         onEndDateChange={(value) => handleInputChange('end_date', value)}
        />
      </div>
      <div>
        <label htmlFor="weightedMark" className="font-size-sm">Exam Score</label>
        <NumberInput 
         onChange={(value) => handleInputChange('weighted_mark', value)}
         step="0.01"
         onValidationChange={(value) => handleValidation('weighted_mark', value)}
         validationSchema={weightedMarkValidationSchema}
         placeholder={"e.g 100"}
        />
      </div>
      <div>
        <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
        <SchoolYearSelector 
          onSelect={(value) => handleInputChange('school_year', value)}
          onError={(msg) => handleFieldError("school_year", msg)}
          error={errors.school_year}
        />
      </div>
      <div>
        <label htmlFor="examType" className="font-size-sm">Exam Type</label>
          <CustomDropdown
            data={ examType?.data || []}
            displayKey={["exam_name"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) => handleInputChange('exam_type_id', value.id)}
            placeholder="Select Exam Type"
            error={errors.exam_type_id}
            isLoading={isExamTypeLoading}
            errorMessage="Exam Type Required"
            onError={(msg) => handleFieldError("exam_type_id", msg)}
          />
      </div>
      <div>
        <label htmlFor="specialty" className="font-size-sm">Specialty</label>
          <CustomDropdown
            data={specialty?.data || []}
            displayKey={["specialty_name", "level"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isSpecailtyLoading}
            onSelect={(value) => handleInputChange('specialty_id', value.id)}
            placeholder="Select Specialty"
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) => handleFieldError('specialty_id', msg)}
          />
      </div>
      <div className="mb-3">
        <label htmlFor="studentBatch" className="font-size-sm">Student Batch</label>
          <CustomDropdown
            data={studentBatches?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isStudentBatchLoading}
            onSelect={(value) => handleInputChange('student_batch_id', value.id)}
            placeholder="Select Student Batch"
            error={errors.student_batch_id}
            errorMessage="Student Batches Required"
            onError={(msg) => handleFieldError('student_batch_id', msg)}
          />
      </div>
      </div>
      <div >
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Exam"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateExam;
