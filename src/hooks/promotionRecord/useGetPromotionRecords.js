import { useQuery } from "@tanstack/react-query";
import { getPromotionRecords } from "../../services/promotionRecord";

export const useGetPromotionRecords = () => { 
     return useQuery({
         queryKey:["promotion-records"],
         queryFn: () => getPromotionRecords()
     })
}