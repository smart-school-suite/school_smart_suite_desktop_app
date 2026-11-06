import { useGetSchoolBranchSetting } from "../schoolBranchSetting/useGetSchoolBranchSetting";

const START_KEY = "timetable.school_day_start";
const END_KEY = "timetable.school_day_end";

/**
 * The school day from App Configuration. The server bounds generated slots by
 * the same settings (falling back to 08:00–17:00), so this is for display only.
 */
export const useSchoolDayHours = () => {
  const settings = useGetSchoolBranchSetting();
  const all = (settings.data?.data ?? []).flatMap((category) => category?.setting ?? []);
  const valueOf = (key) => all.find((item) => item?.key === key)?.value ?? null;

  return {
    start: valueOf(START_KEY),
    end: valueOf(END_KEY),
    isLoading: settings.isLoading,
  };
};
