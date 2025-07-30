import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateSchoolAdminAccount } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateSchoolAdmin = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schoolAdminId) => activateSchoolAdminAccount(schoolAdminId),
    onSuccess: (schoolAdminId) => {
      queryClient.invalidateQueries({ queryKey: ["schoolAdmins"] });
      queryClient.invalidateQueries({
        queryKey: ["schoolAdmin", schoolAdminId],
      });

      if(handleClose) {
         handleClose();
      }

      toast.custom(
        <ToastSuccess 
          title={"Account Activated"}
          description={"School Admin Activated Successfully"}
        />
      )
    },
    onError:() => {
       toast.custom(
        <ToastDanger 
          title={"Account Activation Failed"}
          description={"Failed to Activate Account Due to an error please try again"}
        />
       )
    }
  });
};
