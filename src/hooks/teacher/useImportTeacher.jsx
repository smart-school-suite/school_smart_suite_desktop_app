import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useImportTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => importTeacher(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.custom(
        <ToastSuccess 
          title={"Import Initiated"}
          description={"Teacher Importation Initiated Successfully"}
        />
      )
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
