export const JOINT_COURSE_COLUMNS = [
  {
    program_name: "course_code",
    type: "standard_field",
    label: "Course Code",
    required: true,
    aliases: ["course_code", "code", "c_code"],
  },
  {
    program_name: "course_credit",
    type: "standard_field",
    label: "Course Credit",
    required: true,
    aliases: ["course_credit", "credit", "c_credit"],
  },
  {
    program_name: "course_title",
    type: "standard_field",
    label: "Course Title",
    required: true,
    aliases: ["course_title", "title", "c_title", "c_name", "course_name"],
  },
  {
    program_name: "description",
    type: "standard_field",
    label: "Course Description",
    required: true,
    aliases: [
      "course_description",
      "description",
      "c_description",
      "c_desc",
      "desc",
    ],
  },
  {
    program_name: "semester",
    type: "standard_field",
    label: "Semester",
    required: true,
    aliases: ["semester", "semester_name"],
  },
  {
    type: "repeatable_group",
    program_name: "course_types",
    label: "Course Types",
    occurrences: {
      min: 1,
      max: 5,
    },
    fields: [
      {
        program_name: "course_type",
        label: "Course Type",
        required: true,
      },
    ],
  },
  {
    type: "repeatable_group",
    program_name: "specialties",
    label: "Specialties",
    occurrences: {
      min: 2,
      max: 10,
    },
    fields: [
      {
        program_name: "specialty",
        label: "specialty",
        required: true,
      },
      {
        program_name: "level",
        label: "level",
        required: true,
      },
    ],
  },
];
