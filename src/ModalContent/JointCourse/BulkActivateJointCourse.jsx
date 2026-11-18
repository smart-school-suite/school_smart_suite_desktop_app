import { CircleCheck } from "lucide-react";
import { useBulkActivateJointCourse } from "../../hooks/jointCourse/useBulkActivateJointCourse";
import JointCourseBulkConfirm, { selectedJointCourses } from "./JointCourseBulkConfirm";

function BulkActivateJointCourse({ handleClose, rowData, bulkData, resetAll }) {
  const courses = selectedJointCourses(rowData, bulkData);
  const { mutate, isPending } = useBulkActivateJointCourse(handleClose, resetAll);
  const alreadyActive = courses.filter((course) => course.status === "active").length;

  return (
    <JointCourseBulkConfirm
      courses={courses}
      title="Activate Joint Courses"
      icon={CircleCheck}
      description="Active joint courses can be scheduled on timetables and used in exams for every specialty that shares them."
      note={alreadyActive > 0 ? `${alreadyActive} of these ${alreadyActive === 1 ? "is" : "are"} already active and will stay active.` : null}
      confirmLabel={courses.length === 1 ? "Yes, Activate" : "Yes, Activate All"}
      errorTitle="Failed To Activate Joint Courses"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
    />
  );
}
export default BulkActivateJointCourse;
