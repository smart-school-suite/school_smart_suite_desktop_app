import { useQuery } from "@tanstack/react-query";
import { getAlumni } from "../../services/alumni";

export const useGetAlumni = () => {
  return useQuery({
    queryKey: ["alumni"],
    queryFn: () => getAlumni(),
  });
};
