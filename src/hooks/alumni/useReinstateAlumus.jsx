import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { reinstateAlumnus } from "../../services/alumni";

export const useReinsateAlumnus = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reinstateAlumnus,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Approval Successfull"}
          description={"Alumnus Now included into the next level"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["graduation-records"] });
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
