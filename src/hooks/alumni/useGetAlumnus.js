import { useQuery } from "@tanstack/react-query";
import { getAlumnusDetails } from "../../services/alumni";

export const useGetAlumnusDetails = (alumusId) => {
  return useQuery({
    queryKey: ["alumnus", alumusId],
    queryFn: () => getAlumnusDetails(alumusId),
  });
};
