import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeactivateCourse } from "../../hooks/course/useDeactivateCourse";
function DeactivateCourse({ handleClose, rowData }) {
  const courseId = rowData.id;
  const { mutate: deactivateCourse, isPending } = useDeactivateCourse(handleClose, courseId);
  const handleDeactivateCourse = () => {
    deactivateCourse(courseId);
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
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleDeactivateCourse();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Deactivate</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeactivateCourse;
