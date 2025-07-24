import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetableByAvailability } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateTimetableByPreference = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: createTimetableByAvailability,
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey:["schoolSemesters"]});
             queryClient.removeQueries({ queryKey:["schoolSemester", schoolSemesterId]});

             if(handleClose) {
                 handleClose();
             }

             toast.custom(
                    <ToastSuccess
                        title={"Timetable Created Successfully"}
                        description={"Your timetable has been created successfully."}
                    />
             )
         },
         onError: () => {
             toast.custom(
                 <ToastWarning
                     title={"Oops Something Went Wrong"}
                     description={"Couldn't create timetable, please try again later."}
                 />
             );
         }
     })
}