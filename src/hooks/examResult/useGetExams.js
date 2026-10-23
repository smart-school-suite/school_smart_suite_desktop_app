import { useQuery } from "@tanstack/react-query";
import { getExams } from "../../services/examResults";

export const useGetExams = () => {
  return useQuery({
     queryKey:["result-exam"],
     queryFn: () => getExams()
  })
}