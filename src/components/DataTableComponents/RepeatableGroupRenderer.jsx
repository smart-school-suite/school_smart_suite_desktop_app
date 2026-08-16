function RepeatableGroupRenderer({
  value = [],
  displayFields = [],
  maxVisible = 2,
  itemSeparator = " · ",
  groupSeparator = ", ",
}) {
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <span className="text-muted font-size-sm">
        —
      </span>
    );
  }

  const getItemSummary = (item) => {
    const values = displayFields
      .map((field) => item?.[field])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
      )
      .map(String);

    if (values.length > 0) {
      return values.join(itemSeparator);
    }

    // Generic fallback
    const fallbackValues = Object.values(item)
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
      )
      .map(String);

    return fallbackValues.join(itemSeparator);
  };

  const summaries = value
    .map(getItemSummary)
    .filter(Boolean);

  const visible = summaries.slice(0, maxVisible);
  const remaining = summaries.length - visible.length;

  return (
    <span
      className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm"
      title={summaries.join(groupSeparator)}
    >
      {visible.join(groupSeparator)}

      {remaining > 0 && (
        <span className="text-muted ms-1">
          +{remaining}
        </span>
      )}
    </span>
  );
}

export default RepeatableGroupRenderer;