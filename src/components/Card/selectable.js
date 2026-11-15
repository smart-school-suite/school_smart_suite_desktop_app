// Shared click/keyboard wiring for cards that can be picked for bulk actions,
// matching TeacherCard's selectable behaviour.

export const stopPropagation = (event) => event.stopPropagation();

export function selectableCardProps({ item, selected, onSelect }) {
  if (typeof onSelect !== "function") return { className: "", props: {} };
  return {
    className: `teacher-card--selectable ${selected ? "teacher-card--selected" : ""}`,
    props: {
      role: "button",
      tabIndex: 0,
      "aria-pressed": selected,
      onClick: () => onSelect(item),
      onKeyDown: (event) => {
        // only when the card itself has focus, not a button inside it
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item);
        }
      },
    },
  };
}
