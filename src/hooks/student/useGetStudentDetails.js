import { useQuery } from "@tanstack/react-query";
import { getStudentDetails } from "../../services/student";

export const useGetStudentDetails = (studentId) => {
     return useQuery({
         queryKey: ['student', studentId],
         queryFn: () => getStudentDetails(studentId),
         enabled: !!studentId,
     });
}
