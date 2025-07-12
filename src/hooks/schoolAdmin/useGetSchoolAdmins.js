import { useQuery } from "@tanstack/react-query";
import { getSchoolAdmins } from "../../services/schoolAdmin";

export const useGetSchoolAdmins = () => {
      return useQuery({
        queryKey: ['schoolAdmins'],
        queryFn: getSchoolAdmins,
      });
}