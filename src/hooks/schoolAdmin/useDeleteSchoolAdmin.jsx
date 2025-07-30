import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteSchoolAdmin = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteSchoolAdmin,
         onSuccess: (data, deletedSchoolAdminId) => {
        queryClient.invalidateQueries({ queryKey: ['schoolAdmins'] })
        queryClient.removeQueries({ queryKey: ['schoolAdmin', deletedSchoolAdminId] })

        if(handleClose){
          handleClose();
        }

        toast.custom(
          <ToastSuccess 
             title={"Delete Successfull"}
             description={"School Admin Account Deleted Successfully"}
          />
        )
     },
     onError:() => {
          toast.custom(
               <ToastDanger 
                 title={"Delete Failed"}
                 description={"Failed to delete School Admin Account Due to an error please try again"}
               />
          )
     }
     })
}