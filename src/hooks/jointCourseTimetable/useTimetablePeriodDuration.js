import { useGetSchoolBranchSetting } from "../schoolBranchSetting/useGetSchoolBranchSetting";

export const PERIOD_DURATION_SETTING_KEY = "timetable.period_duration";

/**
 * The teaching period length from App Configuration (school branch settings).
 * `minutes` is null while loading, on error, or when the setting is missing;
 * callers show that instead of assuming a value.
 */
export const useTimetablePeriodDuration = () => {
  const settings = useGetSchoolBranchSetting();
  const setting = (settings.data?.data ?? [])
    .flatMap((category) => category?.setting ?? [])
    .find((item) => item?.key === PERIOD_DURATION_SETTING_KEY);
  const minutes = Number(setting?.value);

  return {
    minutes: Number.isFinite(minutes) && minutes > 0 ? minutes : null,
    isLoading: settings.isLoading,
    error: settings.error,
    isMissing: !settings.isLoading && !settings.error && !setting,
  };
};
