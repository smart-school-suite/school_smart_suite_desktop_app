import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElectionRole } from "../../services/electionRole";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
export const useCreateElectionRole = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createElectionRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["electionRoles"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Election Role Created"}
          description={"Election Role Created Successfully"}
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
