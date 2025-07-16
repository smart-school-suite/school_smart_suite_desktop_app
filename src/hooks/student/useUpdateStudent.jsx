import { useMutation,  useQueryClient } from '@tanstack/react-query';
import { updateStudent } from '../../services/Student';
import toast from 'react-hot-toast';
import ToastDanger from '../../components/Toast/ToastDanger';
import ToastSuccess from '../../components/Toast/ToastSuccess';
export const useUpdateStudent = (handleClose, studentId) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: ({ studentId, updateData }) => updateStudent(studentId, updateData),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['student', studentId] });

        if(handleClose){
          handleClose();
        }

        toast.custom(
          <ToastSuccess 
            title={"Update Successfull"}
            description={"Student Profile Updated Successfully"}
          />
        )
    },
     onError:() => {
        toast.custom(
          <ToastDanger 
            title={"Failed Update"}
            description={"Failed To Update Student Profile Please try Again"}
          />
        )
     }
  });
}