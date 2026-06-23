import { getLevelSpecialties } from "../../services/specialty";
import { useQuery } from "@tanstack/react-query";

export const useGetLevelSpecialties = () => {
     return useQuery({
         queryKey:["level-specialties"],
         queryFn:() => getLevelSpecialties(),
     })
}