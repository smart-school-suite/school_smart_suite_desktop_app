import { useQuery } from "@tanstack/react-query";
import { getSpecialties } from "../../services/specialty";

export const useGetSpecialties = () => {
    return useQuery({
        queryKey:["specialties"],
        queryFn:() => getSpecialties(),
    })
}