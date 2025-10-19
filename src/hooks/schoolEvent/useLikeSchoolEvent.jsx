import { likeSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
export const useLikeSchoolEvent = () => {
      const queryClient = useQueryClient();
      return useMutation({
          mutationFn:(schoolEventId) => likeSchoolEvent(schoolEventId),
          onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["schoolEvents"]})
          },
          onError:(error) => {
             toast.custom(
                 <ToastDanger 
                   title={error.response.data.errors.title}
                   description={error.response.data.errors.description}
                 />
             )
          }
      })
}