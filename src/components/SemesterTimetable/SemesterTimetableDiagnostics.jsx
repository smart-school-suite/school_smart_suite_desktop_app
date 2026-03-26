import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useGetSemesterTimetableDiagnostics } from "../../hooks/semesterTimetable/useGetTimetableDiagnostics";
import { Icon } from "@iconify/react";

function DiagnosticWrapper() {
  return (
    <>
      <div
        className="bg-white rounded-4 px-2 py-3 d-flex flex-column gap-4 h-100"
        style={{ width: "20%", height: "100%" }}
      >
        <div className="d-flex flex-row align-items-center gap-2">
          <span style={{ lineHeight: 0 }}>
            <Icon
              icon="streamline-ultimate:diagnostic-desktop"
              width="20"
              height="20"
            />
          </span>
          <span className="font-size-sm fw-semibold">Diagnostics</span>
        </div>
        <DiagnosticComponent />
      </div>
    </>
  );
}
export default DiagnosticWrapper;
function DiagnosticSkeleton() {
  return (
    <>
      <div className="diagnostic-container d-flex flex-column gap-3">
        {[...Array(6)].map((_, index) => (
          <Fragment key={index}>
            <div className="d-flex flex-column gap-3">
              <div>
                <RectangleSkeleton speed={1} width="100%" height="0.5rem" />
              </div>
              <div className="d-flex flex-column gap-2">
                <RectangleSkeleton speed={1} width="100%" height="0.5rem" />
                <RectangleSkeleton speed={1} width="100%" height="0.5rem" />
                <RectangleSkeleton speed={1} width="100%" height="0.5rem" />
                <RectangleSkeleton speed={1} width="100%" height="0.5rem" />
                <RectangleSkeleton speed={1} width="50%" height="0.5rem" />
              </div>
              <div>
                <RectangleSkeleton speed={1} width="100%" height="2rem" />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="mt-auto">
        <div>
          <RectangleSkeleton speed={1} width="100%" height="2rem" />
        </div>
      </div>
    </>
  );
}
function DiagnosticComponent() {
  const timetableVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const { data: diagnostics, isLoading: isDiagnosticLoading } =
    useGetSemesterTimetableDiagnostics(timetableVersion?.id);
  return (
    <>
      {isDiagnosticLoading ? (
        <DiagnosticSkeleton />
      ) : diagnostics?.data ? (
        <>
          <div className="diagnostic-container d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <span className="font-size-sm gainsboro-color"></span>
                <div className="d-flex flex-column align-items-start w-100 gap-2">
                  <span className="font-size-sm fw-semibold">
                    Requested Joint Course Period Violation
                  </span>
                  <span className="font-size-sm">
                    The Schedular was unable to schedule Aperiam Et Blanditiis
                    Voluptatibus Qui at 09:00 to 11:00 on friday as requested.
                    The reasons why this happened are listed below
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-start w-100">
                <span className="font-size-sm gainsboro-color">Blockers</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <span className="font-size-sm fw-semibold">
                      Course Daily Frequency Violation
                    </span>
                    <span className="font-size-sm">
                      Max Daily Course Frequency Violation: The session on
                      friday at 09:00 to 11:00 for course unknown course exceeds
                      the maximum daily frequency of 2 sessions.
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-start w-100 gap-1">
                <span className="font-size-sm gainsboro-color">
                  Suggestions
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-2">
                    <span className="font-size-sm fw-semibold">
                      Course Daily Frequency Violation
                    </span>
                    <span className="font-size-sm">
                      Max Daily Course Frequency Violation: The session on
                      friday at 09:00 to 11:00 for course unknown course exceeds
                      the maximum daily frequency of 2 sessions.
                    </span>
                  </div>
                  <button className="font-size-sm p-2 rounded-pill border-none">
                    <span>Apply Fix</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div>
              <button
                className="border-none
               p-2 text-white primary-background
                font-size-sm outline-none px-3 w-100 rounded-pill
                d-flex flex-row align-items-center gap-2 justify-content-center
                "
              >
                <div>
                  Fix All And Regenerate
                  <span style={{ lineHeight: 0 }}>
                    <Icon icon="oui:generate" width="16" height="16" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </>
      ) : (
        <span className="font-size-sm">No Diagnostics Found</span>
      )}
    </>
  );
}
