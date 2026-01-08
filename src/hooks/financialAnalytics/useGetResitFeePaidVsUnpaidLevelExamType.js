import { useMutation } from "@tanstack/react-query";
import { getResitFeePaidVsUpaidLevelExamType } from "../../services/financialAnalytics";

export const useGetResitFeePaidVsUnpaidLevelExamType = async () => {
      return useMutation({
          mutationFn: (year) => getResitFeePaidVsUpaidLevelExamType(year),
          
      })
}