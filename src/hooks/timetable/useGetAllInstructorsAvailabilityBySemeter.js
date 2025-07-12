import { useQuery } from "@tanstack/react-query";
import { getAllInstructorsAvailabiltiesBySemester } from "../../services/timetable";

export const useGetAllInstructorAvailabilitiesBySemester = (
  semesterId,
  specialtyId
) => {
  return useQuery({
    queryKey: ["instructorAvailabilitiesBySemester", semesterId],
    queryFn: () =>
      getAllInstructorsAvailabiltiesBySemester(semesterId, specialtyId),
    enabled: !!semesterId && specialtyId,
  });
};
