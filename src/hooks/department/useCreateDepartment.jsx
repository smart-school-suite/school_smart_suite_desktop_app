import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateDepartment = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });

      toast.custom(
        <ToastSuccess
          title={"Creation Successful ✅"}
          description={"The department has been created successfully."}
        />
      );

      if (handleClose) {
        handleClose();
      }
    },

    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={"Something went wrong ❌"}
          description={
            "The department creation failed due to an error. Please try again later."
          }
        />
      );
      console.error("Department creation error:", error);
    },
  });
};
