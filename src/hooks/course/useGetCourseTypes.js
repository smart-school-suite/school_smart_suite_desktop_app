import { useQuery } from "@tanstack/react-query";
import { getCourseTypes } from "../../services/course";

export const useGetCourseTypes = () => {
     return useQuery({
         queryKey:["courseTypes"],
         queryFn:() => getCourseTypes()
     })
}