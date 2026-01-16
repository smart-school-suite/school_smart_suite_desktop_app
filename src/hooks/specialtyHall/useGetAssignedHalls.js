import { getAssignedHalls } from "../../services/specialtyHall";
import { useQuery } from "@tanstack/react-query";

export const useGetAssignedHalls = (specialtyId) => {
  return useQuery({
    queryKey: ["assignedHalls", specialtyId],
    queryFn: () => getAssignedHalls(specialtyId),
  });
};
