import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";

export const useBulkDeactivateDepartment = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Department Deactived"}
          description={
            "Department Deactivated Successfully, The Specialties listed Under this department will be also affected"
          }
        />
      );
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
