import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { requestReview } from "../../services/graduationRecord";
export const useRequestReview = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => requestReview(payload),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Approval Successful"}
          description={"Student Graduation Approved For Eligibility"}
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