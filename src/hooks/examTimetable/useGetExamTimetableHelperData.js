import { useQuery } from "@tanstack/react-query";
import { prepareExamTimeTableData } from "../../services/examTimetable";
export const useGetExamTimetableHelperData = (examId) => {
    return useQuery({
        queryKey:["examTimetableHelperData", examId],
        queryFn:() => prepareExamTimeTableData(examId),
        enabled:!!examId
    })
} 