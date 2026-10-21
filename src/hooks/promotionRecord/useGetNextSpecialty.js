import { useQuery } from "@tanstack/react-query";
import { getNextSpecialty } from "../../services/promotionRecord";

export const useGetNextSpecialty = (recordId) => {
  return useQuery({
    queryKey: ["next-specialty", recordId],
    queryFn: () => getNextSpecialty(recordId),
  });
};
