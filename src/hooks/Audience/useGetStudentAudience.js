import { getStudentAudience } from "../../services/audience";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentAudience = () => {
     return useQuery({
         queryKey:["student-audience"],
         queryFn: () => getStudentAudience()
     })
}