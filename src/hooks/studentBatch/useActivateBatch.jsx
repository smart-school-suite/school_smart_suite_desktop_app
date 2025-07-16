import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateStudentBatch } from "../../services/studentBatch";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateBatch = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:(batchId) => activateStudentBatch(batchId),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"]})
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Activated"}
                  description={"Student Batch Activated Successfully"}
                />
            )
        },
        onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Activation Failed"}
                  description={"Student Batch Activation Failed Due to Some error please try again later"}
                />
            )
        }
    })
}