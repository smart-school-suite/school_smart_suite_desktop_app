import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeleteSchoolAdmin } from "../../hooks/schoolAdmin/useDeleteSchoolAdmin";
const DeleteSchoolAdmin = ({ rowData, handleClose }) => {
  const { id:schoolAdminId } = rowData;
  const { mutate:deleteSchoolAdmin, isPending } = useDeleteSchoolAdmin(handleClose);
  const handleDeleteSchoolAdmin =  () => {
       deleteSchoolAdmin(schoolAdminId)
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
            className="border-none px-3 py-2 color-primary rounded-3 font-size-sm w-50"
            onClick={() => {
              handleClose();
            }}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={handleDeleteSchoolAdmin}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};
export default DeleteSchoolAdmin;
