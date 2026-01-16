import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
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
