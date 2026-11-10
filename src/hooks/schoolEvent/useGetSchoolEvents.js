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
  });
};

export const useGetSchoolEventSummary = () => {
  return useQuery({
    queryKey: ["schoolEventSummary"],
    queryFn: () => getSchoolEventSummary(),
  });
};
