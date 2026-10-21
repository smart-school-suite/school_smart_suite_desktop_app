import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { approveAlumnus } from "../../services/graduationRecord";
export const useApproveAlumnus = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => approveAlumnus(payload),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Approval Successful"}
          description={"Student Will now be added as one of the school alumni"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["graduation-records"] });
      queryClient.invalidateQueries({ queryKey: ["alumni"] });
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
