import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateSchoolAdminAccount } from "../../services/schoolAdmin";

export const useActivateSchoolAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schoolAdminId) => activateSchoolAdminAccount(schoolAdminId),
    onSuccess: (schoolAdminId) => {
      queryClient.invalidateQueries({ queryKey: ["schoolAdmins"] });
      queryClient.invalidateQueries({
        queryKey: ["schoolAdmin", schoolAdminId],
      });
    },
  });
};
