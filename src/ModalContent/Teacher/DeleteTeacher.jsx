import { useState } from "react";
import { useDeleteTeacherMutation } from "../../Slices/Asynslices/deleteSlice";
import toast from "react-hot-toast";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function DeleteTeacher({ row_id:teacherId, handleClose }) {
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteTeacher = async () => {
    setIsDeleting(true);
     try{
         await deleteTeacher(teacherId).unwrap();
         toast.success("teacher deleted Succesfully");
         setIsDeleting(false);
         handleClose();
     }
     catch(e){
        toast.error("Opps Something went wrong trying to delete teacher please try again")
        setIsDeleting(false);
     }
  }
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
              Cancel
            </button>
            <button 
               className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                onClick={() => {
                   handleDeleteTeacher();
                }}
               >
              {
                 isDeleting ? <SingleSpinner /> : "Continue"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeleteTeacher;