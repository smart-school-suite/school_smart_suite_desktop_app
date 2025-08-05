import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitResitScores } from "../../services/resitEvaluation";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { useDispatch } from "react-redux";
import { resetResitScoreState } from "../../Slices/Asynslices/ResitScoreSlice";
export const useCreateResitScore = (handleClose) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    return useMutation({
         mutationFn:({candidateId, updateData}) =>  submitResitScores(candidateId, updateData),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["resitCandidates"]})
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess
                   title={"Scores Submitted"}
                   description={"Resit Scores Submited Successfully"}
                />
             )
            dispatch(resetResitScoreState());
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Failed Scores Submmit"}
                  description={"Failed To Submit Student Resit Scores Please Try Again"}
                />
             )
         }

         
    })
}