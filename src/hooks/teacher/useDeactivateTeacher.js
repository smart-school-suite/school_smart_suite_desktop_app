import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateTeacher } from "../../services/teacher";

export const useDeactivateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId) => deactivateTeacher(teacherId),
    onSuccess: (deactivatedTeacherId) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.removeQueries({
        queryKey: ["teacher", deactivatedTeacherId],
      });
    },
  });
};
