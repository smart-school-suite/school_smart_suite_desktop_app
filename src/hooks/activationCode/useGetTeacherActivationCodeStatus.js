import { useQuery } from "@tanstack/react-query";
import { getTeacherActivationCodeStatus } from "../../services/activationCode";

export const useGetTeacherActivationCodeStatus = () => {
     return useQuery({
         queryKey:["teacherActivationCodeStatus"],
         queryFn:() => getTeacherActivationCodeStatus()
     })
}