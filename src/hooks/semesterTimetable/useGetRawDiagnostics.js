import { useQuery } from "@tanstack/react-query";
import { getRawDiagnostics } from "../../services/semesterTimetable";

export const useGetRawDiagnostics = (versionId) => {
    return useQuery({
         queryKey:["raw-diagnostics"],
         queryFn: () => getRawDiagnostics(versionId)
    })
}