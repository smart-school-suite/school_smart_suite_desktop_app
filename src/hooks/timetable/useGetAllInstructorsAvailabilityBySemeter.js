import { useQuery } from "@tanstack/react-query";
import { getAllInstructorsAvailabiltiesBySemester } from "../../services/timetable";

export const useGetAllInstructorAvailabilitiesBySemester = (
  semesterId,
  specialtyId
) => {
  return useQuery({
    queryKey: ["instructorAvailabilitiesBySemester", semesterId, specialtyId],
    queryFn: () =>
      getAllInstructorsAvailabiltiesBySemester(semesterId, specialtyId),
  });
};
