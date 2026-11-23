import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeSchoolLogo } from "../../services/school";

export const useRemoveSchoolLogo = (onDone) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeSchoolLogo(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school"] });
      onDone?.();
      toast.custom(
        <ToastSuccess title="School logo removed" description="The school's initials will show instead." />,
      );
    },
  });
};
