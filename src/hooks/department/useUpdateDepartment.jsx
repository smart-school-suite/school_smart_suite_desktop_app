import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateDepartment = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ departmentId, updateData }) =>
      updateDepartment(departmentId, updateData),
    onSuccess: (departmentId) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department", departmentId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Department Updated"}
          description={"Department Updated Successfully"}
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
