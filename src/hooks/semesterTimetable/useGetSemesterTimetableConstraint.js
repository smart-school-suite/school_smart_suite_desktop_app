import { getSemesterTimetableConstraints } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";
export const useGetSemesterTimetableConstraints = () => {
     return useQuery({
         queryKey:["semester-timetable-constraints"],
         queryFn:() => getSemesterTimetableConstraints()
     })
}