import { useQuery } from "@tanstack/react-query";
import { getSpecialties } from "../../services/specialtyHall";

export const useGetSpecialties = () => {
  return useQuery({
    queryKey: ["specialty-hall-specialties"],
    queryFn: () => getSpecialties(),
    refetchOnWindowFocus: false,
  });
};
