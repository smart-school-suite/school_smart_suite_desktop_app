export const TEACHER_COLUMNS = [
  {
    program_name: "email",
    type: "standard_field",
    label: "Email",
    required: true,
    aliases: ["email_address", "mail", "e-mail"],
  },
  {
    program_name: "full_names",
    type: "standard_field",
    label: "Full Names",
    required: true,
    aliases: ["name", "full_name", "teacher_name"],
  },
  {
    program_name: "first_name",
    type: "standard_field",
    label: "First Name",
    required: true,
    aliases: ["fname", "given_name", "firstname"],
  },
  {
    program_name: "last_name",
    type: "standard_field",
    label: "Last Name",
    required: true,
    aliases: ["lname", "surname", "family_name", "lastname"],
  },
  {
    program_name: "phone",
    type: "standard_field",
    label: "Phone",
    required: false,
    aliases: ["phone_number", "telephone", "mobile", "contact"],
  },
  {
    program_name: "address",
    type: "standard_field",
    label: "Address",
    required: false,
    aliases: ["residence", "location", "street"],
  },
  {
    program_name: "gender",
    type: "standard_field",
    label: "Gender",
    required: false,
    aliases: ["sex"],
  },
  {
    type: "repeatable_group",
    program_name: "qualifications",
    label: "Qualifications",
    occurrences: {
      min: 1,
      max: 5,
    },
    fields: [
      {
        program_name: "qualification",
        label: "Qualification",
        required: true,
      },
      {
        program_name: "field_of_study",
        label: "Field of Study",
        required: true,
      },
      {
        program_name: "university",
        label: "university",
        required: true,
      },
      {
        program_name: "year_obtained",
        label: "Year Obtained",
        required: true,
      },
    ],
  },
  {
    type: "repeatable_group",
    program_name: "allowed_levels",
    label: "Qualifications",
    occurrences: {
      min: 1,
      max: 5,
    },
    fields: [
      {
        program_name: "allowed_level",
        label: "Allowed Level",
        required: true,
      },
    ],
  },
];
