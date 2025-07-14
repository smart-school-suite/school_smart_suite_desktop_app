import { useQuery } from "@tanstack/react-query";
import { getSemester } from "../../services/semester";

export const useGetSemester = () => {
  return useQuery({
    queryKey: ["semesters"],
    queryFn:() =>  getSemester(),
  });
};
