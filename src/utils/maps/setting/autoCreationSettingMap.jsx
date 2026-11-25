import Switch from "../../../components/input/Switch";
import AutoCreateLevelsSetting from "../../../ModalContent/Setting/AutoCreation/AutoCreateLevelsSetting";

export const AUTO_CREATE_SCOPES = [
  "across_levels",
  "across_specialty",
  "across_department_levels",
  "across_department_specialty",
];

const isOn = (value) => value === true || value === 1 || value === "1" || value === "true";

export const createAutoCreationSettingMap = ({ prefix, label, noun }) => {
  const key = (name) => `${prefix}${name}`;
  const enabledKey = key("enabled");
  const whileEnabled = (values) => (isOn(values[enabledKey]) ? null : `Turn on ${label} to change this setting.`);

  const LevelsSetting = (props) => <AutoCreateLevelsSetting {...props} noun={noun} />;
  const switchEntry = (name, order, disabledReason) => ({
    key: key(name),
    order,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason,
  });

  return {
    [enabledKey]: switchEntry("enabled", 1),
    [key("levels")]: {
      key: key("levels"),
      order: 2,
      editor: "modal",
      valueType: "json",
      component: LevelsSetting,
      disabledReason: whileEnabled,
    },
    ...Object.fromEntries(
      AUTO_CREATE_SCOPES.map((name, index) => [key(name), switchEntry(name, 3 + index, whileEnabled)]),
    ),
    [key("require_students")]: switchEntry("require_students", 7, whileEnabled),
  };
};
