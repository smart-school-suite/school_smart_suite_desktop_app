import { useQuery } from "@tanstack/react-query";
import { getElections } from "../../services/election";

export const useGetElections = () => {
    return useQuery({
            queryKey: ['elections'],
            queryFn: getElections,
    });
}