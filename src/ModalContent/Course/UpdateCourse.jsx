import { useUpdateCourseMutation } from "../../Slices/Asynslices/updateSlice";
import {
  useFetchCourseDetailsQuery,
  useFetchEducationLevelsQuery,
  useFetchSemestersQuery,
  useFetchSpecialtiesQuery,
} from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners";
import { useState } from "react";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { Icon } from "@iconify/react";
function UpdateCourse({ handleClose, row_id: courseId }) {
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    department_id: "",
    level_id: "",
    semester_id: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateCourse] = useUpdateCourseMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { data: courseDetails, isLoading: isCourseDetailsFetching } =
    useFetchCourseDetailsQuery({
      course_id: courseId,
    });
  const { data: specialty, isLoading: isSpecialtyLoading } =
    useFetchSpecialtiesQuery();
  const { data: semester, isLoading: isSemesterLoading } =
    useFetchSemestersQuery();
  const { data: level, isLoading: isLevelLoading } =
    useFetchEducationLevelsQuery();
  const handleUpdateCourse = async () => {
    setIsUpdating(true);
    try {
      await updateCourse({
        course_id: courseId,
        updatedData: formData,
      }).unwrap();
      setIsUpdating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Update Successfull ✅"}
          description={"Course was updated successfully"}
        />
      );
    } catch (e) {
      setIsUpdating(false);
      toast.custom(
        <ToastDanger
          title="Update Failed ❌"
          description="❌ Something went wrong! The Course update failed due to an error. Please try again later."
        />
      );
    }
  };
  if (
    isCourseDetailsFetching ||
    isSpecialtyLoading ||
    isSemesterLoading ||
    isLevelLoading
  ) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="card w-100 border-none">
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Update Course</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="my-1">
          <label htmlFor="courseTitle">Course Title</label>
          <input
            type="text"
            className="form-control"
            placeholder={courseDetails.data.course_title}
            name="course_title"
            value={formData.course_title}
            onChange={(e) => handleInputChange("course_title", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            className="form-control"
            placeholder={courseDetails.data.course_code}
            name="course_code"
            value={formData.course_code}
            onChange={(e) => handleInputChange("course_code", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="courseTitle">Course Credit</label>
          <input
            type="number"
            className="form-control"
            placeholder={courseDetails.data.credit}
            name="credit"
            value={formData.credit}
            onChange={(e) => handleInputChange("credit", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="">Specialty</label>
          <select
            name="specialty_id"
            className="form-select"
            onChange={(e) => handleInputChange("specialty_id", e.target.value)}
            value={formData.specialty_id}
          >
            <option>Open to select</option>
            {specialty.data.map((items) => {
              return (
                <option value={items.id}>
                  {items.specialty_name} {items.level_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="my-1">
          <label htmlFor="">Semester</label>
          <select
            name="semester_id"
            value={formData.semester_id}
            onChange={(e) => handleInputChange("semester_id", e.target.value)}
            className="form-select"
          >
            {semester.data.map((items) => {
              return <option value={items.id}>{items.name}</option>;
            })}
          </select>
        </div>
        <div className="my-1">
          <label htmlFor="">Level</label>
          <select
            name="level_id"
            onChange={(e) => handleInputChange("level_id", e.target.value)}
            value={formData.level_id}
            className="form-select"
          >
            {level.data.map((items) => {
              return <option value={items.id}>{items.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="w-100 mt-2 d-flex flex-row gap-2">
        <button
          className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </button>
        <button 
          className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white"
           disabled={isUpdating}
           onClick={() => {
             handleUpdateCourse();
           }}
          >
          {
             isUpdating ? <SingleSpinner /> : "Update Course"
          }
        </button>
      </div>
    </>
  );
}
export default UpdateCourse;
