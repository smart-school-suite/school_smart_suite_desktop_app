export const PARENT_COLUMNS = [
  {
    program_name: "name",
    type: "standard_field",
    label: "Guardian Name",
    required: true,
    aliases: [
      "name",
      "full_names",
      "g_name",
      "parent_names",
      "parent_full_names",
    ],
  },
  {
    program_name: "address",
    type: "standard_field",
    label: "Address",
    required: true,
    aliases: ["address", "guardian_address", "parent_address"],
  },
  {
    program_name: "phone",
    type: "standard_field",
    label: "Phone",
    required: true,
    aliases: ["guardian_contact", "phone", "guardian_phone"],
  },
  {
    program_name: "contact_method",
    type: "standard_field",
    label: "Contact Method",
    required: true,
    aliases: ["contact_method", "contact"],
  },
  {
    program_name: "language",
    type: "standard_field",
    label: "Language",
    required: true,
    aliases: ["language"],
  },
];
