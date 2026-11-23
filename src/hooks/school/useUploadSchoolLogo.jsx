import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { uploadSchoolLogo } from "../../services/school";

export const useUploadSchoolLogo = (onDone) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ picture, onUploadProgress }) => uploadSchoolLogo(picture, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school"] });
      onDone?.();
      toast.custom(
        <ToastSuccess title="School logo updated" description="The new logo now shows across the app." />,
      );
    },
  });
};
