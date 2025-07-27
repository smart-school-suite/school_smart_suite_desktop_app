import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitTimetable } from "../../services/resitExamTimetable";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteResitTimetable = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(resitExamId) => deleteResitTimetable(resitExamId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
            
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"Timetable deleted Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Timetable Delete Failed Due to an error please try again"}
                />
             )
         }
    })
}