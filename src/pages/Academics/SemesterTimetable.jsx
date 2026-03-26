import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import ConstraintVersionWrapper from "../../components/SemesterTimetable/SemesterTimetableVersion";
import TimetableGridWrapper from "../../components/SemesterTimetable/SemesterTimetableGrid";
import DiagnosticWrapper from "../../components/SemesterTimetable/SemesterTimetableDiagnostics";
function SemesterTimetable() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height: "5%" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <Icon
                icon="ant-design:schedule-outlined"
                width="24"
                height="24"
              />
            </div>
            <span className="my-0 fw-semibold">Manage Semester Timetable</span>
          </div>
        </div>
        <div
          className="d-flex flex-row align-items-start"
          style={{ height: "95%" }}
        >
          <ConstraintVersionWrapper />
          <TimetableGridWrapper />
          <DiagnosticWrapper />
        </div>
      </main>
    </>
  );
}
export default SemesterTimetable;

