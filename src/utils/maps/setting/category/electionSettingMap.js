import Switch from "../../../../components/input/Switch";

export const electionSettingMap = {
  "election_tie_breaker.highest_gpa_winner": {
    key: "election_tie_breaker.highest_gpa_winner",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "election_tie_breaker.highest_admin_votes": {
    key: "election_tie_breaker.highest_admin_votes",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
};
