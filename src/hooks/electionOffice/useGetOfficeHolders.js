import { useQuery } from "@tanstack/react-query";
import { getOfficeHolders } from "../../services/electionOffice";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetOfficeHolders = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.officeHolders(filters),
    queryFn: () => getOfficeHolders(filters),
    ...options,
  });
