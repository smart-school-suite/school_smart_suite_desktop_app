import { useQuery } from "@tanstack/react-query";
import { getStudentActivationCodeStatus } from "../../services/activationCode";

export const useGetStudentActivationCodeStatus = () => {
     return useQuery({
         queryKey:["studentActivationCodeStatus"],
         queryFn:() => getStudentActivationCodeStatus()
     })
}