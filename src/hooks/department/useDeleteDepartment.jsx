import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteDepartment = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (departmentId) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.removeQueries({ queryKey: ["department", departmentId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull ✅"}
          description={"The department has been deleted successfully "}
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
