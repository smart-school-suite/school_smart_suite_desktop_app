import { Icon } from "@iconify/react";
import { useState } from "react";
import { useUpdateBatch } from "../../hooks/studentBatch/useUpdateBatch";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function UpdateStudentBatch({ handleClose, rowData }) {
  const batchId = rowData.id;
  const { mutate:updateBatch, isPending } = useUpdateBatch();
  const [formData, setFormData] = useState({
        name: "",
        description: "",
      });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }; 
  const handleUpdateStudentBatch = async () => {
     updateBatch({ batchId:batchId, updateData:formData })
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
        <h5 className="m-0">Update Student Batch</h5>
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
          value={formData.description}
        ></textarea>
      </div>
      <div className="mt-2">
        <button
          className="border-none px-3 py-2 w-100 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleUpdateStudentBatch();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Batch"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudentBatch;
