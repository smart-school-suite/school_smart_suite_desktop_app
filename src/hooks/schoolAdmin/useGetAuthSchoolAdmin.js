import { getAuthSchoolAdmin } from "../../services/schoolAdmin";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthSchoolAdmin = () => {
     return useQuery({
         queryKey:["authSchoolAdmin", getAuthSchoolAdmin],
         queryFn:() => getAuthSchoolAdmin()
     })
}