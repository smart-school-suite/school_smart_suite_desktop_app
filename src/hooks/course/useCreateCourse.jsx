import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateCourse = (handleClose, specialtyId, semesterId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["activeCourses"] });
      queryClient.invalidateQueries({
        queryKey: ["courseSpecialtySemester", specialtyId, semesterId],
      });
      toast.custom(
        <ToastSuccess
          title={"Course Created"}
          description={"Course Created Successfully"}
        />
      );

      if (handleClose) {
        handleClose();
      }
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
