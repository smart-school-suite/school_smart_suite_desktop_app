import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeAssignedHall } from "../../services/specialtyHall";
export const useRemoveAssignedSpecialtyHall = (specialtyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAssignedHall,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Hall Removed"}
          description={"Specialty Hall Removed Successfully"}
        />
      );
      queryClient.invalidateQueries({
        queryKey: ["assignableHalls", specialtyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignedHalls", specialtyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["specialty-hall-specialties"],
      });
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
