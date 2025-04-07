import { useReinstateDropoutStudentMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
function ReinistateStudent({ handleClose, row_id: studentDropoutId }) {
  const [reinstateDropoutStudent] = useReinstateDropoutStudentMutation();
  const [isReinstating, setIsReinstating] = useState(false);
  const handleReinstateStudent = async () => {
    setIsReinstating(true);
    try {
      await reinstateDropoutStudent(studentDropoutId).unwrap();
      setIsReinstating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Student Reinstated  "}
          description={"Student reinstated Successfully"}
        />
      );
    } catch (e) {
      setIsReinstating(false);
      toast.custom(
        <ToastDanger
          title={"Failed to reinstate Stundet"}
          description={
            "Failed to reinstate student due to an error please try again"
          }
        />
      );
    }
  };

  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          <span>{studentDropoutId}</span>
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
                handleReinstateStudent();
              }}
            >
              {isReinstating ? <SingleSpinner /> : "Yes, Reinstate"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReinistateStudent;
