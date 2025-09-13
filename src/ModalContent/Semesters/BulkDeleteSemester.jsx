import { useBulkDeleteSchoolSemesters } from "../../hooks/schoolSemester/useBulkDeleteSchoolSemesters";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function BulkDeleteSemester({ handleClose, bulkData, resetAll }) {
  const { mutate: deleteSchoolSemester, isPending } =
    useBulkDeleteSchoolSemesters(handleClose, resetAll);
  const formattedData = bulkData.map((items) => ({
    school_semester_id: items.id,
  }));
  const handleDeleteAllSemester = () => {
    deleteSchoolSemester({ schoolSemesterIds: formattedData });
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
            onClick={handleDeleteAllSemester}
          >
            {isPending ? <SingleSpinner /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
export default BulkDeleteSemester;
