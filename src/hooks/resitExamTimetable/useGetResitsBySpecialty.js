import { getResitsBySpecialty } from "../../services/resitExamTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetResitsBySpecialty = (specialtyId, examId) => {
    return useQuery({
         queryKey:["resitsBySpecialty", specialtyId],
         queryFn:getResitsBySpecialty(specialtyId, examId)
    })
}