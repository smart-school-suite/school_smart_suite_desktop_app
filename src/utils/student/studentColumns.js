export const STUDENT_COLUMNS = [
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
    program_name: "specialty",
    type: "standard_field",
    label: "Specialty",
    required: false,
    aliases: [
      "specialty",
      "spec",
      "student_specialty",
      "spec_stud",
      "spec_student",
    ],
  },
  {
    program_name: "level",
    type: "standard_field",
    label: "Level",
    required: false,
    aliases: ["level", "student_level", "stud_level"],
  },
  {
    program_name: "batch",
    type: "standard_field",
    label: "Student Batch",
    required: false,
    aliases: ["student_batch", "batch", "stud_batch"],
  },
  {
    program_name: "relationship",
    type: "standard_field",
    label: "Relationship",
    required: false,
    aliases: ["student_relationship", "student_parent_relationship", "relationship"],
  },
  {
    program_name: "guardian",
    type: "standard_field",
    label: "Guardian",
    required: false,
    aliases: ["guardian", "student_guardian"],
  },
  {
     program_name:"student_source",
     type: "standard_field",
     label: "Student Source",
     required: false,
     aliases: ["source", "student_source", "stud_source"]
  },
  {
     program_name:"fee_payment_format",
     type: "standard_field",
     label: "Payment Format",
     required: false, 
     aliases: ["payment_format", "fee_payment_format", "fee_payment_format"]
  }
];
