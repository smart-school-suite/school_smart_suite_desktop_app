import { useDeleteAddtionalFeeMutation } from "../../Slices/Asynslices/deleteSlice";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function DeleteAdditionalFees({ handleClose, row_id: additionalFeeId }) {
  const [feedback, setFeedback] = useState({
    message: "",
    type: null,
    loading: false,
  });
  const [deleteAddtionalFee] = useDeleteAddtionalFeeMutation();

  const handleDeleteAddtionalFees = async () => {
    setFeedback({ message: "", type: null, loading: true });
    try {
      await deleteAddtionalFee(additionalFeeId).unwrap();
      setFeedback({
        message: "Addtional Fee  Deleted Successfully",
        type: "success",
        loading: false,
      });
    } catch (e) {
      setFeedback({
        message: "Oops, Couldn't Delete School Admin",
        type: "error",
        loading: false,
      });
    }
  };
  return (
    <>
      {feedback.loading ? (
        <SingleSpinner />
      ) : !feedback.message ? (
        <div className="w-100">
          <h4 className="fw-semibold">Are you absolutely sure?</h4>
          <p className="my-3" style={{ fontSize: "0.85rem" }}>
            This action cannot be undone. This will permanently delete this
            account and remove this account data from our servers.{" "}
            {additionalFeeId}
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
              onClick={handleDeleteAddtionalFees}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="w-100">
          {feedback.message && (
            <div
              className={`alert ${
                feedback.type === "error" ? "alert-warning" : "alert-success"
              } font-size-sm`}
            >
              {feedback.message}
            </div>
          )}
          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Close
            </button>
            {feedback.type === "error" && (
              <button
                className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                onClick={handleDeleteAddtionalFees}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default DeleteAdditionalFees;
