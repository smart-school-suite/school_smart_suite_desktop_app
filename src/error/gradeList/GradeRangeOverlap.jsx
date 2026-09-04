import {
  Dot,
  PenLine,
  Plus,
  X,
  TriangleAlert,
  Check,
  OctagonAlert,
} from "lucide-react";
import { useDispatch } from "react-redux";
function GradeRangeOverlap({
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
        <ul className="d-flex flex-column gap-2">
          <li className="fw-medium">Grade ranges overlap</li>
          <div className="d-flex flex-column gap-1 text-muted">
            <div className="d-flex flex-row align-items-center gap-1">
              <span>{gradeScale?.grades[gradeIds[0]]?.letter_grade}</span>
              <Dot size={12} />
              <span>{gradeScale?.grades[gradeIds[0]]?.min_score?.value} – {gradeScale?.grades[gradeIds[0]]?.max_score?.value}</span>
            </div>
            <div className="d-flex flex-row align-items-center gap-1">
              <span>{gradeScale?.grades[gradeIds[1]]?.letter_grade}</span>
              <Dot size={12} />
              <span>{gradeScale?.grades[gradeIds[1]]?.min_score?.value} – {gradeScale?.grades[gradeIds[1]]?.max_score?.value}</span>
            </div>
          </div>
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
export default GradeRangeOverlap;
