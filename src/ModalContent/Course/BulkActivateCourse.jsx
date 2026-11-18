import { CircleX } from "lucide-react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useBulkActivateCourse } from "../../hooks/course/useBulkActivateCourse";
import { useFormError } from "../../hooks/form/useFormError";
function BulkActivateCourse({ handleClose, rowData, bulkData, resetAll }) {
  // The dropdown passes rowData.selectedCourses; the toast icon (ModalButton) passes bulkData.
  const selectedCourses = rowData?.selectedCourses ?? bulkData ?? [];
  const { mutate: bulkActivateCourse, isPending } = useBulkActivateCourse(
    handleClose,
    resetAll,
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Bulk Activate Course");
  const formattedData = selectedCourses.map((items) => ({
    course_id: items.id,
  }));
  const handleBulkActivateCourses = () => {
    clearFormError();
    bulkActivateCourse(
      { courseIds: formattedData },
      { onError: handleServerError },
    );
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
              <span className="font-size-sm fw-semibold">Activate Course</span>
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
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="px-1 d-flex flex-column gap-2 font-size-sm pt-3">
          <span className="fw-semibold">Are you Absolutely sure ?</span>
          <p>
            The selected courses become active and can be scheduled and examined again.
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
              disabled={isPending || selectedCourses.length === 0}
              onClick={() => {
                handleBulkActivateCourses();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Activate All</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkActivateCourse;
