import { getTimetableStatus } from "../../services/semesterTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetTimetableStatus = (versionId) => {
     return useQuery({
         queryKey:["timetable-status"],
         queryFn:() => getTimetableStatus(versionId),
         enabled:!!versionId
     })
}