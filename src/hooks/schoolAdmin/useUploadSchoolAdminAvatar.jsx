import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { uploadSchoolAdminAvatar } from "../../services/schoolAdmin";

export const useUploadSchoolAdminAvatar = (onDone) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ picture, onUploadProgress }) =>
      uploadSchoolAdminAvatar(picture, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authSchoolAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["schoolAdmins"] });
      onDone?.();
      toast.custom(
        <ToastSuccess
          title="Profile photo updated"
          description="Your new profile photo is now visible."
        />,
      );
    },
  });
};
