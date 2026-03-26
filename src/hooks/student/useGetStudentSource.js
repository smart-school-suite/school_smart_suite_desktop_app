import { useQuery } from "@tanstack/react-query";
import { getStudentSource } from "../../services/student";

export const useGetStudentSource = () => {
  return useQuery({
    queryKey: ["studentSource"],
    queryFn: () => getStudentSource(),
  });
};
