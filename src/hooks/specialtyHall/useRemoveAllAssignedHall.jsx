import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeAllAssignedHalls } from "../../services/specialtyHall";
export const useRemoveAllAssignedHalls = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAllAssignedHalls,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Hall Removed"}
          description={"Specialty Hall Removed Successfully"}
        />,
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
      queryClient.invalidateQueries({ queryKey: ["halls"] });
    },
  });
};
