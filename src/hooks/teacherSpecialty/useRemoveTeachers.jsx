import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeTeachers } from "../../services/teacherSpecialty";

// Removes one or more teachers from a specialty.
// payload: { specialty_id, teacher_ids: [id, ...] }
export const useRemoveTeachers = (specialtyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTeachers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachersBySpecialty", specialtyId] });
      queryClient.invalidateQueries({ queryKey: ["course-specialty", specialtyId] });
      toast.custom(
        <ToastSuccess
          title={"Removal Successful"}
          description={"Teachers removed from this specialty successfully"}
        />,
      );
    },
  });
};
