import { getResitCoursesByExam } from "../../services/resitExamTimetable";
import { useQuery } from "@tanstack/react-query";

export const useGetResitExamCourse = (resitExamId) => {
    return useQuery({
         queryKey:["resitExamCourses", resitExamId],
         queryFn:getResitCoursesByExam(resitExamId)
    })
}