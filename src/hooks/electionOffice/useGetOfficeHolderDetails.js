import { useQuery } from "@tanstack/react-query";
import { getOfficeHolderDetails } from "../../services/electionOffice";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetOfficeHolderDetails = (holderId, options = {}) =>
  useQuery({
    queryKey: electionKeys.officeHolder(holderId),
    queryFn: () => getOfficeHolderDetails(holderId),
    enabled: Boolean(holderId),
    ...options,
  });
