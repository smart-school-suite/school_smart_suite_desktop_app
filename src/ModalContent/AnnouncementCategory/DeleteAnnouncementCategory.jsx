import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeleteAnnouncementCategory } from "../../hooks/announcement/useDeleteAnnouncementCategory";
function DeleteAnnouncementCategory({ handleClose, rowData }) {
  const { id:categoryId } = rowData
  const { mutate:deleteCategory, isPending } = useDeleteAnnouncementCategory();
  const handleDelete = async () => {
     deleteCategory(categoryId);
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
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
              disabled={isPending}
              onClick={() => {
                 handleDelete();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Delete</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeleteAnnouncementCategory;
