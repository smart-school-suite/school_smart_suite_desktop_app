const isSelected = (value) => Boolean(value?.id);

// Clamps a wizard step so a step never renders while the selections it `requires` are missing,
// falling back to the last step that can still render (the one that needs the missing input)
export const getSafeStepIndex = (flow, stepIndex, state) => {
  const firstBlockedIndex = flow.findIndex((step) =>
    (step.requires ?? []).some((field) => !isSelected(state?.[field])),
  );
  if (firstBlockedIndex === -1) return stepIndex;
  return Math.min(stepIndex, Math.max(firstBlockedIndex - 1, 0));
};
