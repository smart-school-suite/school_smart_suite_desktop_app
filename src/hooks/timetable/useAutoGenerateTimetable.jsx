import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoGenerateTimetable } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useAutoGenerateTimetable = () => {
     return useMutation({
         mutationFn: ({ payload, schoolSemesterId }) => autoGenerateTimetable({ payload, schoolSemesterId }),
         onSuccess:() => {
             toast.custom(
                 <ToastSuccess 
                    title={"Timetable Generated !"}
                    description={"Timetable Generated Successfully Please Verify All Slots Before Submitting"}
                 />
             )
         },
        onError:() =>{
             toast.custom(
                 <ToastDanger 
                   title={"Failed To Generate Timetable"}
                   description={"Failed To Generate Timetable It Could Be Because of this errors 1.) No Available Teachers, 2.) No Courses Available"}
                 />
             )
        }
     })
}