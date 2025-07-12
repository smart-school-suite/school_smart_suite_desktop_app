import { useQuery } from "@tanstack/react-query";
import { getCoursesBySpecialtySemester  } from "../../services/course";

export const useGetCoursesBySpecialtySemester = (specialtyId, schoolSemesterId) => {
     return useQuery({
         queryKey: ["coursesSpecialtySchoolSemester", schoolSemesterId],
         queryFn: () => getCoursesBySpecialtySemester(specialtyId, schoolSemesterId),
         enabled: !!specialtyId && schoolSemesterId,
    });
}