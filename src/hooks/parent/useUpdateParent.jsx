import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParent } from "../../services/parent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useUpdateParent = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ parentId, updateData }) =>
      updateParent(parentId, updateData),
    onSuccess: (parentId) => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
      queryClient.removeQueries({ queryKey: ["parent", parentId] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Parent Updated Successfully"}
        />
      );
    },

  });
};
