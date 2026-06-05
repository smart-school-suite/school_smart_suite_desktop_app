import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useGetSemesterTimetableDiagnostics } from "../../hooks/semesterTimetable/useGetTimetableDiagnostics";
import { Icon } from "@iconify/react";
import { useGetParsedDiagnostics } from "../../hooks/semesterTimetable/useGetParsedDiagnostics";

function DiagnosticWrapper() {
  return (
    <>
      <div
        className="rounded-4 px-2 py-3 d-flex flex-column gap-4 h-100"
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
    useGetParsedDiagnostics(timetableVersion?.id);
  return (
    <>
      {isDiagnosticLoading ? (
        <DiagnosticSkeleton />
      ) : diagnostics?.data ? (
        <>
          <div className="diagnostic-container d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column font-size-sm gap-2 card p-2 rounded-3 border-none shadow-sm">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Course Requested Slot</span>
                  <button
                    style={{
                      fontSize: "0.7rem",
                      background: "#fdf3c8",
                      color: "#d67909",
                    }}
                    className="border-none rounded-pill px-2"
                  >
                    <span>soft</span>
                  </button>
                </div>
                <div className="d-flex flex-column">
                  <span>Engineering Maths</span>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>12:00 AM</span>
                    <span style={{ lineHeight: 0 }}>
                      <Icon icon="pajamas:dash" width="12" height="12" />
                    </span>
                    <span>13:00 PM</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-1">
                  <span style={{ lineHeight: 0 }}>
                    <Icon icon="ic:baseline-block" width="12" height="12" />
                  </span>
                  <span>12 Blockers</span>
                </div>
                <div>
                  <button className="w-100 rounded-pill p-2 font-size-sm border-none">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column font-size-sm gap-2 card p-2 rounded-3 border-none shadow-sm">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Required Joint Course</span>
                  <button
                    style={{
                      fontSize: "0.7rem",
                      background: "#fdf3c8",
                      color: "#d67909",
                    }}
                    className="border-none rounded-pill px-2"
                  >
                    <span>Hard</span>
                  </button>
                </div>
                <div className="d-flex flex-column">
                  <span>Engineering Maths</span>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>12:00 AM</span>
                    <span style={{ lineHeight: 0 }}>
                      <Icon icon="pajamas:dash" width="12" height="12" />
                    </span>
                    <span>13:00 PM</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-1">
                  <span style={{ lineHeight: 0 }}>
                    <Icon icon="ic:baseline-block" width="12" height="12" />
                  </span>
                  <span>12 Blockers</span>
                </div>
                <div>
                  <button className="w-100 rounded-pill p-2 font-size-sm border-none">
                    Learn More
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
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center gap-2 text-center">
            <img
              src="./sss-maskot/td-maskot.png"
              alt="sss-timetable-maskot"
              style={{
                height: "200px",
                width: "250px",
                objectFit: "contain",
              }}
            />
            <div>
              <span className="fw-semibold font-size-sm">
                No Diagnostics Found
              </span>
              <p className="text-muted font-size-sm mb-0">
                Congratulations all no errors where recorded when generating timetable
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
