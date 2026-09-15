import { useGetCaScores } from "../../hooks/examScore/useGetCaScores";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { Dot, Check, CircleX } from "lucide-react";
import SearchInput from "../../components/input/search";
import { Fragment } from "react";
import { Icon } from "@iconify/react";
import {  RESULT, RESULT_LABEL } from "@/constants";
import NumberFlow from "@number-flow/react";
function CaScoreDetails({ drawerData }) {
  const { id: candidateId } = drawerData;
  const { data: caScores, isLoading, error } = useGetCaScores(candidateId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-4 px-2">
              {[...Array(4)].map((_, index) => (
                <RectangleSkeleton height="20dvh" width="100%" key={index}/>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
            <div className="d-flex flex-column gap-3 px-2">
              <div className="d-flex flex-column gap-2">
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
                      {drawerData?.student_name}
                    </span>
                    <div
                      className="d-flex flex-row align-items-center gap-1 text-muted text-capitalize text-truncate"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <small>{drawerData?.level_name}</small>
                      <Dot />
                      <small>{drawerData?.specialty_name}</small>
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
                    {drawerData?.exam_name}
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
                    {drawerData?.academic_year}
                  </small>
                </div>
              </div>
              <div className="pe-2">
                <SearchInput
                  placeholder={"Search course.........."}
                  hotkey="Ctrl+U"
                />
              </div>
            </div>
            <div className="drawer-content px-2">
              <div className="d-flex flex-column gap-2">
                {caScores?.data?.scores?.map((score) => (
                  <Fragment key={score.id}>
                    <div className="card border-none border shadow-sm rounded-4 d-flex flex-column gap-3 py-3 px-3">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-column">
                          <span className="fw-semibold font-size-sm">
                            {score?.course?.course_title}
                          </span>
                          <span className="text-muted font-size-sm">
                            {score?.course?.course_code}
                          </span>
                        </div>
                        <span className="text-muted">
                          {score?.course?.credit} Credit
                        </span>
                      </div>
                      <HorizontalDashedLine
                        dashed={false}
                        color="#ccc"
                        thickness={0.2}
                      />
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <div
                            className={` rounded-2 font-size-md fw-bold ${
                              score?.grade?.result == RESULT.PASSED
                                ? "text-fern-600 bg-fern-100"
                                : score?.grade?.result == RESULT.FAILED
                                  ? "text-red-600 bg-red-100"
                                  : ""
                            }`}
                            style={{
                              width: "3rem",
                              height: "3rem",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            {score?.grade?.letter_grade}
                          </div>
                          <div className="d-flex flex-column">
                            <small className="text-muted">Score</small>
                            <div className="d-flex flex-row align-items-baseline gap-1">
                              <span className="font-size-lg fw-bold tabular-numbers">
                                {score?.score}
                              </span>
                              <span>/</span>
                              <span className="font-size-sm text-muted tabular-numbers">
                                {caScores?.data?.exam?.max_score}
                              </span>
                            </div>
                          </div>
                        </div>
                        {score?.grade?.result == RESULT.FAILED ? (
                          <span
                            className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 bg-red-100 text-red-500"
                            style={{
                              fontSize: "0.75rem",
                              height: "1.5rem",
                            }}
                          >
                            <CircleX size={16} />
                            <span>{RESULT_LABEL[score?.grade?.result]}</span>
                          </span>
                        ) : score?.grade?.result == RESULT.PASSED ? (
                          <span
                            className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 bg-fern-100 text-fern-500"
                            style={{
                              fontSize: "0.75rem",
                              height: "1.5rem",
                            }}
                          >
                            <Check size={16} />
                            <span>{RESULT_LABEL[score?.grade?.result]}</span>
                          </span>
                        ) : null}
                      </div>
                      <HorizontalDashedLine
                        dashed={false}
                        color="#ccc"
                        thickness={0.2}
                      />
                      <div className="d-flex flex-column align-items-center gap-2 w-100">
                        <div className="d-flex flex-row align-items-center justify-content-between w-100">
                          <div className="d-flex flex-row align-items-center gap-1">
                            <Icon
                              icon="carbon:chart-performance"
                              className="text-muted"
                            />
                            <span className=" text-muted">Performance</span>
                          </div>
                          <span className="fw-semibold">
                            {score?.grade?.performance}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-between w-100">
                          <div className="d-flex flex-row align-items-center gap-1">
                            <Icon
                              icon="arcticons:target"
                              className="text-muted"
                            />
                            <span className=" text-muted">Grade Points</span>
                          </div>
                          <span className="fw-semibold">
                            {score?.grade?.grade_points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="mt-auto w-100 pt-2 d-flex flex-column gap-2 px-2 pb-3">
                  <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <span className="text-muted font-size-sm">GPA</span>
                    <div className="d-flex flex-row align-items-baseline gap-1">
                      <span className="fw-bold font-size-md tabular-numbers">
                        <NumberFlow value={caScores?.data?.summary?.gpa ??  0} />
                      </span>
                      <span>/</span>
                      <span className="text-muted font-size-sm">4.00</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <span className="text-muted font-size-sm">
                      Courses Failed
                    </span>
                    <span className="fw-bold font-size-sm">{caScores?.data?.summary?.courses_failed}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <span className="text-muted font-size-sm">
                      Courses Passed
                    </span>
                    <span className="fw-bold font-size-sm">{caScores?.data?.summary?.courses_passed}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <span className="text-muted font-size-sm">Total Grade Point Earned</span>
                    <span>{caScores?.data?.summary?.total_grade_points_earned}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default CaScoreDetails;
