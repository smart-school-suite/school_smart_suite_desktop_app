import { useState } from "react";
import { useDeleteStudentMutation } from "../../Slices/Asynslices/deleteSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function DeleteStudent({ handleClose, row_id: studentId}){
  const [deleteStudent] = useDeleteStudentMutation();
  const [isDeleting, setIsDeleting] = useState();
  const handleStudentDelete = async () => {
      setIsDeleting(true);
      try{
         await deleteStudent(studentId).unwrap();
         setIsDeleting(false);
         handleClose();
         toast.custom(
          <ToastSuccess 
            title={"Delete Successfull"}
            description={"Student Deleted Succesfully"}
          />
         )
      }
      catch(e){
         toast.custom(
            <ToastDanger 
              title={"Delete Failed"}
              description={"Failed To Delete Student"}
            />
         )
         setIsDeleting(false);
      }
  }
    return(
      <>
        <div className="w-100">
         <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
         <p className="my-3" style={{ fontSize:"0.85rem" }}>
          <span>{studentId}</span>
           This action cannot be undone. This will Permanently delete This account and remove this account data from our servers
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
                   handleStudentDelete();
                }}
               >
                 {
                   isDeleting ? <SingleSpinner /> : "Yes, Delete"
                 }
              </button>
           </div>
         </div>
       </div>
      </>
    )
  }
export default DeleteStudent;
  