import { useQuery } from "@tanstack/react-query";
import { getAllResits } from "../../services/studentResit";

export const useGetStudentResits = () => {
    return useQuery({
         queryKey:["studentResits"],
         queryFn:getAllResits
    })
}