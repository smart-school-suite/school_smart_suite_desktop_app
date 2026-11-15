import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateHall } from "../../services/hall";

export const useBulkUpdateHall = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateData }) => bulkUpdateHall(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
      queryClient.invalidateQueries({ queryKey: ["hall"] });
    },
  });
};
