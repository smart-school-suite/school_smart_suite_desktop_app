import { useQuery } from "@tanstack/react-query";
import { getStudentParentRelationship } from "../../services/student";

export const useGetStudentParentRelationship = () => {
  return useQuery({
    queryKey: ["studentParentRelationship"],
    queryFn: () => getStudentParentRelationship(),
  });
};
