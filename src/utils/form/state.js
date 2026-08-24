/**
 * Update one field in an object state.
 */
export const updateFormField = (
  setState,
  field,
  value
) => {
  setState((prev) => ({
    ...prev,
    [field]: value,
  }));
};

/**
 * Update multiple fields in an object state.
 */
export const updateFormFields = (
  setState,
  fields
) => {
  setState((prev) => ({
    ...prev,
    ...fields,
  }));
};

/**
 * Reset form state.
 */
export const resetFormState = (
  setState,
  initialState
) => {
  setState(initialState);
};

export const updateDynamicFieldValidation = (
  setState,
  section,
  itemId,
  field,
  value
) => {
  setState((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [itemId]: {
        ...prev[section]?.[itemId],
        [field]: value,
      },
    },
  }));
};

export const removeDynamicFieldValidation = (
  setState,
  section,
  itemId
) => {
  setState((prev) => {
    const sectionState = { ...prev[section] };

    delete sectionState[itemId];

    return {
      ...prev,
      [section]: sectionState,
    };
  });
};