import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacherSpecialtyPreference } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useAddTeacherSpecialtyPreference = (teacherId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTeacherSpecialtyPreference,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["availableTeacherSpecialtyPreference", teacherId],
      });
      queryClient.removeQueries({
        queryKey: ["teacherSpecialtyPreference", teacherId],
      });
      toast.custom(
        <ToastSuccess
          title={"Preference Added"}
          description={"Teacher Specialty Perference Added Successfully"}
        />
      );
    },
  });
};
