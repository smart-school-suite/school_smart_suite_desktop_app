import { SingleSpinner } from "../../components/Spinners/Spinners";
import { CircleX } from "lucide-react";
import { useActivateGradeScaleCategory } from "../../hooks/gradeScale/useActivateGradeScaleCategory";
function ActivateGradeScaleCategory({ handleClose, rowData }) {
  const { mutate: activateGradeScale, isPending } =
    useActivateGradeScaleCategory(handleClose, rowData.id);
  const handleActivate = () => {
    activateGradeScale(rowData.id);
  };
  return (
    <>
      <div className="w-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">
                Activate Grade Scale
              </span>
            </div>
            <button
              onClick={() => handleClose()}
              className="border-none border rounded-circle bg-transparent p-0"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>
        <div className="px-1 d-flex flex-column gap-2 font-size-sm pt-3">
          <span className="fw-semibold">Are you Absolutely sure ?</span>
          <p>
            This action cannot be undone. This will Permanently delete This
            account and remove this account data from our servers
          </p>
        </div>
        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleActivate();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Activate</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivateGradeScaleCategory;
