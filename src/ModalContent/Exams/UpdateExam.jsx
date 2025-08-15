import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetExamTypes } from "../ExamType/useGetExamType";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useUpdateExam } from "../../hooks/exam/useUpdateExam";
function UpdateExam({ handleClose, rowData }) {
    const examId = rowData.id;
    const { mutate:updateExam, isPending } = useUpdateExam(handleClose)
    const [formData, setFormData] = useState({
      start_date: "",
      end_date: "",
      exam_type_id: "",
      weighted_mark: "",
      specialty_id: "",
      school_year: "",
    });
  
    const { data: examType, isLoading: isExamTypeLoading } =
      useGetExamTypes();
    const { data: specialty, isLoading: isSpecailtyLoading } =
      useGetSpecialties();
   
    const handleExamTypeSelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        exam_type_id: selectedValues.id,
      }));
    };
  
    const handleSpecialtySelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        specialty_id: selectedValues.id,
      }));
    };
    const handleSchoolYearSelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        school_year: selectedValues,
      }));
    };
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleValidation = (isInputValid) => {
      setIsValid(isInputValid);
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
      <div className="modal-content-container">
        <div className="my-1">
        <span>Start Date</span>
        <input
          type="date"
          className="form-control"
          name="start_date"
          value={formData.start_date}
          onChange={(e) => handleInputChange("start_date", e.target.value)}
        />
      </div>
      <div className="my-1">
        <span>End Date</span>
        <input
          type="date"
          className="form-control"
          name="end_date"
          value={formData.end_date}
          onChange={(e) => handleInputChange("end_date", e.target.value)}
        />
      </div>
      <div className="my-1">
        <WeigtedMarkInput
          onChange={(value) => handleInputChange("weighted_mark", value)}
          value={formData.weighted_mark}
          onValidationChange={handleValidation}
        />
      </div>
      <div className="my-1">
        <label htmlFor="schoolYear" className="font-size-sm">School Year</label>
        <SchoolYearSelector onSelect={handleSchoolYearSelect} />
      </div>
      <div className="my-1">
        <label htmlFor="examType" className="font-size-sm">Exam Type</label>
          <CustomDropdown
            data={examType?.data || []}
            displayKey={["exam_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "exam_name"]}
            renameMapping={{ id: "id", exam_name: "exam_name" }}
            isLoading={isExamTypeLoading}
            direction="up"
            onSelect={handleExamTypeSelect}
            placeholder={"Select Exam Type"}
          />
      </div>
      <div className="my-1">
        <label htmlFor="specialty" className="font-size-sm"></label>
          <CustomDropdown
            data={specialty?.data || []}
            displayKey={["specialty_name", "level"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name", "level_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name", level_name:"level" }}
            isLoading={isSpecailtyLoading}
            direction="up"
            onSelect={handleSpecialtySelect}
            placeholder="Select Specialty"
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
