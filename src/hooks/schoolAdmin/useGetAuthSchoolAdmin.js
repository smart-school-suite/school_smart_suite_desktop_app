import { getAuthSchoolAdmin } from "../../services/schoolAdmin";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthSchoolAdmin = (options = {}) => {
  return useQuery({
    queryKey: ["authSchoolAdmin"],
    queryFn: () => getAuthSchoolAdmin(),
    ...options,
  });
};
