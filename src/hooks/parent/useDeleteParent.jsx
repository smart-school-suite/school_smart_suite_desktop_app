import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParent } from "../../services/parent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteParent = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteParent,
    onSuccess: (parentId) => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
      queryClient.removeQueries({ queryKey: ["parent", parentId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Parent Deleted Successfully"}
        />
      );
    },
  });
};
