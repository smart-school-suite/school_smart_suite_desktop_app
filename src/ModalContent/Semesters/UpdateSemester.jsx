import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolSemester } from "../../hooks/schoolSemester/useUpdateSchoolSemester";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function UpdateSemester({ handleClose, rowData }) {
  const semesterId = rowData.id;
  const { data: specailties, isLoading: isFetchingSpecialties } =
    useGetSpecialties();
  const { data: studentBatches, isLoading: isFetchingStudentBatches } =
    useGetBatches();
  const { data: semesters, isLoading: isFetchingSemesters } =
    useGetSemester();
  const { mutate:updateSchoolSemester, isPending } = useUpdateSchoolSemester(handleClose, semesterId);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year: "",
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
  });
  const handleUpdateSchoolSemester = () => {
     updateSchoolSemester({schoolSemesterId:semesterId,  updateData:formData})
  };
  if (
    isFetchingSemesters ||
    isFetchingSpecialties ||
    isFetchingStudentBatches
  ) {
    return <Pageloaderspinner />;
  }
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
        <div className="my-2">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={
              formData.start_date === null
                ? semesterDetails.data.start_date
                : formData.start_date
            }
            name="start_date"
            onChange={(e) => handleInputChange("start_date", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            value={
              formData.end_date === null
                ? semesterDetails.data.end_date
                : formData.end_date
            }
            name="end_date"
            onChange={(e) => handleInputChange("end_date", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="schoolYear">School Year</label>
          <input
            type="text"
            className="form-control"
            placeholder="2021-2023"
            value={formData.school_year}
            name="school_year"
            onChange={(e) => handleInputChange("school_year", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="semester">Semester</label>
          <select
            className="form-select"
            value={formData.semester_id}
            name="semester_id"
            onChange={(e) => handleInputChange("semester_id", e.target.value)}
          >
            {semesters.data.map((items) => (
              <option value={items.id}>{items.name}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="specialty">Specialty</label>
          <select
            name="specialty_id"
            value={formData.specialty_id}
            onChange={(e) => handleInputChange("specialty_id", e.target.value)}
            className="form-select"
          >
            {specailties.data.map((items) => (
              <option value={items.id}>{items.specialty_name}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label htmlFor="studentBatch">Student Batch</label>
          <select
            name="student_batch_id"
            value={formData.student_batch_id}
            onChange={(e) =>
              handleInputChange("student_batch_id", e.target.value)
            }
            className="form-select"
          >
            {studentBatches.data.map((items) => (
              <option value={items.id}>{items.name}</option>
            ))}
          </select>
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
