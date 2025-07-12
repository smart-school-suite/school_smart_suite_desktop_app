import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/department";

export const useGetDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });
}