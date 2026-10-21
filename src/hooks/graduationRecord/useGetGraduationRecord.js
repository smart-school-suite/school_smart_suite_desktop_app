import { useQuery } from "@tanstack/react-query";
import { getGraduationRecords } from "../../services/graduationRecord";

export const useGetGraduationRecords = () => {
  return useQuery({
    queryKey: ["graduation-records"],
    queryFn: () => getGraduationRecords(),
  });
};
