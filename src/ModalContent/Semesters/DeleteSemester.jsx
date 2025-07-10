import toast from "react-hot-toast";
import { useDeleteSchoolSemesterMutation } from "../../Slices/Asynslices/deleteSlice";
import ToastDanger from "../../components/Toast/ToastDanger";
import { useState } from "react";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function DeleteSemester({ handleClose, row_id: schoolSemesterId }) {
  const [deleteSchoolSemester] = useDeleteSchoolSemesterMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteSchoolSemester = async () => {
    setIsDeleting(true);
    try {
      await deleteSchoolSemester(schoolSemesterId).unwrap();
      setIsDeleting(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull ✅"}
          description={"The School smeseter has been deleted successfully "}
        />
      );
      handleClose();
    } catch (e) {
      setIsDeleting(false);
      toast.custom(
        <ToastDanger
          title={"Delete Failed ❌"}
          description={
            "❌ Something went wrong! The School smeseter delete failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you absolutely sure?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will permanently delete this
          account and remove this account data from our servers.
        </p>
        <div className="mt-4 d-flex justify-content-end gap-2">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
            onClick={handleDeleteSchoolSemester}
          >
            {isDeleting ? <SingleSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteSemester;
