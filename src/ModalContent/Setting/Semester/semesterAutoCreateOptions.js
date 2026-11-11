export const AUTO_CREATE_MODE_KEY = "semester.auto_create_mode";

export const autoCreateModeOptions = [
  {
    value: "disabled",
    label: "Disabled",
    description: "Create the semester only for the selected academic level.",
  },
  {
    value: "same_specialty",
    label: "Within the Same Specialty",
    description: "Automatically create the semester for the other applicable levels of the same specialty.",
  },
  {
    value: "across_specialties",
    label: "Across Specialties",
    description: "Also create the semester for applicable levels of other specialties in the same department, as set by the Across Specialties switches.",
  },
];

export const optionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;
