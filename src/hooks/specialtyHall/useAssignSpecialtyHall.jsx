import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { assignSpecialtyHall } from "../../services/specialtyHall";

export const useAssignSpecialtyHall = (specialtyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignSpecialtyHall,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Hall Assigned"}
          description={"Specialty Hall Assigned Successfully"}
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
