import { useGetExamUpdateHelperData } from "../../hooks/evaluationHelper/useGetExamUpdateHelperData";
import { useCreateExamMarks } from "../../hooks/evaluateStudent/useCreateExamMarks";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFlow from "@number-flow/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import {
  setUpdateInitialData,
  updateDraftScore,
  resetUpdateState,
} from "../../Slices/examEvaluation/examEvaluationSlice";
import { RESIT_LABEL, RESULT, RESULT_LABEL } from "@/constants";
import { Dot, CircleX } from "lucide-react";
import { ProgressBar } from "react-bootstrap";
import VerticalDashedLine from "../../components/DashedLine/VerticalDashedLine";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import SearchInput from "../../components/input/search";
import { useUpdateExamMarks } from "../../hooks/evaluateStudent/useUpdateExamMarks";
function UpdateExamScores({ handleClose, rowData }) {
  const { id: candidateId } = rowData;
  const {
    data: helperData,
    isLoading,
    error,
  } = useGetExamUpdateHelperData(candidateId);
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state?.examEvaluation?.update);
  const darkMode = useSelector((state) => state?.theme?.darkMode);
  const { mutate: updateExamScores, isPending } =
    useUpdateExamMarks(handleClose);

  useEffect(() => {
    const data = helperData?.data;

    if (data && !isLoading) {
      dispatch(
        setUpdateInitialData({
          courses: data?.scores,
          gradeScale: data?.grade_scale,
          maxGpa: data?.max_gpa,
          maxScore: data?.exam?.max_score,
          caMaxScore: data?.ca_exam?.max_score,
        }),
      );
    }
  }, [helperData, isLoading, dispatch]);

  const scoresList = Array.isArray(moduleState?.draft.scores)
    ? moduleState?.draft?.scores
    : [];
  const totalScoresCount = scoresList.length;

  const coursesEvaluated = scoresList.reduce((count, course) => {
    const isValidScore =
      course?.score !== "" &&
      course?.score !== null &&
      course?.score !== undefined &&
      !isNaN(course?.score);

    return isValidScore ? count + 1 : count;
  }, 0);

  const completionPercentage =
    totalScoresCount > 0 ? (coursesEvaluated / totalScoresCount) * 100 : 0;

  const handleUpdateScores = () => {
    const payload = {
      scores: scoresList.map((score) => ({
        score_id: score.id,
        score: score.score,
      })),
    };
    updateExamScores(payload);
  };

  const maxGpaVal = parseFloat(moduleState?.maxGpa);
  const formattedMaxGpa = isNaN(maxGpaVal) ? "0.00" : maxGpaVal.toFixed(2);

  const caMaxScoreVal = parseFloat(moduleState?.caMaxScore);
  const safeCaMaxScore = isNaN(caMaxScoreVal) ? 0 : caMaxScoreVal;

  const maxScoreVal = parseFloat(moduleState?.maxScore);
  const safeMaxScore = isNaN(maxScoreVal) ? 0 : maxScoreVal;

  const examMaxDiff = safeMaxScore - safeCaMaxScore;
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
                Evaluate Exam Candidate
              </span>
            </div>
            <button
              onClick={() => {
                dispatch(resetUpdateState());
                handleClose?.();
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
                    {rowData?.student_name ?? "—"}
                  </span>
                  <div
                    className="d-flex flex-row align-items-center gap-1 text-muted text-capitalize text-truncate"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <small>{rowData?.level_name ?? "—"}</small>
                    <Dot />
                    <small>{rowData?.specialty_name ?? "—"}</small>
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
                  {rowData?.exam_name ?? "—"}
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
                  {rowData?.academic_year ?? "—"}
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
                    <small>{totalScoresCount}</small>
                    <small>Courses Evaluated</small>
                  </small>
                )}
                <small style={{ fontSize: "0.7rem" }} className="fw-semibold">
                  {completionPercentage.toFixed(0)} % complete
                </small>
              </div>
              <ProgressBar
                now={completionPercentage}
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
                    <NumberFlow
                      value={moduleState?.draft?.resultSummary?.gpa ?? 0}
                    />
                  </span>
                  <span>/</span>
                  <span className="text-muted font-size-sm">
                    {formattedMaxGpa}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Courses Passed</span>
                <span className="fw-bold font-size-sm">
                  <NumberFlow
                    value={
                      moduleState?.draft?.resultSummary?.coursesPassed ?? 0
                    }
                  />
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Courses Failed</span>
                <span className="fw-bold font-size-sm">
                  <NumberFlow
                    value={
                      moduleState?.draft?.resultSummary?.coursesFailed ?? 0
                    }
                  />
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">total Resits</span>
                <span className="fw-bold font-size-sm">
                  <NumberFlow
                    value={
                      moduleState?.draft?.resultSummary?.coursesFailed ?? 0
                    }
                  />
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <span className="text-muted font-size-sm">Result</span>
                <span
                  className={`fw-semibold font-size-sm ${
                    moduleState?.draft?.resultSummary?.examStatus ==
                    RESULT?.PASSED
                      ? "text-fern-500"
                      : moduleState?.draft?.resultSummary?.examStatus ==
                          RESULT.FAILED
                        ? "text-red-500"
                        : "text-muted"
                  }`}
                >
                  {RESULT_LABEL[
                    moduleState?.draft?.resultSummary?.examStatus
                  ] ?? "N/A"}
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
                  {scoresList.map((course, index) => {
                    const caScoreParsed = parseFloat(course?.caScore);
                    const safeCaScore = isNaN(caScoreParsed)
                      ? 0
                      : caScoreParsed;

                    const examScoreParsed = parseFloat(course?.score);
                    const safeExamScore = isNaN(examScoreParsed)
                      ? 0
                      : examScoreParsed;

                    const finalScore = safeCaScore + safeExamScore;

                    return (
                      <Fragment key={course?.id || index}>
                        <div className="card border rounded-4 px-3 py-3 font-size-sm d-flex flex-column gap-3 shadow-sm">
                          <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-column">
                              <span className="fw-semibold">
                                {course?.course_title ?? "—"}
                              </span>
                              <span className="text-muted">
                                {course?.course_code ?? "—"}
                              </span>
                            </div>
                            <span className="text-muted">
                              {course?.course_credit ?? 0} credit
                            </span>
                          </div>
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center gap-2">
                              <span
                                style={{ width: 10, height: 10 }}
                                className="primary-background-200 rounded-circle"
                              ></span>
                              <span>CA Score</span>
                            </div>
                            <div className="d-flex flex-row align-items-center gap-1 fw-semibold">
                              <span className="tabular-numbers">
                                {course?.caScore ?? 0}
                              </span>
                              <span>/</span>
                              <span className="tabular-numbers">
                                {safeCaMaxScore}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center gap-2">
                              <span
                                style={{ width: 10, height: 10 }}
                                className="primary-background-400 rounded-circle"
                              ></span>
                              <span>Exam Score</span>
                            </div>
                            <div className="d-flex flex-row align-items-center gap-2">
                              <input
                                type="number"
                                step={"0.01"}
                                min={0}
                                max={safeMaxScore}
                                placeholder="—"
                                value={course?.score ?? ""}
                                onChange={(e) =>
                                  dispatch(
                                    updateDraftScore({
                                      scoreId: course?.id,
                                      score: e.target.value,
                                    }),
                                  )
                                }
                                className="form-control"
                                style={{
                                  width: 100,
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
                              <span className="text-muted font-size-md tabular-numbers">
                                / {examMaxDiff}
                              </span>
                            </div>
                          </div>
                          <HorizontalDashedLine
                            dashed={false}
                            color="#ccc"
                            thickness={0.2}
                          />
                          <div className="d-flex flex-row align-items-center justify-content-between">
                            <span className="fw-semibold">Final Score</span>
                            <div className="d-flex flex-row align-items-baseline gap-1">
                              <span className="font-size-lg fw-bold tabular-numbers">
                                <NumberFlow value={finalScore} />
                              </span>
                              <span>/</span>
                              <span className="font-size-sm text-muted tabular-numbers">
                                {safeMaxScore}
                              </span>
                            </div>
                          </div>
                          <HorizontalDashedLine
                            dashed={false}
                            color="#ccc"
                            thickness={0.2}
                          />
                          {course?.score !== undefined &&
                          course?.score !== null &&
                          course?.score !== "" ? (
                            <div className="d-flex flex-row align-items-center justify-content-between">
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <small className="text-uppercase text-muted">
                                  Performance
                                </small>
                                <span>{course?.performance ?? "—"}</span>
                              </div>
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <small className="text-uppercase text-muted">
                                  Grade
                                </small>
                                <span
                                  className={
                                    course?.result === RESULT?.PASSED
                                      ? "text-fern-500"
                                      : "text-red-500"
                                  }
                                >
                                  {course?.grade ?? "—"}
                                </span>
                              </div>
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <small className="text-uppercase text-muted">
                                  Grade Point
                                </small>
                                <span className="fw-semibold tabular-numbers">
                                  <NumberFlow
                                    value={course?.gradePoints ?? 0}
                                  />
                                </span>
                              </div>
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <small className="text-uppercase text-muted">
                                  Result
                                </small>
                                <span
                                  className={
                                    course?.result === RESULT?.PASSED
                                      ? "text-fern-500"
                                      : course?.result === RESULT?.FAILED
                                        ? "text-red-500"
                                        : "text-muted"
                                  }
                                >
                                  {RESULT_LABEL?.[course?.result] ?? "—"}
                                </span>
                              </div>
                              <div className="d-flex flex-column gap-2 align-items-center">
                                <small className="text-uppercase text-muted">
                                  Resit Result
                                </small>
                                <span>
                                  {RESIT_LABEL?.[course?.resitResult] ?? "—"}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted">
                              Not yet evaluated
                            </span>
                          )}
                        </div>
                      </Fragment>
                    );
                  })}
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
                  dispatch(resetUpdateState());
                  handleClose?.();
                }}
              >
                Cancel
              </button>
              {moduleState.isDirty && (
                <button
                  className="border-0 px-3 py-2 border rounded-3 font-size-sm primary-background text-white"
                  disabled={isPending}
                  onClick={() => handleUpdateScores()}
                >
                  {isPending ? <SingleSpinner /> : "Update Ca Scores"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateExamScores;
