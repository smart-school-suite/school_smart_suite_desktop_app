import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import {
  FileText,
  Target,
  ArrowRight,
  Calendar,
  GraduationCap,
  Dot,
  TriangleAlert,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { getDayWindow, getTimeRemaining } from "../../utils/time/date";
import { useGetResitExamDetails } from "../../hooks/resitExam/useGetResitExamDetails";
function ResitExamDetails({ drawerData, handleClose }) {
  const { id: examId } = drawerData;
  const { data: examDetails, isLoading, error } = useGetResitExamDetails(examId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2 px-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(10)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="15%" />
                  <RectangleSkeleton height="1dvh" width="100%" />
                </div>
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
            <div className="drawer-content px-2">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <div
                      className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-50 color-primary"
                      style={{ height: "2.5rem", width: "2.5rem" }}
                    >
                      <FileText size={16} />
                    </div>
                    <div className="d-flex flex-column">
                      <small className="text-uppercase text-muted">
                        {examDetails?.data?.exam_type?.semesters?.name}
                      </small>
                      <span className="font-size-sm fw-semibold">
                        {examDetails?.data?.exam_type?.exam_name}
                      </span>
                    </div>
                  </div>
                  {examDetails?.data?.status == "upcoming" ? (
                    <span
                      className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor primary-background-50 color-primary"
                      style={{
                        fontSize: "0.75rem",
                        height: "1.5rem",
                      }}
                    >
                      <span>Upcoming</span>
                    </span>
                  ) : examDetails?.data?.status == "active" ? (
                    <span
                      className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-fern-50 text-fern-400"
                      style={{
                        fontSize: "0.75rem",
                        height: "1.5rem",
                      }}
                    >
                      <span>Active</span>
                    </span>
                  ) : (
                    <span
                      className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor"
                      style={{
                        background: "#fafafa",
                        color: "#a3a3a3",
                        fontSize: "0.75rem",
                        height: "1.5rem",
                      }}
                    >
                      <span>Completed</span>
                    </span>
                  )}
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-row gap-4">
                  <div className="d-flex flex-column gap-1">
                    <small className="text-muted">MAX SCORE</small>
                    <div className="d-flex flex-row align-items-baseline gap-2">
                      <div className="d-flex flex-row align-items-baseline gap-2">
                        <Target size={12} style={{ color: "#ccc" }} />
                        <span className="fw-semibold font-size-md">
                          {examDetails?.data?.max_score}
                        </span>
                      </div>
                      <small style={{ color: "#ccc" }}>Pts</small>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <small className="text-muted">WINDOW</small>
                    <span className="fw-semibold font-size-md">
                      {getDayWindow(
                        examDetails?.data?.start_date,
                        examDetails?.data?.end_date,
                      )}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-row align-items-center gap-2 fw-medium">
                    <Calendar size={16} style={{ color: "#ccc" }} />
                    <span>
                      {format(
                        parseISO(examDetails?.data?.start_date),
                        "MMM d, yyyy",
                      )}
                    </span>
                    <ArrowRight size={16} style={{ color: "#ccc" }} />
                    <span>
                      {format(
                        parseISO(examDetails?.data?.end_date),
                        "MMM d, yyyy",
                      )}
                    </span>
                  </div>
                  {examDetails?.data?.status == "upcoming" ? (
                    <span className="color-primary text-capitalize fw-medium">
                      starts in{" "}
                      {getTimeRemaining(examDetails?.data?.start_date)}
                    </span>
                  ) : examDetails?.data?.status == "active" ? (
                    <span className="text-fern-500 text-capitalize fw-medium">
                      Ends
                      {format(
                        parseISO(examDetails?.data?.end_date),
                        "MMM d, yyyy",
                      )}
                    </span>
                  ) : (
                    <span className="color-primary text-capitalize fw-medium">
                      Ended
                      {format(
                        parseISO(examDetails?.data?.end_date),
                        "MMM d, yyyy",
                      )}
                    </span>
                  )}
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />

                <div className="d-flex flex-row align-items-center gap-2">
                  <GraduationCap size={16} style={{ color: "#ccc" }} />
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">
                      {
                        examDetails?.data?.school_year?.specialty
                          ?.specialty_name
                      }
                    </span>
                    <div className="d-flex flex-row align-items-center gap-1 fw-medium">
                      <small>
                        {examDetails?.data?.school_year?.specialty?.level?.name}
                      </small>
                      <Dot size={12} />
                      <small>
                        {
                          examDetails?.data?.school_year?.specialty?.level
                            ?.level
                        }
                      </small>
                    </div>
                  </div>
                </div>
                <small className="text-muted">System Info</small>
                <div className="d-flex flex-column gap-2">
                  <span>Created At</span>
                  <span className="fw-medium">
                    {format(
                      parseISO(examDetails?.data?.created_at),
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-column gap-2">
                  <span>Updated At</span>

                  <span className="fw-medium">
                    {format(
                      parseISO(examDetails?.data?.updated_at),
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>
                <small className="text-muted">Additional Info</small>
                <div className="d-flex flex-column gap-2">
                  <span>Academic Year</span>
                  <span className="fw-medium">
                    {examDetails?.data?.school_year?.system_academic_year?.name}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-column gap-2">
                  <span>Grade Scale Status</span>
                  {examDetails?.data?.exam_grade_scale ? (
                    <span
                      className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-fern-100 text-fern-400"
                      style={{
                        fontSize: "0.75rem",
                        height: "1.5rem",
                        width: "11.5%",
                      }}
                    >
                      <span>Configured</span>
                    </span>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      <div
                        className="d-flex flex-row align-items-center gap-2 p-2 rounded-3"
                        style={{ background: "#FDF3E2", color: "#B87508" }}
                      >
                        <TriangleAlert size={16} />
                        <p className="m-0" style={{ width: "90%" }}>
                          <strong>No Grade Scale Linked:</strong> Please assign
                          a grade scale category to evaluate candidates for this
                          exam.A grade scale category is required to enable
                          student evaluation and score computation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.4}
                />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
                  <button
                    className="border-none bg-none"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default ResitExamDetails;
