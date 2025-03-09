import { SingleSpinner } from "../../components/Spinners";
import { useUpdateSchoolAdminMutation } from "../../Slices/Asynslices/updateSlice";
const UpdateSchoolAdmin = ({ row_id, handleClose }) => {
  const [updateSchoolAdmin] = useUpdateSchoolAdminMutation();
  const [feedback, setFeedback] = useState({
    message: "",
    type: null,
    loading: false,
  });
  const handleAdminUpdate = async () => {
    setFeedback({ message: "", type: null, loading: true });
    try {
      await updateSchoolAdmin({ school_admin_id: row_id }).unwrap();
      setFeedback({
        message: "School Admin Updated Succefully",
        type: "success",
        loading: false,
      });
    } catch (e) {
      setFeedback({
        message: "Something went wrong",
        type: "error",
        loading: false,
      });
    }
  };
  return (
    <>
      {feedback.loading ? (
        <SingleSpinner />
      ) : (
        <>
          <div className="w-100 mb-4 pe-2 d-flex flex-row justify-content-between align-items-center">
            <span className="fw-semibold fs-5">Update School Admin</span>
            <button
              className="border-none transparent-bg color-primary d-flex flex-row align-items-center"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="ic:round-cancel" width="28" height="28" />
            </button>
          </div>
          {feedback.message && (
            <div
              className={`alert ${
                feedback.type === "error" ? "alert-warning" : "alert-success"
              } font-size-sm`}
            >
              {feedback.message}
            </div>
          )}
          <div className="card w-100 border-none">
            <FullNamesInput />
            <EmailInput />
            <div className="my-1">
              <p className="my-0">Role</p>
            </div>
            <div className="my-1 d-flex flex-row align-items-center justify-content-between gap-2">
              <div className="my-1 w-50">
                <p className="my-0">Qualification</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Software Engineering"
                  name=""
                />
              </div>
              <div className="my-1 w-50">
                <FieldOfStudyInput />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
              <div className="my-1 w-100">
                <p className="my-0">Work Schedule</p>
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white"
              onClick={() => {
                handleAdminUpdate();
              }}
            >
              Update
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default UpdateSchoolAdmin;
