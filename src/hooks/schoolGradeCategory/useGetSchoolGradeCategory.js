import { useQuery } from "@tanstack/react-query";
import { getSchoolGradeCategories } from "../../services/schoolGradeCategory";

export const useGetSchoolGradeCategories = () => {
    return useQuery({
         queryKey:["schoolGradeCategories"],
         queryFn:() => getSchoolGradeCategories(),
    })
}