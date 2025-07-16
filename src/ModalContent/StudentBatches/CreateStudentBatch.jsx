import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudentBatch } from "../../hooks/studentBatch/useCreateBatch";
import { Icon } from "@iconify/react";
function CreateStudentBatch({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { mutate: createBatch, isPending } = useCreateStudentBatch(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    createBatch(formData);
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h5 className="m-0">Create Student Batch</h5>
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
        <span>Batch Title</span>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Great Archievement, Humility"
        />
      </div>
      <div className="my-1">
        <span>Graduation Date</span>
        <textarea
          className="form-control"
          placeholder="Enter Decription........"
          name="description"
          onChange={(e) => handleInputChange("description", e.target.value)}
          value={formData.description}
        ></textarea>
      </div>
      <div className="mt-2">
        <button
          className="border-none px-3 py-2 w-100 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleSubmit();
          }}
        >
          {isPending ? <SingleSpinner /> : "Create Batch"}
        </button>
      </div>
    </div>
  );
}
export default CreateStudentBatch;
