import { useQuery } from "@tanstack/react-query";
import { getActiveGenders } from "../../services/gender";

export const useGetActiveGender = () => {
  return useQuery({
    queryKey: ["activeGender"],
    queryFn: () => getActiveGenders(),
  });
};
