import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { updateResitSetting } from "../../services/schoolBranchSetting";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateResitSetting = (handleClose, schoolBranchSettingId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateResitSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolBranchSettings"] });
      queryClient.invalidateQueries({
        queryKey: ["schoolBranchSetting", schoolBranchSettingId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Setting Updated Successfully"}
        />
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};
