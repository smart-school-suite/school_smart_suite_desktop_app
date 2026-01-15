import { useQuery } from "@tanstack/react-query";
import { getActiveHalls } from "../../services/hall";

export const useGetActiveHalls = () => {
  return useQuery({
    queryKey: ["activeHalls"],
    queryFn: () => getActiveHalls(),
  });
};
