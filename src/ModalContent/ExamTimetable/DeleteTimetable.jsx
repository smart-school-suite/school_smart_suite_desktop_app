import { useDeleteTimetable } from "../../hooks/examTimetable/useDeleteTimetable";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function DeleteTimetable({ handleClose, rowData }) {
  const { id: examId } = rowData;
  const { mutate: deleteTimetable, isPending: isDeleting } =
    useDeleteTimetable(examId);
  const handleDeleteTimetable = () => {
    deleteTimetable(examId);
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
            {isDeleting ? <SingleSpinner /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteTimetable;
