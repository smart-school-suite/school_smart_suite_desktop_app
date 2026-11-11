// Options of the "Automatic <Record> Creation" setting, worded for the kind
// of record (e.g. "semester", "academic year").
export const autoCreateModeOptions = (noun) => [
  {
    value: "disabled",
    label: "Disabled",
    description: `Create the ${noun} only for the selected academic level.`,
  },
  {
    value: "same_specialty",
    label: "Within the Same Specialty",
    description: `Automatically create the ${noun} for the other applicable levels of the same specialty.`,
  },
  {
    value: "across_specialties",
    label: "Across Specialties",
    description: `Also create the ${noun} for applicable levels of other specialties in the same department, as set by the Across Specialties switches.`,
  },
];

export const optionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;
