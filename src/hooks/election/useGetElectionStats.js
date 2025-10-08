import { useQuery } from "@tanstack/react-query";
import { getElectionStats } from "../../services/election";

export const useGetElectionStats = (year) => {
     return useQuery({
         queryKey:["electionStats", year],
         queryFn:() => getElectionStats(year)
     })
}