import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetCaExamScoresByCandidate } from "../../hooks/evaluateStudent/useGetCaExamScoresByCandidate";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExamScores,
  setExamGrading,
  setMaxGpa,
  updateScore,
  resetCaScoreState,
} from "../../Slices/Asynslices/CaScoreSlice";
import { Icon } from "@iconify/react";
import NumberFlow from "@number-flow/react";
import { useUpdateCaMarks } from "../../hooks/evaluateStudent/useUpdateCaMarks";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function UpdateCaScores({ handleClose, rowData }) {
  const { student_id: studentId, id: candidateId } = rowData;
  const {
    data: updateData,
    isLoading: isUpdateDataLoading,
    error: updateDataError,
  } = useGetCaExamScoresByCandidate(candidateId);
  const { mutate: updateCaMarks, isPending } = useUpdateCaMarks(handleClose);
  const formData = useSelector((state) => state.createCaScore.examScores);
  const maxGpa = useSelector((state) => state.createCaScore.maxGpa);
  const resultSummary = useSelector(
    (state) => state.createCaScore.resultSummary
  );
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData?.data) {
      const examGrading = updateData?.data?.exam_grades?.map((items) => ({
        gradePoints: parseFloat(items.grade_points),
        gradeStatus: items.grade_status,
        resitStatus: items.resit_status,
        minimumScore: parseFloat(items.minimum_score),
        maximumScore: parseFloat(items.maximum_score),
        determinant: items.determinant,
        letterGrade: items.lettergrade.letter_grade,
      }));
      const examScores = updateData?.data?.ca_marks?.map((items) => ({
        mark_id: items.id,
        studentId: studentId,
        candidateId: candidateId,
        courseId: items.courses_id,
        courseName: items.course.course_title,
        gradePoints: parseFloat(items.grade_points),
        gradeStatus: items.grade_status,
        resitStatus: items.resit_status,
        determinant: items.gratification,
        letterGrade: items.grade,
        score: parseFloat(items.score),
      }));
      dispatch(setExamGrading(examGrading));
      dispatch(setMaxGpa(updateData.data.max_gpa));
      dispatch(setExamScores({ examScores, recalculate: true }));
    }
  }, [updateData?.data, studentId, candidateId, dispatch]);

  const handleScoreChange = (e, index) => {
    const newScore = parseFloat(e.target.value);
    dispatch(updateScore({ index, score: newScore }));
  };
  const handleUpdateCaScores = () => {
    const formattedData = formData.map((items) => ({
      mark_id: items.mark_id,
      course_id: items.courseId,
      score: items.score,
    }));

    updateCaMarks({ scores_entries: formattedData });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <span>Update CA Scores</span>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isUpdateDataLoading ? (
        <RectangleSkeleton height="70dvh" width="100%" />
      ) : updateDataError ? (
        <NotFoundError
          title={updateDataError?.response?.data?.errors?.title}
          description={updateDataError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 mb-2">
            <button
              className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
              onClick={() => {
                handleUpdateCaScores();
                dispatch(resetCaScoreState());
              }}
            >
              {isPending ? <SingleSpinner /> : "Submit Score"}
            </button>
          </div>
          <div
            className={`card grades-box rounded-3 ${
              darkMode ? "dark-bg gainsboro-color" : "bg-white  border"
            }`}
          >
            <table
              className={`${
                darkMode ? "table-dark" : null
              } table-responsive table`}
            >
              <thead className="grades-thead">
                <tr>
                  <th className="text-start">Course</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Grade Points</th>
                  <th className="text-center">Score Status</th>
                  <th className="text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((items, index) => (
                  <tr className="grades-tr" key={index}>
                    <td style={{ width: "20%" }}>
                      <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center font-size-sm">
                        <div className="d-flex flex-column w-100 font-size">
                          <span className="text-capitalize">
                            {items?.courseName || "N/A"}
                          </span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center font-size-sm">
                        <div className="d-flex flex-column">
                          <input
                            type="number"
                            step="0.01"
                            className={`form-control w-100 font-size-sm p-2 ${
                              darkMode ? "dark-mode-input" : null
                            }`}
                            value={items.score}
                            onChange={(e) => handleScoreChange(e, index)}
                            placeholder={items.score || 0}
                          />
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center font-size-sm">
                        <div className="d-flex flex-column">
                          <span>
                            {
                              <NumberFlow
                                value={items.gradePoints.toFixed(2)}
                              />
                            }
                          </span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="h-100 d-flex flex-row align-items-center justify-content-center font-size-sm">
                        <div className="d-flex flex-column">
                          <span className="text-capitalize">
                            {items.gradeStatus || "N/A"}
                          </span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center font-size-sm">
                        <div className="d-flex flex-column">
                          <span>{items.letterGrade || "N/A"}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex flex-row align-items-center justify-content-end gap-3 py-2 font-size-sm pe-2">
              <span>
                Exam-Status:{" "}
                <span className="fw-semibold">{resultSummary.examStatus} </span>
              </span>
              <span>
                Courses Passed:{" "}
                <span className="fw-semibold">
                  {resultSummary.coursesPassed}
                </span>
              </span>
              <span>
                Courses Failed:{" "}
                <span className="fw-semibold">
                  {resultSummary.coursesFailed}
                </span>
              </span>
              <span>
                GPA:{" "}
                <span className="fw-semibold">
                  {<NumberFlow value={resultSummary.gpa.toFixed(2)} />}/
                  {parseFloat(maxGpa).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UpdateCaScores;
