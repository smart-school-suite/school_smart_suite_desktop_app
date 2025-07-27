import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateResitExam } from "../../hooks/resitExam/useUpdateResitExam";
import { WeigtedMarkInput } from "../../components/FormComponents/InputComponents";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
function UpdateResitExam({ handleClose, rowData }) {
  const { id:examId } = rowData;
  const [isValid, setIsValid] = useState();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    weighted_mark: "",
    school_year: "",
  });
  const { mutate: updateExam, isPending } = useUpdateResitExam(handleClose);
  const handleExamUpdate = () => {
    updateExam({ resitExamId: examId, updateData: formData });
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
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Exam</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
      </div>
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
        <span>School Year</span>
        <SchoolYearSelector onSelect={handleSchoolYearSelect} />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          disabled={isPending}
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleExamUpdate();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Exam"}
        </button>
      </div>
    </>
  );
}
export default UpdateResitExam;
