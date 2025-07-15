import { useMutation, useQueryClient } from "@tanstack/react-query";
import { givePermissionToSchoolAdmin } from "../../services/permission";

export const useGivePermissionSchoolAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Accept an object with both ID and permissions
    mutationFn: ({ schoolAdminId, permissions }) =>
      givePermissionToSchoolAdmin(schoolAdminId, {permissions:permissions}),

    onSuccess: (_, { schoolAdminId }) => {
      queryClient.removeQueries({ queryKey: ["assignablePermissions", schoolAdminId] });
      queryClient.removeQueries({ queryKey: ["schoolAdminPermission", schoolAdminId] });
    },
  });
};
