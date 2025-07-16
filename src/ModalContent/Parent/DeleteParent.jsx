import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeleteParent } from "../../hooks/parent/useDeleteParent";
function DeleteParent({ handleClose, rowData}) {
  const parentId = rowData.id;
  const {mutate:deleteParent, isPending} = useDeleteParent(handleClose);
  const handleDeleteParent = async () => {
     deleteParent(parentId);  
  };
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
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
              onClick={() => {
                handleDeleteParent();
              }}
            >
              {isPending ? <SingleSpinner /> : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeleteParent;
