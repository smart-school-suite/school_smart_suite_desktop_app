import { useQuery } from "@tanstack/react-query";
import { getElectionTypes } from "../../services/electionType";

export const useGetElectionTypes = () => {
    return useQuery({
            queryKey: ['electionTypes'],
            queryFn: getElectionTypes,
    });
}