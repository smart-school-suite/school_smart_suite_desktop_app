import { useDeleteResitTimetableMutation } from "../../Slices/Asynslices/deleteSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
function DeleteTimetable({ handleClose, row_id: examId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteResitTimetable] = useDeleteResitTimetableMutation();
  const handleDeleteTimetable = async () => {
    try {
      await deleteResitTimetable(examId).unwrap();
      handleClose();
      setIsDeleting(false);
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull ✅"}
          description={"The Exam time table has been deleted successfully "}
        />
      );
    } catch (e) {
      setIsDeleting(false);
      toast.custom(
        <ToastDanger
          title={"Delete Failed ❌"}
          description={
            "❌ Something went wrong! The Exam time table delete failed due to an error. Please try again later."
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
            onClick={handleDeleteTimetable}
          >
            {isDeleting ? <SingleSpinner /> : "Delete Time"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteTimetable;
