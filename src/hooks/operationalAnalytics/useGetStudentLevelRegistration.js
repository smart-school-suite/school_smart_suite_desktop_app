import { getStudentLevelRegistration } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentLevelRegistration = (year) => {
      return useQuery({
         queryKey:["studentLevelRegistration", year],
         queryFn:() => getStudentLevelRegistration()
      });
}