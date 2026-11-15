import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { updateSpecialty } from "../../services/specialty";
export const useUpdateSpecialty = (handleClose, specialtyId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ specialtyId, updateData }) =>
      updateSpecialty(specialtyId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      queryClient.invalidateQueries({ queryKey: ["specialty", specialtyId] });
      if (handleClose) {
        toast.custom(
          <ToastSuccess
            title={"Update Successfull"}
            description={"Specialty Updated Successfully"}
          />
        );
      }
    },
  });
};
