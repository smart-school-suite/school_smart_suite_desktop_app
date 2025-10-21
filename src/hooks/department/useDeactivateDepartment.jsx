import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateDepartment = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (departmentId) => deactivateDepartment(departmentId),
    onSuccess: (departmentId) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.removeQueries({ queryKey: ["department", departmentId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivated"}
          description={"Department Deactivated Successfully"}
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
