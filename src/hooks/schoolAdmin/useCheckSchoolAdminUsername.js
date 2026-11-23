import { useQuery } from "@tanstack/react-query";
import { checkSchoolAdminUsername } from "../../services/schoolAdmin";

export const useCheckSchoolAdminUsername = (username, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["schoolAdminUsername", username],
    queryFn: () => checkSchoolAdminUsername(username),
    enabled: enabled && Boolean(username),
    staleTime: 30_000,
    retry: false,
  });
};
