import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentBatch } from "../../services/studentBatch";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useUpdateBatch = (handleClose) => {
    const  queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ batchId, updateData }) => updateStudentBatch(batchId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["studentBatches"]})
            
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Batch Updated"}
                  description={"Student Batch Updated Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Failed To Update Student Batch"}
                />
            )
         }
    })
}