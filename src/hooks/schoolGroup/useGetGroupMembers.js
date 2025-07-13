import { useQuery } from "@tanstack/react-query";
import { getAudienceGroupMembers } from "../../services/schoolGroup";

export const useGetGroupMembers = (groupId) => {
   return useQuery({
       queryKey:["schoolGroupMembers", groupId],
       queryFn:getAudienceGroupMembers(groupId)
   })
}