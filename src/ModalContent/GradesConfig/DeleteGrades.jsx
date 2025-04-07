import { useState } from "react";
import { useDeleteExamGradeMutation } from "../../Slices/Asynslices/deleteSlice";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { SingleSpinner } from "../../components/Spinners";
function DeleteGradesConfig({ handleClose, row_id:examId }){
    const [deleteExamGrade] = useDeleteExamGradeMutation();
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteExamGrades = async () => {
        setIsDeleting(true);
         try{
             await deleteExamGrade(examId).unwrap();
             setIsDeleting(false);
             handleClose();
             toast.custom(
                <ToastSuccess
                  title={"Delete Successfull ✅"}
                  description={"The exam grades has been deleted successfully "}
                />
              );
            } catch (e) {
              setIsDeleting(false);
              toast.custom(
                <ToastDanger
                  title={"Delete Failed ❌"}
                  description={
                    "❌ Something went wrong! The Exam Grades deleting failed due to an error. Please try again later."
                  }
                />
              );
            }
    }
    return(
        <>
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
                handleDeleteExamGrades();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? <SingleSpinner /> : "Delete Exam Grades"}
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
export default DeleteGradesConfig;