import { getStudentSubscriptionDetail } from "../../services/activationCode";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentSubscriptionDetail = (studentId) => {
  return useQuery({
    queryKey: ["studentSubscriptionDetail", studentId],
    queryFn: () => getStudentSubscriptionDetail(studentId),
  });
};
