import { useQuery } from "@tanstack/react-query";
import { getLevelTypes } from "../../services/levelType";

export const useGetLevelTypes = () => {
  return useQuery({
    queryKey: ["level-types"],
    queryFn: () => getLevelTypes(),
  });
};
