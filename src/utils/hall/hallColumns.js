export const HALL_COLUMNS = [
  {
    program_name: "name",
    type: "standard_field",
    label: "Hall Name",
    required: true,
    aliases: ["name", "hall_title", "h_title", "h_name", "hall_name"],
  },
  {
    program_name: "capacity",
    type: "standard_field",
    label: "Hall Capacity",
    required: true,
    aliases: ["hall_capacity", "capacity", "h_capacity"],
  },
  {
    program_name: "location",
    type: "standard_field",
    label: "Hall Location",
    required: true,
    aliases: ["hall_location", "location", "h_location"],
  },
  {
    type: "repeatable_group",
    program_name: "types",
    label: "Hall Types",
    occurrences: {
      min: 1,
      max: 5,
    },
    fields: [
      {
        program_name: "type",
        label: "Hall Type",
        required: true,
      },
    ],
  },
];
