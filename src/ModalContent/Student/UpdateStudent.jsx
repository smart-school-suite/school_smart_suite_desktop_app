import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { useUpdateStudent } from "../../hooks/student/useUpdateStudent";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetAllParents } from "../../hooks/parent/useGetParents";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetStudentById } from "../../hooks/student/useGetStudentDetails";
function UpdateStudent({ handleClose, rowData }) {
  const studentId = rowData.id;
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
    email: "",
  });
  const { mutate: updateStudent, isPending } = useUpdateStudent(
    handleClose,
    studentId
  );
  const { data: studentDetails, isFetching: isStudentDetailsLoading } =
    useGetStudentById(studentId);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSelect = (field) => (selectedValues) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [field]: selectedValues.id,
    }));
  };
  const { data: specialties, isFetching: isSpecialtiesLoading } =
    useGetSpecialties();

  const { data: studentBatch, isFetching: isStudentBatchLoading } =
    useGetBatches();
  const { data: parents, isFetching: isParentsLoading } = useGetAllParents();
  const handleUpdateStudent = () => {
    updateStudent({ studentId, updateData: formData });
  };
  if (isStudentDetailsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Update Student</span>
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
      <div className="my-1">
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="w-50">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control w-100"
              placeholder={studentDetails.data.first_name}
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
              placeholder={studentDetails.data.last_name}
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="my-1">
        <label htmlFor="firstName">Full Names</label>
        <input
          type="text"
          className="form-control"
          placeholder={studentDetails.data.name}
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div className="my-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder={studentDetails.data.email}
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
      <div className="my-1">
        <label htmlFor="gender">Gender</label>
        <input
          type="gender"
          className="form-control"
          placeholder={studentDetails.data.gender}
          name="gender"
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        />
      </div>
      <div className="my-1">
        <span>Student Batch</span>
        {isStudentBatchLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={studentBatch.data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isStudentBatchLoading}
            direction="up"
            onSelect={handleSelect("student_batch_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Specialty</span>
        {isSpecialtiesLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={specialties.data}
            displayKey={["specialty_name", "level_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name", "level_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name" }}
            isLoading={isSpecialtiesLoading}
            direction="up"
            onSelect={handleSelect("specialty_id")}
          />
        )}
      </div>
      <div className="my-1">
        <span>Guardian</span>
        {isParentsLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={parents.data}
            displayKey={["guardian_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "guardian_name"]}
            renameMapping={{ id: "id", name: "guardian_name" }}
            isLoading={isParentsLoading}
            direction="up"
            onSelect={handleSelect("guardian_id")}
          />
        )}
      </div>
      <div className="mt-3">
        <button
          onClick={() => {
            handleUpdateStudent();
          }}
          className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
        >
          {isPending ? <SingleSpinner /> : "Update Student"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudent;
