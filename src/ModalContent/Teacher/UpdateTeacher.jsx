import { useState } from "react";
import { useUpdateTeacherMutation } from "../../Slices/Asynslices/updateSlice";
import { useFetchTeacherDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import toast from "react-hot-toast";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners";
import { Icon } from "@iconify/react";
function UpdateTeacher({ handleClose, row_id: teacherId }) {
  const [updateTeacher] = useUpdateTeacherMutation();
  const {
    data: teacherDetails,
    isLoading,
    error,
  } = useFetchTeacherDetailsQuery({
    teacher_id: teacherId,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    hire_date: "",
    highest_qualification: "",
    field_of_study: "",
    years_experience: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleTeacherUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateTeacher({
        teacher_id: teacherId,
        updatedData: formData,
      }).unwrap();
      setIsUpdating(false);
      toast.success("Teacher Updated Successfully");
      handleClose();
    } catch (e) {
      toast.error("Failed to update teacher please try again");
      setIsUpdating(false);
    }
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Update Teacher</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <span className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
          sint reprehenderit tempora. Aliquid
        </span>
        <div className="mb-2 d-flex flex-row gap-2">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder={teacherDetails.data.first_name}
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder={teacherDetails.data.last_name}
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
            />
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="fullname">Full Names</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder={teacherDetails.data.name}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder={teacherDetails.data.email}
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="mb-2 d-flex flex-row gap-2">
          <div className="w-50">
            <label htmlFor="hiredate">Hire Date</label>
            <input
              type="date"
              className="form-control w-100"
              name="hire_date"
              value={formData.hire_date}
              onChange={(e) => handleInputChange("hire_date", e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="lastName">Years of Experience</label>
            <input
              type="number"
              className="form-control w-100"
              placeholder={teacherDetails.data.years_experience}
              name="years_experience"
              value={formData.years_experience}
              onChange={(e) =>
                handleInputChange("years_experience", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="highestQualification">Highest Qualification</label>
          <input
            type="text"
            className="form-control"
            placeholder={teacherDetails.data.highest_qualification}
            name="highest_qualification"
            value={formData.highest_qualification}
            onChange={(e) =>
              handleInputChange("highest_qualification", e.target.value)
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="highestQualification">Field Of Study</label>
          <input
            type="text"
            className="form-control"
            placeholder={teacherDetails.data.field_of_study}
            name="field_of_study"
            value={formData.field_of_study}
            onChange={(e) =>
              handleInputChange("field_of_study", e.target.value)
            }
          />
        </div>
      </div>
      <div className="mt-2">
        <button 
          className="border-none p-2 font-size-sm primary-background rounded-3 w-100 text-white"
           onClick={() => {
             handleTeacherUpdate();
           }}
          >
          {isUpdating ? <SingleSpinner /> : <>Update Teacher</>}
        </button>
      </div>
    </>
  );
}
export default UpdateTeacher;
