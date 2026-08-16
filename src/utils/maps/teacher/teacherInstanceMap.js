import {
  QualificationInstance,
  AllowedLevelInstance,
} from "../../instance/teacher/teacherInstance";

export const teacherInstanceMap = [
  {
    key: "qualifications",
    label: "Qualification",
    instance: QualificationInstance,
  },
  {
    key: "allowed_levels",
    label: "Allowed Level",
    instance: AllowedLevelInstance,
  },
];
