import { useQuery } from "@tanstack/react-query";
import { getAllResits } from "../../services/studentResit";

export const useGetStudentResits = () => {
    return useQuery({
         queryKey:["student-resits"],
         queryFn:() => getAllResits()
    })
}