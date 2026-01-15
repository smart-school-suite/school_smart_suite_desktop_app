import { useQuery } from "@tanstack/react-query";
import { getHallDetail } from "../../services/hall";

export const useGetHallDetail = (hallId) => {
     return useQuery({
         queryKey:["hall", hallId],
         queryFn:() => getHallDetail(hallId)
     })
}