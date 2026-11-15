import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Multi-select state for card grids (the card equivalent of a table's
 * checkbox column). Selection is cleared whenever `resetKey` changes, e.g.
 * when another specialty or exam is picked, and items that disappear from
 * `items` (removed, filtered out by a refetch) drop out of the selection.
 */
export function useCardSelection(items, getId = (item) => item?.id, resetKey) {
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  useEffect(() => {
    setSelectedIds(new Set());
  }, [resetKey]);

  const byId = useMemo(() => {
    const map = new Map();
    (items ?? []).forEach((item) => map.set(getId(item), item));
    return map;
  }, [items]);

  const selectedItems = useMemo(
    () => [...selectedIds].filter((id) => byId.has(id)).map((id) => byId.get(id)),
    [selectedIds, byId],
  );

  const toggle = useCallback(
    (item) => {
      const id = getId(item);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [],
  );

  const selectAll = useCallback(
    (list) => setSelectedIds(new Set((list ?? []).map(getId))),
    [],
  );

  const clear = useCallback(() => setSelectedIds(new Set()), []);

  const isSelected = useCallback(
    (item) => selectedIds.has(getId(item)),
    [selectedIds],
  );

  return {
    selectedItems,
    count: selectedItems.length,
    isSelected,
    toggle,
    selectAll,
    clear,
  };
}
