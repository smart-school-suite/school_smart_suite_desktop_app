import { useDeleteDepartmentMutation } from "../../Slices/Asynslices/deleteSlice";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
function DeleteDepartment({ handleClose, row_id: departmentId }) {
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteDepartment = async () => {
    setIsDeleting(true);
    try {
      await deleteDepartment(departmentId).unwrap();
      setIsDeleting(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull ✅"}
          description={"The department has been deleted successfully "}
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Something went wrong ❌"}
          description={
            "Something went wrong! The department deletion failed due to an error. Please try again later."
          }
        />
      );
      setIsDeleting(false);
    }
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
              onClick={() => {
                handleDeleteDepartment();
              }}
            >
              {isDeleting ? <SingleSpinner /> : <>Delete Department</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeleteDepartment;
