import { useState } from "react";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetTeacherDetails } from "../../hooks/teacher/useGetTeacherDetails";
import { useUpdateTeacher } from "../../hooks/teacher/useUpdateTeacher";
function UpdateTeacher({ handleClose, rowData }) {
  const teacherId = rowData.id;
  const { data:teacherDetails, isFetching } = useGetTeacherDetails(teacherId)
  const { mutate:updateTeacher, isPending } = useUpdateTeacher(handleClose);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender:"",
    phone_one:""
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleTeacherUpdate = async () => {
    updateTeacher({ teacherId, updateData:formData })
  };
  if (isFetching) {
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
        <div className="mb-2 d-flex flex-row gap-2 w-100">
          <div className="w-50">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder={teacherDetails.data.first_name}
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
            />
          </div>
          <div className="w-50">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control w-100"
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
      </div>
       <div>
          <label htmlFor="">gender</label>
          <input
            type="text"
            className="form-control"
            name="gender"
            onChange={(e) => handleInputChange("gender", e.target.value)}
            placeholder={teacherDetails.data.gender}
          />
        </div>
        <div>
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone_one"
            placeholder={teacherDetails.data.phone}
            onChange={(e) => handleInputChange("phone_one", e.target.value)}
            
          />
        </div>
      <div className="mt-2">
        <button 
          className="border-none p-2 font-size-sm primary-background rounded-3 w-100 text-white"
           onClick={() => {
             handleTeacherUpdate();
           }}
          >
          {isPending ? <SingleSpinner /> : <>Update Teacher</>}
        </button>
      </div>
    </>
  );
}
export default UpdateTeacher;
