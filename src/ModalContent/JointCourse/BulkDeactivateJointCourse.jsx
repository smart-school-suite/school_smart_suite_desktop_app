import { CircleOff } from "lucide-react";
import { useBulkDeactivateJointCourse } from "../../hooks/jointCourse/useBulkDeactivateJointCourse";
import JointCourseBulkConfirm, { selectedJointCourses } from "./JointCourseBulkConfirm";

function BulkDeactivateJointCourse({ handleClose, rowData, bulkData, resetAll }) {
  const courses = selectedJointCourses(rowData, bulkData);
  const { mutate, isPending } = useBulkDeactivateJointCourse(handleClose, resetAll);
  const alreadyInactive = courses.filter((course) => course.status !== "active").length;

  return (
    <JointCourseBulkConfirm
      courses={courses}
      title="Deactivate Joint Courses"
      icon={CircleOff}
      description="Inactive joint courses can no longer be scheduled for any specialty that shares them. You can activate them again at any time."
      note={alreadyInactive > 0 ? `${alreadyInactive} of these ${alreadyInactive === 1 ? "is" : "are"} already inactive and will stay inactive.` : null}
      confirmLabel={courses.length === 1 ? "Yes, Deactivate" : "Yes, Deactivate All"}
      errorTitle="Failed To Deactivate Joint Courses"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
    />
  );
}
export default BulkDeactivateJointCourse;
