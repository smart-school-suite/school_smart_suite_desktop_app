import { useQuery } from "@tanstack/react-query";
import {
  getSchoolEvents,
  getSchoolEventsByStatus,
  getSchoolEventSummary,
} from "../../services/schoolEvent";

export const useGetSchoolEvents = () => {
  return useQuery({
    queryKey: ["schoolEvents"],
    queryFn: () => getSchoolEvents(),
  });
};

export const useGetSchoolEventsByStatus = (status) => {
  return useQuery({
    queryKey: ["schoolEvents", status],
    queryFn: () => getSchoolEventsByStatus(status),
    enabled: !!status,
    // a 404 means the tab has no events, so show that right away
    retry: (failureCount, error) =>
      error?.response?.status !== 404 && failureCount < 2,
  });
};

export const useGetSchoolEventSummary = () => {
  return useQuery({
    queryKey: ["schoolEventSummary"],
    queryFn: () => getSchoolEventSummary(),
  });
};
