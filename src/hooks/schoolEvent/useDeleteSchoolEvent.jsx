import { deleteSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteSchoolEvent = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchoolEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolEvents"] });
      queryClient.invalidateQueries({ queryKey: ["schoolEventSummary"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"School Event Deleted Successfully"}
        />,
      );
    },
  });
};
