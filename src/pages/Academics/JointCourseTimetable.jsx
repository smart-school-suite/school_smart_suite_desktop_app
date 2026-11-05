import JointCourseList from "../../components/JointCourseTimetable/JointCourseList";
import JointCourseWorkspace from "../../components/JointCourseTimetable/JointCourseWorkspace";

function JointCourseTimetable() {
  return (
    <main className="main-container gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-start h-100" style={{ minHeight: 0 }}>
        <JointCourseList />
        <JointCourseWorkspace />
      </div>
    </main>
  );
}

export default JointCourseTimetable;
