import { getTeacherSubscriptionDetail } from "../../services/activationCode";
import { useQuery } from "@tanstack/react-query";
export const useGetTeacherSubscriptionDetail = async (teacherId) => {
  return useQuery({
    queryKey: ["teacherSubscriptionDetail", teacherId],
    queryFn: () => getTeacherSubscriptionDetail(teacherId),
  });
};
