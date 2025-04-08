import { useState } from "react";
import { useDeleteStudentBatchMutation } from "../../Slices/Asynslices/deleteSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
function DeleteStudentBatch({  handleClose, row_id:studentBatchId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStudentBatch] = useDeleteStudentBatchMutation();
  const handleDelete = async () => {
      setIsDeleting(true);
      try{
         await deleteStudentBatch(studentBatchId).unwrap();
         setIsDeleting(false);
         handleClose();
         toast.custom(
           <ToastSuccess
              title={"Delete Succesfull"}
              description={"Student Batch Deleted Succesfully"}
           />
         )
      }
      catch(e){
        setIsDeleting(false);
        toast.custom(
           <ToastDanger 
            title={"Failed Delete"}
            description={"Student Batch Failed to Delete Due to an error"}
           />
        )
      }
  }
    return (
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
                className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                onClick={() => {
                   handleDelete();
                }}
               >
              {
                 isDeleting ? <SingleSpinner /> : "Yes, Delete"
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default DeleteStudentBatch;