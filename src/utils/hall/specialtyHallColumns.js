export const SPECIALTY_HALL_COLUMNS = [
  {
    program_name: "hall",
    type: "standard_field",
    label: "Hall",
    required: true,
    aliases: ["hall_name", "name", "room", "classroom"],
  },
  {
    program_name: "specialty",
    type: "standard_field",
    label: "Specialty",
    required: true,
    aliases: ["specialty_name", "spec", "program"],
  },
  {
    program_name: "level",
    type: "standard_field",
    label: "Level",
    // Only needed when several specialties share a name.
    required: false,
    aliases: ["level_name", "specialty_level"],
  },
];
