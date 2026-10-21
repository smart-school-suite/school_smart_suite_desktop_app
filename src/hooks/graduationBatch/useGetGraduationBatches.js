import { useQuery } from "@tanstack/react-query";
import { getGraduationBatches } from "../../services/graduationBatch";

export const useGetGraduationBatches = () => {
  return useQuery({
    queryKey: ["graduation-batches"],
    queryFn: () => getGraduationBatches(),
  });
};
