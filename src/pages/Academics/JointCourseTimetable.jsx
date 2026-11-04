import { CalendarRange } from "lucide-react";
import JointCourseList from "../../components/JointCourseTimetable/JointCourseList";
import JointCourseWorkspace from "../../components/JointCourseTimetable/JointCourseWorkspace";

function JointCourseTimetable() {
  return (
    <main className="main-container gap-2 font-size-sm">
      <div className="d-flex flex-column gap-1 h-100">
        <div className="page-head page-head--bar">
          <div className="d-flex align-items-center gap-2">
            <div className="light-mode-active d-flex justify-content-center align-items-center">
              <CalendarRange size={16} strokeWidth={1.5} />
            </div>
            <span className="fw-semibold font-size-sm">Manage Joint Course Timetable</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-start flex-grow-1" style={{ minHeight: 0 }}>
          <JointCourseList />
          <JointCourseWorkspace />
        </div>
      </div>
    </main>
  );
}

export default JointCourseTimetable;
