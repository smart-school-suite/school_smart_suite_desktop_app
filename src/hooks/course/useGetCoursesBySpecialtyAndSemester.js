import { useQuery } from "@tanstack/react-query";
import { getCoursesBySpecialtySemester  } from "../../services/course";

export const useGetCoursesBySpecialtySemester = (specialtyId, semesterId) => {
     return useQuery({
         queryKey: ["courseSpecialtySemester", specialtyId, semesterId],
         queryFn: () => getCoursesBySpecialtySemester(specialtyId, semesterId),
         enabled: !!specialtyId && !!semesterId,
         retry: 1,
    });
}