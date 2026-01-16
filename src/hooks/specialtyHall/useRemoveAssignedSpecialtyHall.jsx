import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAssignedHall } from "../../services/specialtyHall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
      queryClient.removeQueries(["assignableHalls", specialtyId]);
      queryClient.removeQueries(["assignedHalls", specialtyId]);
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
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
