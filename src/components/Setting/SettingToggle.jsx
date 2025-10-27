import { useUpdateElectionSetting } from "../../hooks/schoolBranchSetting/useUpdateElectionSetting";
import { useUpdateExamSetting } from "../../hooks/schoolBranchSetting/useUpdateExamSetting";
import { useUpdateGradeSettings } from "../../hooks/schoolBranchSetting/useUpdateGradeSetting";
import { useUpdatePromotionSetting } from "../../hooks/schoolBranchSetting/useUpdatePromotionSetting";
import { useUpdateResitSetting } from "../../hooks/schoolBranchSetting/useUpdateResitSetting";
import { useUpdateTimetableSetting } from "../../hooks/schoolBranchSetting/useUpdateTimetableSetting";
function SettingToggle({ setting }) {
  const { mutate: updateElectionSetting } = useUpdateElectionSetting(
    null,
    setting.id
  );
  const { mutate: updateExamSetting } = useUpdateExamSetting(null, setting.id);
  const { mutate: updateGradeSetting } = useUpdateGradeSettings(
    null,
    setting.id
  );
  const { mutate: updatePromotionSetting } = useUpdatePromotionSetting(
    null,
    setting.id
  );
  const { mutate: updateResitSetting } = useUpdateResitSetting(
    null,
    setting.id
  );
  const { mutate: updateTimetableSetting } = useUpdateTimetableSetting(
    null,
    setting.id
  );
  const mutationMap = {
    "setting.category.exam": updateExamSetting,
    "setting.category.resit": updateResitSetting,
    "setting.category.timetable": updateTimetableSetting,
    "setting.category.promotion": updatePromotionSetting,
    "setting.category.grade": updateGradeSetting,
    "setting.category.election.tie.breaker": updateElectionSetting,
  };
  const mutate = mutationMap[setting?.category_key];
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input py-2 px-3"
          type="checkbox"
          role="switch"
          id="switchCheckDefault"
          checked={setting.value}
          onChange={() =>
            mutate({
              school_branch_setting_id: setting.id,
              value: !setting.value,
            })
          }
        />
      </div>
    </>
  );
}
export default SettingToggle;
