import { Icon } from "@iconify/react";
import { useUpdateStudentBatchMutation } from "../../Slices/Asynslices/updateSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
function UpdateStudentBatch({ handleClose, row_id: studentBatchId }) {
   const [formData, setFormData] = useState({
        name: "",
        description: "",
      });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }; 
  const [isUpdating, setIsUpating] = useState(false);
  const [updateStudentBatch] = useUpdateStudentBatchMutation();
  const handleUpdateStudentBatch = async () => {
      setIsUpating(true);
      try{
          await updateStudentBatch().unwrap();
          setIsUpating(false);
          handleClose();
          toast.custom(
             <ToastSuccess 
               title={"Update Succesfull"}
               description={"Student Batch Updated Succesfully"}
             />
          )

      }
      catch(e){
        setIsUpating(false);
        toast.custom(
           <ToastDanger 
             title={"Update Failed"}
             description={"Failed to update student batch please try again"}
           />
        )
      }
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
          {isUpdating ? <SingleSpinner /> : "Update Batch"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudentBatch;
