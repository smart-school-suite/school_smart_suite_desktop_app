import { useQuery } from "@tanstack/react-query";
import { getResitDetails } from "../../services/studentResit";
export const useGetResitDetails = (resitId) => {
    return useQuery({ 
        queryKey:["studentResit", resitId],
        queryFn:() => getResitDetails(resitId)
    })
}