import { useQuery } from "@tanstack/react-query";
import { activationCheck } from "../../services/semesterTimetable";

export const useGetActivationCheck = (versionId) => {
  return useQuery({
    queryKey: ["activation-check", versionId],
    queryFn: () => activationCheck(versionId),
  });
};
