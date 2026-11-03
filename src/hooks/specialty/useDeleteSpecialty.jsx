import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecialty } from "../../services/specialty";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteSpecialty = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Specialty Successfully Deleted"}
        />
      );
    },
  });
};
