import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkRemoveAllAssignedHalls } from "../../services/specialtyHall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkRemoveAllAssignedHalls = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkRemoveAllAssignedHalls,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialty-hall-specialties"] });
      queryClient.invalidateQueries({ queryKey: ["assignableHalls"] });
      queryClient.invalidateQueries({ queryKey: ["assignedHalls"] });
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Removal Successful"}
          description={"Assigned halls removed from the selected specialties"}
        />
      );
    },
  });
};
