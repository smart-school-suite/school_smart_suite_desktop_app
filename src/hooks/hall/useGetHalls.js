import { getHalls } from "../../services/hall";
import { useQuery } from "@tanstack/react-query";

export const useGetHalls = () => {
  return useQuery({
    queryKey: ["halls"],
    queryFn: () => getHalls(),
  });
};
