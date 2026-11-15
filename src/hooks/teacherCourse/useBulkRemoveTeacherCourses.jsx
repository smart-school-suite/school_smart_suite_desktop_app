import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkRemoveAssignedTeacherCourses } from "../../services/teacherCourse";

// payload: { assignments: [{ teacher_id, course_id }, ...] }
export const useBulkRemoveTeacherCourses = (specialtyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkRemoveAssignedTeacherCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-specialty", specialtyId] });
      queryClient.invalidateQueries({ queryKey: ["teachersBySpecialty", specialtyId] });
      toast.custom(
        <ToastSuccess
          title={"Removal Successful"}
          description={"Teachers unassigned from the selected courses"}
        />,
      );
    },
  });
};
