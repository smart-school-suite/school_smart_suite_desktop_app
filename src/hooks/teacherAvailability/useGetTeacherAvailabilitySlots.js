import { getTeacherAvailabilitySlots } from "../../services/teacherAvailability";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherAvailabilitySlots = (availabilityId) => {
  return useQuery({
    queryKey: ["teacherAvailabilitySlots", availabilityId],
    queryFn: () => getTeacherAvailabilitySlots(availabilityId),
  });
};
