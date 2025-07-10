import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import {
  useFetchEducationLevelsQuery,
  useFetchSemestersQuery,
  useFetchExamTypesQuery,
  useFetchSpecialtiesQuery,
} from "../../Slices/Asynslices/fetchSlice";
import { useUpdateExamMutation } from "../../Slices/Asynslices/updateSlice";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { WeigtedMarkInput } from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function UpdateExam({ handleClose, row_id: examId }) {
  const [updateExam] = useUpdateExamMutation();
  const [isUpdating, setIsUpdating] = useState(false);
   const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    exam_type_id: "",
    level_id: "",
    weighted_mark: "",
    semester_id: "",
    specialty_id: "",
    school_year: "",
  });

  const { data: level, isLoading: isEducationLevelLoading } =
    useFetchEducationLevelsQuery();
  const { data: semesters, isLoading: isSemesterLoading } =
    useFetchSemestersQuery();
  const { data: examType, isLoading: isExamTypeLoading } =
    useFetchExamTypesQuery();
  const { data: specialty, isLoading: isSpecailtyLoading } =
    useFetchSpecialtiesQuery();

  const handleExamTypeSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      exam_type_id: selectedValues.id,
    }));
  };

  const handleSemesterSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      semester_id: selectedValues.id,
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
  const handleEducationLevelSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      level_id: selectedValues.id,
    }));
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };
  const handleExamUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateExam({ exam_id: examId, updatedData: formData }).unwrap();
      setIsUpdating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Update Successfull ✅"}
          description={"Exam was updated successfully"}
        />
      );
    } catch (e) {
      setIsUpdating(false);
      toast.custom(
        <ToastDanger
          title="Update Failed ❌"
          description="❌ Something went wrong! The Exam update failed due to an error. Please try again later."
        />
      );
    }
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
      <div className="my-1">
        <span>Semester</span>
        {isSemesterLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={semesters.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isSemesterLoading}
            direction="up"
            onSelect={handleSemesterSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Level</span>
        {isEducationLevelLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={level.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isEducationLevelLoading}
            direction="up"
            onSelect={handleEducationLevelSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Exam Type</span>
        {isExamTypeLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={examType.data}
            displayKey={["exam_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "exam_name"]}
            renameMapping={{ id: "id", exam_name: "exam_name" }}
            isLoading={isExamTypeLoading}
            direction="up"
            onSelect={handleExamTypeSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Specialty</span>
        {isSpecailtyLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={specialty.data}
            displayKey={["specialty_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name" }}
            isLoading={isSpecailtyLoading}
            direction="up"
            onSelect={handleSpecialtySelect}
          />
        )}
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          disabled={isUpdating}
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleExamUpdate();
          }}
        >
         {
           isUpdating ? <SingleSpinner /> : "Update Exam"
         }
        </button>
      </div>
    </>
  );
}
export default UpdateExam;
