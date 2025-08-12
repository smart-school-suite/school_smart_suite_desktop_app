import { Icon } from "@iconify/react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import {DateRangeInput} from "../../components/FormComponents/InputComponents";
import {dateRangeValidationSchema} from "../../ComponentConfig/YupValidationSchema";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
function CreateSemester({ handleClose }) {
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
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    school_year: "",
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDateRangeChange = (value) => {
    const [changedKey] = Object.keys(value);
    const changedValue = value[changedKey];
     
    setFormData((prev) => ({
      ...prev,
      [changedKey]: changedValue,
    }));
    console.table(formData);
  };
  const handleDateRangeValid = (value) => {
    const [changedKey] = Object.keys(value);
    const changedValue = value[changedKey];

    setIsInvalid((prev) => ({
      ...prev,
      [changedKey]: changedValue,
    }));
    
  };
  const handleInputValid = (field, value) => {
    setIsInvalid((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateSchoolSemester = () => {
    createSchoolSemester(formData);
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
            validationSchema={dateRangeValidationSchema}
            onChange={handleDateRangeChange}
            onValidationChange={handleDateRangeValid}
          />
        </div>
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">
        School Year
      </label>
          <SchoolYearSelector
            onSelect={(value) => handleInputChange("school_year", value)}
          />
        </div>
        <div>
          <label htmlFor="semester" className="font-size-sm">
            Semester
          </label>
          {
          isFetchingSemesters ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ): (
             <CustomDropdown 
               data={semesters.data}
               displayKey={['name']}
               valueKey={['id']}
               filter_array_keys={['id', 'name']}
               renameMapping={{ id:"id", name:"name"}}
               direction="up"
               onSelect={(value) => handleInputChange('semester_id', value.id)}
             />
          )
          }
        </div>
        <div>
          <label htmlFor="specialty" className="font-size-sm">
            Specialty
          </label>
          {isFetchingSpecialties ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={specialties.data}
              displayKey={["specialty_name", "level_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "specialty_name", "level_name"]}
              renameMapping={{
                id: "id",
                specialty_name: "specialty_name",
                leve_name: "level_name",
              }}
              direction="up"
              onSelect={(value) => handleInputChange("specialty_id", value.id)}
            />
          )}
        </div>
        <div>
          <label htmlFor="studentBatch" className="font-size-sm">Student Batch</label>
          {isFetchingStudentBatches ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={studentBatches.data}
              displayKey={["name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "name"]}
              renameMapping={{ id: "id", name: "name" }}
              direction="up"
              onSelect={(value) =>
                handleInputChange("student_batch_id", value.id)
              }
            />
          )}
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
