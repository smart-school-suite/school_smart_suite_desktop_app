import { getTeachersBySpecialty } from "../../services/teacher";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherBySpecialty = (specialtyId) => {
    return useQuery({
        queryKey: ["teachersBySpecialty", specialtyId],
        queryFn: () => getTeachersBySpecialty(specialtyId),
        enabled: !!specialtyId,
        refetchOnWindowFocus: false,
        retry: 1,
})
}