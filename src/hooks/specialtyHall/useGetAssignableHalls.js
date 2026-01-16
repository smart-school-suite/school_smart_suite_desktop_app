import { useQuery } from "@tanstack/react-query";
import { getAssignableHalls } from "../../services/specialtyHall";

export const useGetAssignableHalls = (specialtyId) => {
  return useQuery({
    queryKey: ["assignableHalls", specialtyId],
    queryFn: () => getAssignableHalls(specialtyId),
  });
};
