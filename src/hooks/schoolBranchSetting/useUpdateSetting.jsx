import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import { updateSetting } from "../../services/schoolBranchSetting";
export const useUpdateSetting = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }) => updateSetting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      // toast.custom(
      //   <ToastSuccess
      //     title={"Update Successfull"}
      //     description={`Setting Changed Successfully updated successfully`}
      //   />,
      // );
      if(handleClose){
         handleClose()
      }
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Updated Failed"}
          description={`Failed to update  due to an error please try again !!`}
        />,
      );
    },
  });
};
