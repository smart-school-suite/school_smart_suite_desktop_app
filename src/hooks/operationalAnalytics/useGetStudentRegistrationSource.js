import { getStudentRegistrationSource } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentRegistrationSource = (year) => {
  return useQuery({
    queryKey: ["studentRegistrationSource", year],
    queryFn: () => getStudentRegistrationSource(year),
  });
};
