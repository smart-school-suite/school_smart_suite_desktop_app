import { useState } from "react";
import { useDeleteSchoolAdminMutation } from "../../Slices/Asynslices/deleteSlice";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
const DeleteSchoolAdmin = ({ row_id, handleClose }) => {
  const [deleteSchoolAdmin] = useDeleteSchoolAdminMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteSchoolAdmin = async () => {
    setIsDeleting(true);
    try {
      await deleteSchoolAdmin(row_id).unwrap();
      setIsDeleting(false);
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull ✅"}
          description={
            "The school administrator has been deleted successfully "
          }
        />
      );
      handleClose();
    } catch (e) {
      setIsDeleting(false);
      toast.custom(
        <ToastDanger
          title={"Delete Failed ❌"}
          description={
            "❌ Something went wrong! The school administrator delete failed due to an error. Please try again later."
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
            onClick={handleDeleteSchoolAdmin}
          >
            {isDeleting ? <SingleSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};
export default DeleteSchoolAdmin;
