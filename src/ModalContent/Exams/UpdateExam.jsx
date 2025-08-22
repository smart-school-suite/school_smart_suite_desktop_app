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
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
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
     weighted_mark: "",
  });
  
    const { data: examType, isLoading: isExamTypeLoading } =
      useGetExamTypes();
    const { data: specialty, isLoading: isSpecailtyLoading } =
      useGetSpecialties();
    const handleStateChange = (field, value, stateFn) => {
      stateFn((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = () => {
      console.log(isInvalid);
      if(optionalValidateObject(isInvalid) == false){
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
          validationSchema={dateRangeValidationSchema({
               futureOnly:true,
               optional:true,
            })}
          onStartDateChange={(value) => handleStateChange('start_date', value, setFormData)}
          onEndDateChange={(value) => handleStateChange('end_date', value, setFormData)}
          placeholderEnd={start_date}
          placeholderStart={end_date}
          onStartDateValidationChange = {(value) => {
             handleStateChange('start_date', value, setIsInvalid)
             console.log("start_date", value)
          }}
          onEndDateValidationChange = {(value) => handleStateChange('end_date', value, setIsInvalid)}
          startValue={formData.start_date}
          endValue={formData.end_date}
        />
      </div>
      <div>
        <label htmlFor="weightedMark" className="font-size-sm">Exam Score</label>
       <NumberInput 
         onChange={(value) => handleStateChange('weighted_mark', value, setFormData)}
         onValidationChange={(value) => handleStateChange('weighted_mark', value, setIsInvalid)}
         placeholder={weighted_mark}
         validationSchema={numberSchema({ 
          min:1, max:500,
          optional:true,
          integerOnly:false,
          messages:{
             min:"Exam Score Must Be Atleast 1",
             max:"Exam Score Must Not Exceed 100"
          }
        })}
       />
      </div>
      <div>
        <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
        <SchoolYearSelector 
          onSelect={(value) => handleStateChange('school_year', value, setFormData)}
          onError={(value) => handleStateChange('school_year', value, setErrors)}
          error={errors.school_year}
          placeholder={school_year}
          required={false}
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
            onSelect={(value) => handleStateChange('exam_type_id', value, setFormData)}
            placeholder={"Select Exam Type"}
            errorMessage="Exam Type Required"
            onError={(value) => handleStateChange('exam_type_id', value, setErrors)}
            error={errors.exam_type_id}
            optional={false}
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
            onSelect={(value) => handleStateChange('specialty_id', value, setFormData)}
            placeholder="Select Specialty"
            onError={(value) => handleStateChange('specialty_id', value, setErrors)}
            errorMessage="Specialty Required"
            error={errors.specialty_id}
            optional={false}
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
