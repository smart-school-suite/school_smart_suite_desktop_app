import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAllAssignedHalls } from "../../services/specialtyHall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useRemoveAllAssignedHalls = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAllAssignedHalls,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Hall Removed"}
          description={"Specialty Hall Removed Successfully"}
        />
      );

      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      queryClient.invalidateQueries({ queryKey: ["halls"] });
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
