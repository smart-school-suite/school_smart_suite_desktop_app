import { getDraftSchoolEvents } from "../../services/schoolEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetDraftSchoolEvents = () => {
      return useQuery({
        queryKey:["draftSchoolEvent"],
        queryFn: getDraftSchoolEvents
      })
}