export const SPECIALTY_COLUMNS = [
  {
    program_name: "specialty_name",
    type: "standard_field",
    label: "Specialty Name",
    required: true,
    aliases: ["name", "specialty_title", "title", "spec_title", "spec_name"],
  },
  {
    program_name: "description",
    type: "standard_field",
    label: "Description",
    required: false,
    aliases: [
      "explaination",
      "des",
      "desc",
      "specialty_description",
      "spec_description",
      "spec_desc",
    ],
  },
  {
    program_name: "registration_fee",
    type: "standard_field",
    label: "Registration Fee",
    required: true,
    aliases: [
      "registration_fee",
      "reg_fee",
      "application_fee",
      "registration_cost",
    ],
  },
  {
    program_name: "school_fee",
    type: "standard_field",
    label: "Tuition Fee",
    required: true,
    aliases: ["tuition_fee", "school_fees", "class_fee", "spec_school_fee", "specialty_school_fee"],
  },
  {
     program_name:"level",
     type:"standard_field",
     label:"Level",
     required: true,
     aliases: ["level", "spec_level", "specialty_level"]
  },
  {
     program_name:"department_name",
     type:"standard_field",
     label:"Department Name",
     required: true,
     aliases: ["spec_department", 'department', 'department_name']
  }
];
