import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolSemester } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateSchoolSemester = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createSchoolSemester,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolSemesters"]})
            queryClient.invalidateQueries({queryKey:["examCandidates"]})
            queryClient.invalidateQueries({queryKey:["exams"]});
            if(handleClose){
                handleClose();
            }
            toast.custom(
                     <ToastSuccess 
                       title={"Semester Created"}
                       description={"School Semester Created Successfully"}
                     />
                )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Semester Creation Failed"}
                   description={"Failed to create School Semester"}
                 />
             )
         }
     })
}