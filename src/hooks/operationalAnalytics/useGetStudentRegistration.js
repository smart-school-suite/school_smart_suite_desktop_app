import { getStudentRegistration } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentRegistration = (year) => {
  return useQuery({
    queryKey: ["studentRegistration", year],
    queryFn: () => getStudentRegistration(year),
  });
};
