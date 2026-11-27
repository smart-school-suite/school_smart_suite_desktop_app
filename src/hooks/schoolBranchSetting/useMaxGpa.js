import { useMemo } from "react";
import { useGetSchoolBranchSetting } from "./useGetSchoolBranchSetting";

export const DEFAULT_MAX_GPA = 4;

/**
 * The school's "Maximum Attainable GPA" (grade.max_gpa) from the settings
 * list; grade points can never exceed it. 4.0 until the settings load.
 */
export const useMaxGpa = () => {
  const { data } = useGetSchoolBranchSetting();

  return useMemo(() => {
    const setting = (data?.data ?? [])
      .flatMap((category) => category?.setting ?? [])
      .find((item) => item?.key === "grade.max_gpa");
    const value = Number(setting?.value);
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_MAX_GPA;
  }, [data]);
};
