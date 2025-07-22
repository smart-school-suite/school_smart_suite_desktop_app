import { useQuery } from "@tanstack/react-query";
import { getSchoolEvents } from "../../services/schoolEvent";

export const useGetSchoolEvents = () => {
    return useQuery({
         queryKey:["schoolEvents"],
         queryFn:() => getSchoolEvents()
    })
}