import { useGetSchoolBranchSetting } from "../schoolBranchSetting/useGetSchoolBranchSetting";

export const DEFAULT_DUE_DAYS_KEY = "additionalFee.default_due_days";

const toDateString = (date) =>
  [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");

/**
 * The due date an additional fee gets when none is entered: today plus
 * "Default Due Period (Days)" from the settings. The API applies the same
 * rule; this is only for showing it in the billing forms.
 */
export const useDefaultDueDate = () => {
  const { data } = useGetSchoolBranchSetting();
  const setting = (data?.data ?? [])
    .flatMap((category) => category.setting ?? [])
    .find((item) => item.key === DEFAULT_DUE_DAYS_KEY);
  const days = Number.isFinite(Number(setting?.value)) && setting?.value !== null ? Number(setting.value) : null;
  if (days === null) return { days: null, date: null };

  const date = new Date();
  date.setDate(date.getDate() + days);
  return { days, date: toDateString(date) };
};
