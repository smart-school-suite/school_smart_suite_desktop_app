import { useState } from "react";
import toast from "react-hot-toast";
import { useAddStudentBatchMutation } from "../../Slices/Asynslices/postSlice";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
function CreateStudentBatch({ handleClose }) {
    const [formData, setFormData] = useState({
      name: "",
      description: "",
    });
    const [addStudentBatch] = useAddStudentBatchMutation();
    const [isCreating, setIsCreating] = useState(false);
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
      setIsCreating(true);
      try {
        await addStudentBatch(formData).unwrap();
        setIsCreating(false);
        handleClose();
        toast.custom(
           <ToastSuccess 
             title={"Student Batch Created"}
             description={"Student Batch Created Successfully"}
           />
        );
      } catch (error) {
        setIsCreating(false);
        toast.custom(
           <ToastDanger 
             title={"Failed to Create"}
             description={"Failed to create student batch due to an error please try again"}
           />
        );
      }
    };
    return (
      <div className="w-100">
        <div className="d-flex flex-row">
          <div>
            <h5>Create Student Batch</h5>
            <span className="font-size-sm gainsboro-color">
              Lorem reprehenderit eligendi iure animi ea odit quis voluptatum fuga{" "}
            </span>
          </div>
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
          <textarea className="form-control"
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
              {
                isCreating ? <SingleSpinner /> : "Create Batch"
              }
            </button>
          </div>
      </div>
    );
  }
  export default CreateStudentBatch;