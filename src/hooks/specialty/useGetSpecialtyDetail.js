import { useQuery } from "@tanstack/react-query";
import { getSpecialtyDetails } from "../../services/specialty";

export const useGetSpecialtyDetails = (specialtyId) => {
    return useQuery({
         queryKey:["specialty", specialtyId],
         queryFn:getSpecialtyDetails(specialtyId)
    })
}