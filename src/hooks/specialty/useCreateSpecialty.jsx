import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialty } from "../../services/specialty";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useCreateSpecialty = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      toast.custom(
        <ToastSuccess
          title={"Specialty Created"}
          description={"Specialty Created Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
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
