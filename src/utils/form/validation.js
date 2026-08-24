/**
 * Validate a single form component ref.
 *
 * A valid form component should expose:
 *
 * triggerValidation(): Promise<boolean> | boolean
 */
export const validateRef = async (ref) => {
  if (!ref?.triggerValidation) {
    return true;
  }

  try {
    const result = await ref.triggerValidation();

    return result === true;
  } catch (error) {
    return false;
  }
};

export const validateCustomRules = async (rules = {}) => {
  const entries = Object.entries(rules);

  const results = await Promise.all(
    entries.map(async ([name, validator]) => {
      try {
        const result = await validator();

        return [name, result === true];
      } catch (error) {
        return [name, false];
      }
    })
  );

  return Object.fromEntries(results);
};

/**
 * Validate a collection of refs.
 *
 * Example:
 *
 * {
 *   first_name: firstNameRef,
 *   last_name: lastNameRef,
 *   email: emailRef
 * }
 *
 * Returns:
 *
 * {
 *   first_name: true,
 *   last_name: false,
 *   email: true
 * }
 */
export const validateRefs = async (refs = {}) => {
  const entries = Object.entries(refs);

  const results = await Promise.all(
    entries.map(async ([field, ref]) => {
      const isValid = await validateRef(ref);

      return [field, isValid];
    })
  );

  return Object.fromEntries(results);
};

/**
 * Validate a dynamic section.
 *
 * Example:
 *
 * qualifications: {
 *   abc123: {
 *     field_of_study: ref,
 *     institution: ref,
 *     year: ref
 *   },
 *   xyz456: {
 *     field_of_study: ref,
 *     institution: ref,
 *     year: ref
 *   }
 * }
 *
 * Returns:
 *
 * {
 *   abc123: {
 *     field_of_study: true,
 *     institution: true,
 *     year: false
 *   }
 * }
 */
export const validateDynamicSection = async (
  sectionRefs = {}
) => {
  const entries = Object.entries(sectionRefs);

  const results = await Promise.all(
    entries.map(async ([itemId, itemRefs]) => {
      const validation = await validateRefs(itemRefs);

      return [itemId, validation];
    })
  );

  return Object.fromEntries(results);
};

/**
 * Determine whether every field in a validation object
 * is valid.
 */
export const areAllFieldsValid = (validation = {}) => {
  return Object.values(validation).every(
    (value) => value === true
  );
};

/**
 * Determine whether every field in a nested dynamic
 * validation object is valid.
 */
export const areAllDynamicFieldsValid = (
  validation = {}
) => {
  return Object.values(validation).every(
    (itemValidation) =>
      areAllFieldsValid(itemValidation)
  );
};

/**
 * Flatten validation results into a single boolean.
 */
export const isValidationSuccessful = (
  validation = {}
) => {
  return Object.values(validation).every((value) => {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "object" && value !== null) {
      return areAllDynamicFieldsValid(value);
    }

    return true;
  });
};