import { useDispatch } from "react-redux";
function DuplicatePerformance({
  error,
  updateGradeContext,
  nextStep,
  grade,
  gradeScale,
}) {
  const dispatch = useDispatch();
  const gradeIds = error.grade_ids;
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <ul className="d-flex flex-column gap-1">
          <li className="fw-medium">Duplicate performance label</li>
          <p className="text-muted">
            {gradeScale?.grades[gradeIds[0]]?.letter_grade} and{" "}
            {gradeScale?.grades[gradeIds[1]]?.letter_grade} both use "
            {`${gradeScale?.grades[gradeIds[1]]?.performance?.value}`}"
          </p>
        </ul>
        <button
          className="border-none bg-none border-bottom"
          onClick={() => {
            dispatch(
              updatedGradeContext({
                field: "scale",
                data: { ...grade },
              }),
            );
            nextStep();
          }}
        >
          Edit Scale
        </button>
      </div>
    </>
  );
}
export default DuplicatePerformance;
