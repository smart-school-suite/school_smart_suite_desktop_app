import { useGetResitEvaluationHelperData } from "../../hooks/resitEvaluation/useGetEvaluationHelperData";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import {
  setExamScores,
  setExamGrading,
  updateScore,
  resetResitScoreState,
} from "../../Slices/Asynslices/ResitScoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateResitScore } from "../../hooks/resitEvaluation/useCreateResitScores";
import NumberFlow from "@number-flow/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function SummitScores({ handleClose, rowData }) {
  const {
    exam_id: resitExamId,
    id: candidateId,
    student_id: studentId,
    specialty_id: specialtyId,
    reference_exam_id: refExamId,
  } = rowData;
  const dispatch = useDispatch();
  const {
    data: helperData,
    isLoading: isHelperDataLoading,
    error: helperDataError,
  } = useGetResitEvaluationHelperData(resitExamId, candidateId);
  const formData = useSelector(
    (state) => state.createResitExamScore.examScores
  );
  const { mutate: createScore, isPending } = useCreateResitScore(handleClose);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const resultSummary = useSelector(
    (state) => state.createResitExamScore.resultSummary
  );
  useEffect(() => {
    if (helperData?.data) {
      const examScores = helperData.data.course_data.map((items) => ({
        studentId: studentId,
        candidateId: candidateId,
        courseId: items.id,
        courseName: items.course_title,
        gradePoints: 0,
        gradeStatus: "",
        resitStatus: "",
        determinant: "",
        letterGrade: "",
        score: 0,
      }));
      const examGrading = helperData.data.exam_grading.map((items) => ({
        gradePoints: parseFloat(items.grade_points),
        gradeStatus: items.grade_status,
        resitStatus: items.resit_status,
        minimumScore: parseFloat(items.minimum_score),
        maximumScore: parseFloat(items.maximum_score),
        determinant: items.determinant,
        letterGrade: items.lettergrade.letter_grade,
      }));
      dispatch(setExamGrading(examGrading));
      dispatch(setExamScores(examScores));
    }
  }, [helperData?.data, studentId, candidateId, dispatch]);

  const handleScoreChange = (e, index) => {
    const newScore = parseFloat(e.target.value);
    dispatch(updateScore({ index, score: newScore }));
  };

  const handleCreateExamScores = () => {
    const isEmpty = (value) =>
      value === null || value === undefined || value.toString().trim() === "";

    const scoresData = formData
      .filter(
        (item) =>
          !isEmpty(item.score) &&
          !isEmpty(item.studentId) &&
          !isEmpty(item.candidateId) &&
          !isEmpty(item.courseId)
      )
      .map((item) => ({
        score: item.score,
        student_id: item.studentId,
        course_id: item.courseId,
        accessment_id: item.candidateId,
        exam_id: refExamId,
        specialty_id: specialtyId,
      }));

    const formattedData = {
      entries: scoresData,
    };

    createScore({ candidateId: candidateId, updateData: formattedData });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <span>Create Resit Exam Scores</span>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isHelperDataLoading ? (
        <RectangleSkeleton height="70dvh" width="100%" />
      ) : helperDataError ? (
        <NotFoundError
          title={helperDataError?.response?.data?.errors?.title}
          description={helperDataError?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 mb-2">
            <button
              className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
              onClick={() => {
                handleCreateExamScores();
                dispatch(resetResitScoreState());
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
                <tr className="font-size-sm">
                  <th className="text-start">Course</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Grade Points</th>
                  <th className="text-center">Score Status</th>
                  <th className="text-center">Resit Status</th>
                  <th className="text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((items, index) => (
                  <tr className="grades-tr" key={index}>
                    <td style={{ width: "20%" }}>
                      <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                        <div className="d-flex flex-column w-100 font-size-sm">
                          <span>{items.courseName}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "16%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column">
                          <input
                            type="number"
                            step="0.01"
                            className={`form-control w-100 font-size-sm p-2 ${
                              darkMode ? "dark-mode-input" : null
                            }`}
                            value={items.score}
                            onChange={(e) => handleScoreChange(e, index)}
                          />
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "16%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
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
                    <td style={{ width: "16%" }}>
                      <div
                        className="h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column">
                          <span>{items.gradeStatus || "NA"}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "16%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column">
                          <span>{items.resitStatus || "N/A"}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "16%" }}>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SummitScores;
