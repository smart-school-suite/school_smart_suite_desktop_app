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
      queryClient.invalidateQueries({ queryKey: ["schoolSemesterCreationOptions"] });
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
    onError: (error) => {
      const details = error?.response?.data?.errors;
      toast.custom(
        <ToastDanger
          title={details?.title ?? "Update failed"}
          description={details?.description ?? "We couldn't update this setting. Please try again."}
        />,
      );
    },
  });
};
