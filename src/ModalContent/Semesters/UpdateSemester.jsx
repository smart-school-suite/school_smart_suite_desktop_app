import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useFetchSemesterDetailQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchStudentBatchQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchSemestersQuery } from "../../Slices/Asynslices/fetchSlice";
import { useUpdateSchoolSemesterMutation } from "../../Slices/Asynslices/updateSlice";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
function UpdateSemester({ handleClose, row_id:schoolSemesterId}) {
  const { data: specailties, isLoading: isFetchingSpecialties } =
    useFetchSpecialtiesQuery();
  const { data: studentBatches, isLoading: isFetchingStudentBatches } =
    useFetchStudentBatchQuery();
  const { data: semesters, isLoading: isFetchingSemesters } =
    useFetchSemestersQuery();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year: "",
    semester_id: "",
    specialty_id: "",
    student_batch_id: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: semesterDetails, isLoading } = useFetchSemesterDetailQuery({
    schoolSemesterId: schoolSemesterId,
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const [updateSchoolSemester] = useUpdateSchoolSemesterMutation();
  const handleUpdateSchoolSemester = async () => {
    setIsUpdating(true);
    try {
      await updateSchoolSemester({
        schoolSemesterId: schoolSemesterId,
        schoolSemesterData: formData,
      }).unwrap();
      setIsUpdating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title="Update Successfull ✅"
          description="The School Semester has been updated successfully"
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title="Update Failed ❌"
          description="❌ Something went wrong! The school Semester update failed due to an error. Please try again later."
        />
      );
    }
  };
  if (
    isLoading ||
    isFetchingSpecialties ||
    isFetchingStudentBatches ||
    isFetchingSemesters
  ) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Create Semester</h5>
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
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
          </p>
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
          className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
          disabled={isUpdating}
          onClick={() => {
            handleUpdateSchoolSemester();
          }}
        >
          {isUpdating ? <SingleSpinner /> : "Create Semester"}
        </button>
      </div>
    </>
  );
}
export default UpdateSemester;
