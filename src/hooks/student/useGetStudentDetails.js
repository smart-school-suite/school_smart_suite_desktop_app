import { useQuery } from "@tanstack/react-query";
import { getStudentDetails } from "../../services/Student";

export const useGetStudentById = (studentId) => {
     return useQuery({
         queryKey: ['students', studentId],
         queryFn: () => getStudentDetails(studentId),
         enabled: !!studentId,
     });
}
