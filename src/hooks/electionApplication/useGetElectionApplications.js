import { useQuery } from "@tanstack/react-query";
import { getAllElectionApplications } from "../../services/electionApplication";

export const useGetElectionApplications = () => {
    return useQuery({
            queryKey: ['electionApplications'],
            queryFn: getAllElectionApplications,
    });
}