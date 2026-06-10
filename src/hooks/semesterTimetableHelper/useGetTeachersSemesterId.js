import { getTeachers } from "../../services/semesterTimetableHelpers";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachersSemesterId = (schoolSemesterId) => {
  return useQuery({
    queryKey: ["teachers-schoolsemester", schoolSemesterId],
    queryFn: () => getTeachers(schoolSemesterId),
  });
};
