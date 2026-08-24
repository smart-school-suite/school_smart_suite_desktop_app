export const TEACHER_SPECIALTY_COLUMNS = [
  {
    program_name: "teacher",
    type: "standard_field",
    label: "Teacher Name",
    required: true,
    aliases: ["name", "full_name", "teacher_name"],
  },
  {
    program_name: "specialty",
    type: "standard_field",
    label: "Specialty",
    required: false,
    aliases: [
      "specialty",
      "spec",
      "teacher_specialty",
      "spec_stud",
      "spec_teacher",
    ],
  },
  {
    program_name: "level",
    type: "standard_field",
    label: "Level",
    required: false,
    aliases: ["level", "teacher_level", "stud_level"],
  },
];
