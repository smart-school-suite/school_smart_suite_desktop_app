export const TEACHER_COLUMNS = [
  {
    program_name: "email",
    label: "Email",
    required: true,
    aliases: ["email_address", "mail", "e-mail"],
  },
  {
    program_name: "full_names",
    label: "Full Names",
    required: true,
    aliases: ["name", "full_name", "teacher_name"],
  },
  {
    program_name: "first_name",
    label: "First Name",
    required: true,
    aliases: ["fname", "given_name", "firstname"],
  },
  {
    program_name: "last_name",
    label: "Last Name",
    required: true,
    aliases: ["lname", "surname", "family_name", "lastname"],
  },
  {
    program_name: "phone",
    label: "Phone",
    required: false,
    aliases: ["phone_number", "telephone", "mobile", "contact"],
  },
  {
    program_name: "address",
    label: "Address",
    required: false,
    aliases: ["residence", "location", "street"],
  },
  {
    program_name: "gender",
    label: "Gender",
    required: false,
    aliases: ["sex"],
  },
];