/**
 * Add an item to a collection.
 */
export const addCollectionItem = (
  collection = [],
  item
) => {
  return [...collection, item];
};

/**
 * Update one field on an item in a collection.
 */
export const updateCollectionItem = (
  collection = [],
  itemId,
  field,
  value,
  idKey = "id"
) => {
  return collection.map((item) =>
    item[idKey] === itemId
      ? {
          ...item,
          [field]: value,
        }
      : item
  );
};

/**
 * Update multiple fields on an item.
 */
export const updateCollectionItemFields = (
  collection = [],
  itemId,
  fields,
  idKey = "id"
) => {
  return collection.map((item) =>
    item[idKey] === itemId
      ? {
          ...item,
          ...fields,
        }
      : item
  );
};

/**
 * Remove an item from a collection.
 */
export const removeCollectionItem = (
  collection = [],
  itemId,
  idKey = "id"
) => {
  return collection.filter(
    (item) => item[idKey] !== itemId
  );
};

/**
 * Find an item in a collection.
 */
export const findCollectionItem = (
  collection = [],
  itemId,
  idKey = "id"
) => {
  return collection.find(
    (item) => item[idKey] === itemId
  );
};

/**
 * Check whether an item exists.
 */
export const collectionHasItem = (
  collection = [],
  itemId,
  idKey = "id"
) => {
  return collection.some(
    (item) => item[idKey] === itemId
  );
};