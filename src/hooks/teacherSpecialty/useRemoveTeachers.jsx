import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { removeTeachers } from "../../services/teacherSpecialty";
export const useRemoveTeachers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTeachers,
    onSuccess: () => {
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Teachers Assigned"}
          description={
            "Teacher Has Been Successfully Assigned to this specialty"
          }
        />,
      );
      //   queryClient.invalidateQueries({
      //     queryKey: ["course-specialty", specialtyId],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: ["teachersBySpecialty", specialtyId],
      //   });
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        />,
      );
    },
  });
};
