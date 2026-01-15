import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useUpdateHall = (handleClose, hallId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ hallId, updateData }) => updateHall(hallId, updateData),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Hall Updated Successfully"}
        />
      );
      if(handleClose){
         handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
      queryClient.removeQueries({ queryKey:["hall", hallId]});
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
