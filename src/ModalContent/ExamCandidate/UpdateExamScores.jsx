import { useGetExamScoreByCandidate } from "../../hooks/evaluateStudent/useGetExamScoresByCandidate";
import { useCreateExamMarks } from "../../hooks/evaluateStudent/useCreateExamMarks";
import { useUpdateExamMarks } from "../../hooks/evaluateStudent/useUpdateExamMarks";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setExamScores,
  setExamGrading,
  setMaxGpa,
  updateScore,
  resetExamScoreState,
} from "../../Slices/Asynslices/ExamScoreSlice";
import NumberFlow from "@number-flow/react";
import { Icon } from "@iconify/react";
function UpdateExamScores({ handleClose, rowData }){
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { student_id: studentId, id: candidateId } = rowData;
  const { data: updateData, isFetching } = useGetExamScoreByCandidate(candidateId);
  const formData = useSelector((state) => state.createExamScore.examScores);
  const maxGpa = useSelector((state) => state.createExamScore.maxGpa);
  const { mutate:updateExamScores, isPending } = useUpdateExamMarks(handleClose); 
  const resultSummary = useSelector(
    (state) => state.createExamScore.resultSummary
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateData?.data) {
      const examGrading = updateData.data.exam_grades.map((items) => ({
        gradePoints: parseFloat(items.grade_points),
        gradeStatus: items.grade_status,
        resitStatus: items.resit_status,
        minimumScore: parseFloat(items.minimum_score),
        maximumScore: parseFloat(items.maximum_score),
        determinant: items.determinant,
        letterGrade: items.lettergrade.letter_grade,
      }));
      const examScores = updateData.data.mapped_marks.map((items) => ({
        markId:items.exam_mark_id,
        studentId: studentId,
        candidateId: candidateId,
        courseId: items.course_id,
        courseName: items.course.course_title,
        gradePoints: parseFloat(items.exam_grade_points),
        gradeStatus: items.exam_grade_status,
        resitStatus: items.exam_resit_status,
        determinant: items.exam_gratification,
        letterGrade: items.exam_grade,
        score: (parseFloat(items.exam_score) + parseFloat(items.ca_score)).toFixed(2),
        caScore: parseFloat(items.ca_score),
        examScore: parseFloat(items.exam_score),
      }));

      dispatch(setMaxGpa(updateData.data.max_gpa));
      dispatch(setExamGrading(examGrading));
      dispatch(setExamScores({ examScores, recalculate: true }));
    }
  }, [updateData?.data, studentId, candidateId, dispatch]);

  const handleScoreChange = (e, index) => {
    const newScore = parseFloat(e.target.value);
    dispatch(updateScore({ index, score: newScore }));
  };

  const handleUpdateExamScores = () => {
     const formatedData = formData.map((items) => ({
         mark_id:items.markId,
         course_id:items.courseId,
         score:items.examScore
     }));
     updateExamScores({ scores_entries:formatedData })
  }
  if (isFetching) {
    return <SingleSpinner />;
  }
     return(
        <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <span>Update Exam Scores</span>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 mb-2">
        <button 
          className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
          onClick={() => {
             handleUpdateExamScores();
             dispatch(resetExamScoreState());
          }}
          >
          { isPending ? <SingleSpinner /> : "Submit Score"}
        </button>
      </div>
      <div className="grades-box rounded-3 card">
        <table className={`${darkMode ? 'table-dark' : null} table-responsive table`}>
          <thead className="grades-thead">
            <tr>
              <th className="text-start">Course</th>
              <th className="text-center">Score</th>
              <th className="text-center">CA Score</th>
              <th className="text-center">Final Score</th>
              <th className="text-center">Grade Points</th>
              <th className="text-center">Score Status</th>
              <th className="text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((items, index) => (
              <tr className="grades-tr" key={index}>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column w-100">
                      <span>{items.courseName}</span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <input
                        type="number"
                        step="0.01"
                        className={`form-control w-100 font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null}`}
                        value={items.examScore}
                        onChange={(e) => handleScoreChange(e, index)}
                        placeholder={items.examScore ? items.examScore : 'Enter Exam Score'}
                      />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span>
                        {<NumberFlow value={parseFloat(items.caScore).toFixed(2)} />}
                      </span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span>
                        {<NumberFlow value={parseFloat(items.score).toFixed(2)} />}
                      </span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span>
                        {<NumberFlow value={items.gradePoints} />}
                      </span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span className="text-capitalize">{items.gradeStatus || "NA"}</span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14.2%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
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
            <span className="fw-semibold">{resultSummary.coursesPassed}</span>
          </span>
          <span>
            Courses Failed:{" "}
            <span className="fw-semibold">{resultSummary.coursesFailed}</span>
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
        </>
     )
}
export default UpdateExamScores