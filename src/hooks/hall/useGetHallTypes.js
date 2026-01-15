import { useQuery } from "@tanstack/react-query";
import { getHallTypes } from "../../services/hall";

export const useGetHallTypes = () => {
  return useQuery({
    queryKey: ["hallTypes"],
    queryFn: () => getHallTypes(),
  });
};
