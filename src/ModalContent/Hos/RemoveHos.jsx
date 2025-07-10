import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useRemoveHeadOfSpecialtyMutation } from "../../Slices/Asynslices/deleteSlice";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function RemoveHos({ handleClose, row_id: hosId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [removeHeadOfSpecialty] = useRemoveHeadOfSpecialtyMutation();
  const handleRemoveHos = async () => {
    setIsDeleting(true);
    try {
      await removeHeadOfSpecialty(hosId).unwrap();
      handleClose();
      setIsDeleting(false);
      toast.custom(
        <ToastSuccess
          title={"Head of Specialty Removed ✅"}
          description={"The Head of Specialty has been removed successfully"}
        />
      );
    } catch (error) {
      setIsDeleting(false);
      toast.custom(
        <ToastDanger
          title={"Head of Specialty Removal Failed ❌"}
          description={
            "❌ Something went wrong! The Head of Specialty removal failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  return (
    <>
      <div className="w-100">
        <h5 className="fw-medium">Are you Absolutely sure ?</h5>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
             onClick={handleClose}
            >
              Cancel
            </button>
            <button 
               className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
               disabled={isDeleting}
                onClick={handleRemoveHos}
               >
              {
                isDeleting ? <SingleSpinner /> : "Remove Hos"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default RemoveHos;
