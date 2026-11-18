import { Trash } from "lucide-react";
import { useBulkDeleteJointCourse } from "../../hooks/jointCourse/useBulkDeleteJointCourse";
import JointCourseBulkConfirm, { selectedJointCourses } from "./JointCourseBulkConfirm";

function BulkDeleteJointCourse({ handleClose, rowData, bulkData, resetAll }) {
  const courses = selectedJointCourses(rowData, bulkData);
  const { mutate, isPending } = useBulkDeleteJointCourse(handleClose, resetAll);
  const plural = courses.length === 1 ? "this joint course" : `these ${courses.length} joint courses`;

  return (
    <JointCourseBulkConfirm
      courses={courses}
      title="Delete Joint Courses"
      icon={Trash}
      tone="danger"
      description={`This permanently deletes ${plural} for every specialty that shares them. This cannot be undone.`}
      confirmLabel={courses.length === 1 ? "Yes, Delete" : "Yes, Delete All"}
      errorTitle="Failed To Delete Joint Courses"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
    />
  );
}
export default BulkDeleteJointCourse;
