import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolEvent } from "../../services/schoolEvent";

export const useCreateSchoolEvent = () =>  {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createSchoolEvent,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolEvents"] })
        }
    })
}