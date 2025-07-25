import { useQuery } from "@tanstack/react-query";
import { prepareCaData } from "../../services/evaluateStudent";

export const useGetCaHelperData = (examId, studentId) => {
    return useQuery({
         queryKey:["CAhelperData", examId, studentId],
         queryFn:() => prepareCaData(examId, studentId)
    })
}