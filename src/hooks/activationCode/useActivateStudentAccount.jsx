import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateStudentAccount } from "../../services/activationCode";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useActivateStudentAccount = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateStudentAccount,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Account Activated"}
          description={"Student Account Activated Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["activationCodeUsage"] });
      queryClient.invalidateQueries({ queryKey: ["activationCodes"] });
      queryClient.invalidateQueries({
        queryKey: ["studentActivationCodeStatus"],
      });
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
