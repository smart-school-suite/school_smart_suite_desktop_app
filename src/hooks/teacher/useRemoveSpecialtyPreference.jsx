import toast from "react-hot-toast";
import { removeSpecialtyPreferences } from "../../services/teacher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useRemoveSpecialtyPreference = (teacherId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:removeSpecialtyPreferences,
         onSuccess:() => {
            queryClient.removeQueries({ queryKey:["availableTeacherSpecialtyPreference", teacherId] })
            queryClient.removeQueries({ queryKey:["teacherSpecialtyPreference", teacherId]})
            toast.custom(
                <ToastSuccess 
                  title={"Preferences Removed"}
                  description={"Teacher Specialty Preferences Successfully removed"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Failed Delete"}
                  description={"Failed To Delete Specialty Preference"}
                />
            )
         }
    })
} 