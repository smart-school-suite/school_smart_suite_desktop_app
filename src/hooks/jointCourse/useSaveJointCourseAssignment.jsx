import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import {
  assignTeacherCourse,
  changeTeacherCourse,
} from "../../services/teacherCourse";
import { JOINT_COURSE_TERM_KEY } from "../jointCourseTimetable/useGetJointCourseTerm";
import { JOINT_COURSE_ASSIGNMENT_KEY } from "./useGetJointCourseAssignment";

/**
 * Assigns a teacher to a joint course, or replaces the current one, through
 * the existing teacher-course endpoints. Both run in a transaction on the
 * server, so a failed change leaves the current teacher in place.
 */
export const useSaveJointCourseAssignment = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, replacingTeacherId }) =>
      replacingTeacherId
        ? changeTeacherCourse({
            course_id: courseId,
            new_teacher_id: teacherId,
            old_teacher_id: replacingTeacherId,
          })
        : assignTeacherCourse({
            teacher_id: teacherId,
            courseIds: [{ course_id: courseId }],
          }),
    onSuccess: (_, { replacingTeacherId, teacherName }) => {
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_ASSIGNMENT_KEY, courseId] });
      // The joint course timetable checks times against the assigned lecturer.
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_TERM_KEY] });
      queryClient.invalidateQueries({ queryKey: ["teachersBySpecialty"] });
      toast.custom(
        <ToastSuccess
          title={replacingTeacherId ? "Teacher Changed" : "Teacher Assigned"}
          description={`${teacherName ?? "The teacher"} now teaches this joint course.`}
        />,
      );
    },
  });
};
