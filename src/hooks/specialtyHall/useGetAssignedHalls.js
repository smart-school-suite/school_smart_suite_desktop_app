import { useQuery } from "@tanstack/react-query";
import { getAssignedHalls } from "../../services/specialtyHall";

export const useGetAssignedHalls = (specialtyId) => {
  return useQuery({
    queryKey: ["assignedHalls", specialtyId],
    queryFn: () => getAssignedHalls(specialtyId),
  });
};
