import { bulkDeactivateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeactivateSpecialty = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivation Successfull"}
          description={"Specialties Deactivated Successfully"}
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
