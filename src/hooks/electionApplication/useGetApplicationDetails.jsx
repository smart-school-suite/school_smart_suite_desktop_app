import { useQuery } from "@tanstack/react-query";
import { getApplicationDetails } from "../../services/electionApplication";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetApplicationDetails = (applicationId, options = {}) =>
  useQuery({
    queryKey: electionKeys.application(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
    enabled: Boolean(applicationId),
    ...options,
  });
