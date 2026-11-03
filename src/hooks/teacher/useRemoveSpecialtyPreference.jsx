import toast from "react-hot-toast";
import { removeSpecialtyPreferences } from "../../services/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useRemoveSpecialtyPreference = (teacherId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSpecialtyPreferences,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["availableTeacherSpecialtyPreference", teacherId],
      });
      queryClient.removeQueries({
        queryKey: ["teacherSpecialtyPreference", teacherId],
      });
      toast.custom(
        <ToastSuccess
          title={"Preferences Removed"}
          description={"Teacher Specialty Preferences Successfully removed"}
        />
      );
    },
  });
};
