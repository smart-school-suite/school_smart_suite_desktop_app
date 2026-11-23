import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeSchoolAdminAvatar } from "../../services/schoolAdmin";

export const useRemoveSchoolAdminAvatar = (onDone) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeSchoolAdminAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authSchoolAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["schoolAdmins"] });
      onDone?.();
      toast.custom(
        <ToastSuccess
          title="Profile photo removed"
          description="Your initials will show instead."
        />,
      );
    },
  });
};
