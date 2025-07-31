import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeleteSchoolSemester } from "../../hooks/schoolSemester/useDeleteSchoolSemester";
function DeleteSemester({ handleClose, rowData }) {
  const { id:semesterId } = rowData;
  const { mutate:deleteSemester, isPending } = useDeleteSchoolSemester();
  const handleDeleteSchoolSemester = async () => {
     deleteSemester(semesterId)
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
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={handleDeleteSchoolSemester}
          >
            {isPending ? <SingleSpinner /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteSemester;
