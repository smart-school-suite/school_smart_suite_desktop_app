import { useQuery } from "@tanstack/react-query";
import { getExpiredSchoolEvents } from "../../services/schoolEvent";

export const useGetExpiredSchoolEvents = () => {
  return useQuery({
    queryKey: ["expiredSchoolEvent"],
    queryFn: getExpiredSchoolEvents,
  });
};
