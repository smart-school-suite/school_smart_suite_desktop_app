import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { approveEligibility } from "../../services/graduationRecord";
export const useApproveInEligility = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => approveEligibility(payload),
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
  });
};