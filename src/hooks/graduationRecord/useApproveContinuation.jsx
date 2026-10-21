import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { approveContinuation } from "../../services/graduationRecord";
export const useApproveContinuation = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => approveContinuation(payload),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Approval Successfull"}
          description={"Student Will now be marked for continuation"}
        />
      );
      if(handleClose){
         handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["graduation-records"] });
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