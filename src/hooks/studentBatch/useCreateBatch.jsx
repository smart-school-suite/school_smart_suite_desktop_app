import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentBatch } from "../../services/studentBatch";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useCreateStudentBatch = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Batch Created"}
                   description={"Student Batch Created Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Batch Creation Failed"}
                  description={"Failed to Create Student Batch"}
                 />
            )
         }
    })
}