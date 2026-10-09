import { useQuery } from "@tanstack/react-query";
import { getSemesterJointCourse } from "../../services/semesterJointCourse";

export const useGetSemesterJointCourse = () => {
  return useQuery({
    queryKey: ["semester-joint-courses"],
    queryFn: () => getSemesterJointCourse(),
  });
};
