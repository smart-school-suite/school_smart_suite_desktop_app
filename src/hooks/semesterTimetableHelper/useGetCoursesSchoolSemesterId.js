import { useMutation } from "@tanstack/react-query";
import { getCoursesSchoolSemesterId } from "../../services/semesterTimetableHelpers";
export const useGetCoursesSchoolSemesterId = () => {
    return useMutation({
      mutationFn: (payload) => getCoursesSchoolSemesterId(payload),
    });
};
