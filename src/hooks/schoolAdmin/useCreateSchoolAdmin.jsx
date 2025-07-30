import { createSchoolAdmin } from "../../services/schoolAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateSchoolAdmin = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchoolAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolAdmins"] });
      toast.custom(
        <ToastSuccess
          title={"Creation Successful ✅"}
          description={"School Admin Created Successfully."}
        />
      );

      if (handleClose) {
        handleClose();
      }
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Failed To Create Admin"}
          description={"Failed to Create School Admin Due to An Error"}
        />
      );
    },
  });
};
