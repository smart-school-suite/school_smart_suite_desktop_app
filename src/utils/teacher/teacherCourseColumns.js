export const TEACHER_COURSE_COLUMNS = [
  {
    program_name: "teacher",
    type: "standard_field",
    label: "Teacher Name",
    required: true,
    aliases: ["name", "full_name", "teacher_name", "teacher"],
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
    aliases: ["level", "teacher_level", "stud_level", "level"],
  },
  {
    program_name: "course",
    type: "standard_field",
    label: "Course",
    required: true,
    aliases: ["course_title", "title", "c_title", "c_name", "course_name", "course"],
  },
];
