/**
 * Create a ref registry for dynamic form components.
 *
 * Structure:
 *
 * {
 *   qualifications: {
 *     "qualification-id": {
 *       field_of_study: ref,
 *       institution: ref,
 *       year: ref,
 *     }
 *   }
 * }
 */

export const createFormRefRegistry = () => ({
  current: {},
});

/**
 * Register a dynamic component ref.
 *
 * @param {Object} registry - The ref registry object.
 * @param {string} section - Collection name e.g. qualifications.
 * @param {string} itemId - Stable item ID.
 * @param {string} field - Field name.
 * @param {Object|null} ref - Component ref.
 */
export const setDynamicRef = (
  registry,
  section,
  itemId,
  field,
  ref
) => {
  if (!registry?.current) return;

  if (!registry.current[section]) {
    registry.current[section] = {};
  }

  if (!registry.current[section][itemId]) {
    registry.current[section][itemId] = {};
  }

  if (ref) {
    registry.current[section][itemId][field] = ref;
  } else {
    delete registry.current[section][itemId][field];

    if (
      Object.keys(registry.current[section][itemId]).length === 0
    ) {
      delete registry.current[section][itemId];
    }

    if (
      Object.keys(registry.current[section]).length === 0
    ) {
      delete registry.current[section];
    }
  }
};

/**
 * Get a specific dynamic ref.
 */
export const getDynamicRef = (
  registry,
  section,
  itemId,
  field
) => {
  return (
    registry?.current?.[section]?.[itemId]?.[field] || null
  );
};

/**
 * Get all refs belonging to a dynamic item.
 */
export const getDynamicItemRefs = (
  registry,
  section,
  itemId
) => {
  return registry?.current?.[section]?.[itemId] || {};
};

/**
 * Get all refs belonging to a dynamic section.
 */
export const getDynamicSectionRefs = (
  registry,
  section
) => {
  return registry?.current?.[section] || {};
};

/**
 * Remove every ref belonging to a dynamic item.
 */
export const removeDynamicRefs = (
  registry,
  section,
  itemId
) => {
  if (!registry?.current?.[section]) return;

  delete registry.current[section][itemId];

  if (
    Object.keys(registry.current[section]).length === 0
  ) {
    delete registry.current[section];
  }
};

/**
 * Remove an entire dynamic section.
 */
export const clearDynamicRefs = (
  registry,
  section
) => {
  if (!registry?.current) return;

  delete registry.current[section];
};

/**
 * Clear the entire registry.
 */
export const clearFormRefs = (registry) => {
  if (!registry?.current) return;

  registry.current = {};
};

export const createDynamicRefCallback = (
  registry,
  section,
  itemId,
  field
) => {
  return (ref) => {
    setDynamicRef(
      registry,
      section,
      itemId,
      field,
      ref
    );
  };
};