import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkRemoveTeacherSpecialtyPreference } from "../../services/teacher";
export const useBulkRemoveTeacherSpecialtyPreference = (handleClose, resetAll) => {
     return useMutation({
         mutationFn:bulkRemoveTeacherSpecialtyPreference,
         onSuccess:() => {
              if(handleClose){
                 handleClose();
              }
              if(resetAll){
                resetAll();
              }

              toast.custom(
                 <ToastSuccess 
                    title={"Preference Removed"}
                    description={"Teacher Specialty Preferences Removed Successfully"}
                 />
              )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger
                   title={"Preference Removal Failed"}
                   description={"Failed to Remove teacher specialty Preference Due to an error, please check internet connection and try again"}
                 />
              )
         }
     })
}