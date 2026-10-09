import { useGetCaEvaluationHelperData } from "../../hooks/evaluationHelper/useGetCaEvaluationHelperData";
import { Dot, X, Slash, CircleX } from "lucide-react";
import ProgressBar from "react-bootstrap/ProgressBar";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import VerticalDashedLine from "../../components/DashedLine/VerticalDashedLine";
import { Fragment, useEffect } from "react";
import SearchInput from "../../components/input/search";
import { RESIT_LABEL, RESULT, RESULT_LABEL } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import NumberFlow from "@number-flow/react";
import { NotFoundError } from "../../components/errors/Error";
import {
  setInitialData,
  resetCaScoreState,
  updateScore,
} from "../../Slices/examEvaluation/caEvaluationSlice";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useCreateCaMark } from "../../hooks/evaluateStudent/useCreateCaMarks";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function AddCaScore({ handleClose, rowData }) {
  const moduleState = useSelector((state) => state.caEvaluation);
  const { id: candidateId } = rowData;
  const dispatch = useDispatch();

  const {
    data: helperData,
    isLoading,
    error,
  } = useGetCaEvaluationHelperData(candidateId);

  const { mutate: createCaScore, isPending } = useCreateCaMark(handleClose);
  useEffect(() => {
    const data = helperData?.data;

    if (data && !isLoading) {
      dispatch(
        setInitialData({
          courses: data?.courses,
          gradeScale: data?.grade_scale,
          maxGpa: data?.max_gpa,
          maxScore: data?.exam?.max_score,
        }),
      );
    }
  }, [helperData, isLoading, dispatch]);
  const coursesEvaluated = moduleState?.scores?.reduce((count, course) => {
    const isValidScore =
      course.score !== "" &&
      course.score !== null &&
      course.score !== undefined &&
      !isNaN(course.score);

    return isValidScore ? count + 1 : count;
  }, 0);
  const handleAddCaScore = () => {
     const payload = {
         candidate_id: candidateId,
         scores: moduleState?.scores?.map((score) => ({
             course_id: score.course_id,
             score: score.score
         }))
     }
     createCaScore(payload);
  }
  return (
    <>
      <div style={{ height: "84dvh" }} className="d-flex flex-column">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">
                Evaluate Ca Exam Candidate
              </span>
            </div>
            <button
              onClick={() => {
                dispatch(resetCaScoreState());
                handleClose();
              }}
              disabled={isPending}
              className="border-0 bg-transparent p-0"
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

        <div
          className="d-flex flex-row align-items-stretch w-100 overflow-hidden"
          style={{ flex: 1 }}
        >
          <div
            className="d-flex flex-column gap-4 p-2 h-100 overflow-y-auto"
            style={{ width: "30%", flexShrink: 0 }}
          >
            <div className="d-flex flex-column gap-2 w-100">
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    flexShrink: 0,
                  }}
                  className="rounded-circle overflow-hidden"
                >
                  <img
                    src="./images/user.png"
                    alt="User"
                    className="object-fit-cover w-100 h-100"
                  />
                </div>
                <div className="d-flex flex-column overflow-hidden">
                  <span className="fw-semibold font-size-sm text-truncate">
                    {rowData?.student_name}
                  </span>
                  <div
                    className="d-flex flex-row align-items-center gap-1 text-muted text-capitalize text-truncate"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <small>{rowData?.level_name}</small>
                    <Dot />
                    <small>{rowData?.specialty_name}</small>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                <small
                  style={{
                    minHeight: "1.2rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    whiteSpace: "nowrap",
                  }}
                  className="rounded-pill px-2 primary-background-100 color-primary text-capitalize"
                >
                  {rowData?.exam_name}
                </small>
                <small
                  style={{
                    minHeight: "1.2rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    whiteSpace: "nowrap",
                  }}
                  className="rounded-pill px-2 primary-background-100 color-primary text-capitalize"
                >
                  {rowData?.academic_year}
                </small>
              </div>
            </div>

            <div className="d-flex flex-column gap-1">
              <div className="d-flex flex-row justify-content-between align-items-center">
                {isLoading ? (
                  <small
                    style={{ fontSize: "0.7rem" }}
                    className="text-muted d-flex flex-row align-items-center"
                  >
                    <small>0</small>
                    <small>/</small>
                    <small>0</small>
                    <small>Courses Evaluated</small>
                  </small>
                ) : (
                  <small
                    style={{ fontSize: "0.7rem" }}
                    className="text-muted d-flex flex-row align-items-center gap-1"
                  >
                    <small>{coursesEvaluated}</small>
                    <small>/</small>
                    <small>{moduleState?.scores?.length}</small>
                    <small>Courses Evaluated</small>
                  </small>
                )}
                <small style={{ fontSize: "0.7rem" }} className="fw-semibold">
                  {(coursesEvaluated / moduleState?.scores?.length) * 100} %
                  complete
                </small>
              </div>
              <ProgressBar
                now={(coursesEvaluated / moduleState?.scores?.length) * 100}
                style={{
                  height: "0.2rem",
                  backgroundColor: "#e9ecef",
                  borderRadius: "10px",
                }}
                className="ev-custom-progress"
              />
            </div>

            <div className="mt-auto w-100 pt-2 border-top d-flex flex-column gap-2">
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">GPA</span>
                <div className="d-flex flex-row align-items-baseline">
                  <span className="fw-bold font-size-md tabular-numbers">
                    <NumberFlow value={moduleState?.resultSummary?.gpa} />
                  </span>
                  <span>/</span>
                  <span className="text-muted font-size-sm">
                    {parseFloat(moduleState?.maxGpa).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Courses Passed</span>
                <span className="fw-bold font-size-sm">
                  <NumberFlow
                    value={moduleState?.resultSummary?.coursesPassed}
                  />
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Courses Failed</span>
                <span className="fw-bold font-size-sm">
                  <NumberFlow
                    value={moduleState?.resultSummary?.coursesFailed}
                  />
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Result</span>
                <span
                  className={`fw-semibold font-size-sm ${
                    moduleState?.resultSummary?.examStatus.toLowerCase()  == RESULT?.PASSED
                      ? "text-fern-500" : moduleState?.resultSummary?.examStatus.toLowerCase() == RESULT.FAILED ?
                       "text-red-500" : "text-muted" 
                  }`}
                >
                  { RESULT_LABEL[moduleState?.resultSummary?.examStatus.toLowerCase()] ?? "N/A"}
                </span>
              </div>
            </div>
          </div>

          <VerticalDashedLine
            dashed={false}
            color="#ccc"
            thickness={0.4}
            height="100%"
          />

          <div
            className="d-flex flex-column gap-2 h-100 p-2 overflow-hidden"
            style={{ width: "70%" }}
          >
            {isLoading ? (
              <div className="d-flex flex-column gap-2 flex-grow-1 overflow-y-auto pe-1 scroll-bar-sm">
                {[...Array(4)].map((_, index) => (
                  <Fragment key={index}>
                    <RectangleSkeleton height="20dvh" width="100%" />
                  </Fragment>
                ))}
              </div>
            ) : error ? (
              <NotFoundError
                title={error?.response?.data?.errors?.title}
                description={error?.response?.data?.errors?.description}
              />
            ) : (
              <>
                <div style={{ height: "40px", flexShrink: 0 }} className="pe-2">
                  <SearchInput
                    placeholder={"Search Course......"}
                    hotkey="Ctrl+U"
                  />
                </div>
                <div
                  className="d-flex flex-column gap-2 flex-grow-1 overflow-y-auto pe-1 scroll-bar-sm"
                  style={{ minHeight: 0, paddingBottom: "10rem" }}
                >
                  {moduleState?.scores.map((course, index) => (
                    <Fragment key={course.course_id || index}>
                      <div className="card border rounded-4 px-3 py-3 font-size-sm d-flex flex-column gap-3 shadow-sm">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">
                              {course.course_title}
                            </span>
                            <span className="text-muted">
                              {course.course_code}
                            </span>
                          </div>
                          <span className="text-muted">
                            {course.course_credit} credit
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <small className="text-muted fw-medium">SCORE</small>
                          <div className="d-flex flex-row align-items-center gap-2">
                            <input
                              type="number"
                              step={"0.01"}
                              min={0}
                              max={moduleState.maxScore}
                              placeholder="—"
                              value={course.score}
                              onChange={(e) =>
                                dispatch(
                                  updateScore({
                                    courseId: course.course_id,
                                    score: e.target.value,
                                  }),
                                )
                              }
                              className="form-control"
                              style={{
                                width: 120,
                                fontFamily: "inherit",
                                fontSize: 18,
                                fontWeight: 600,
                                fontVariantNumeric: "tabular-nums",
                                padding: "7px 9px",
                                borderRadius: 8,
                                border: `1.5px solid rgba(8,48,73,0.16)`,
                                outline: "none",
                                textAlign: "center",
                              }}
                            />
                            <span className="text-muted font-size-md">
                              / {moduleState.maxScore}
                            </span>
                          </div>
                        </div>
                        <HorizontalDashedLine
                          dashed={false}
                          color="#ccc"
                          thickness={0.2}
                        />
                        {course.score ? (
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-column gap-2 align-items-center">
                              <small className="text-uppercase text-muted">
                                Performance
                              </small>
                              <span>{course.performance}</span>
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                              <small className="text-uppercase text-muted">
                                Grade
                              </small>
                              <span
                                className={
                                  course.result === RESULT.PASSED
                                    ? "text-fern-700"
                                    : "text-red-700"
                                }
                              >
                                {course.grade}
                              </span>
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                              <small className="text-uppercase text-muted">
                                Grade Point
                              </small>
                              <span className="fw-semibold tabular-numbers">
                                <NumberFlow value={course.gradePoints} />
                              </span>
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                              <small className="text-uppercase text-muted">
                                Result
                              </small>
                              <span
                                className={
                                  course.result === RESULT.PASSED
                                    ? "text-fern-700"
                                    : "text-red-700"
                                }
                              >
                                {RESULT_LABEL[course.result]}
                              </span>
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                              <small className="text-uppercase text-muted">
                                Resit Result
                              </small>
                              <span>{RESIT_LABEL[course.resitResult]}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted">Not yet evaluated</span>
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-auto border-top p-2" style={{ height: "6dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 h-100">
            <div className="d-flex flex-row align-items-center gap-2">
              <button
              className="border-0 px-3 py-2 border rounded-3 font-size-sm bg-none"
              disabled={isPending}
              onClick={() => {
                dispatch(resetCaScoreState());
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-0 px-3 py-2 border rounded-3 font-size-sm primary-background text-white"
              disabled={isPending}
              onClick={() => handleAddCaScore()}
            >
              {
                 isPending ? <SingleSpinner /> : "Save Scores"
              }
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddCaScore;
