export const semesterSyncModeOptions = [
  {
    value: "disabled",
    label: "Disabled",
    description: "Create the semester only for the selected academic level.",
  },
  {
    value: "same_programme",
    label: "Same Programme",
    description: "Automatically create the semester for the other eligible levels of the same specialty.",
  },
  {
    value: "across_programmes",
    label: "Across Programmes",
    description: "Automatically create the semester for eligible levels of other specialties, within the synchronization scope.",
  },
];

export const semesterSyncScopeOptions = [
  {
    value: "same_specialty",
    label: "Same Specialty",
    description: "Levels of specialties with the same name, in any department.",
  },
  {
    value: "across_specialties",
    label: "Across Specialties",
    description: "All specialties in the same department as the semester's specialty.",
  },
  {
    value: "institution",
    label: "Entire Institution",
    description: "All specialties in the institution.",
  },
];

export const optionLabel = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;
