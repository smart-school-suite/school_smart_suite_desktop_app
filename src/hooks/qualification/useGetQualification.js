import { useQuery } from "@tanstack/react-query";
import { getQualifications } from "../../services/qualification";

export const useGetQualifications = () => {
  return useQuery({
    queryKey: ["qualification"],
    queryFn: () => getQualifications(),
  });
};
