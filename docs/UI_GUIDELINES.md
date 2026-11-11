# UI & Component Guidelines

How we build UI in the desktop app so it stays consistent and scales.
The teacher specialty page (`src/pages/Administrators/TeacherSpecialty.jsx`)
and its assign drawer (`src/DrawerContent/TeacherSpecialty/AssignTeacherSpecialty.jsx`)
are the reference implementation.

## 1. Reuse components before writing markup

Look in `src/components/` first. Use what exists, even if a page needs a
small variation; add a prop to the shared component rather than copying it.

| Need | Use |
| --- | --- |
| Empty, error or "nothing selected" fallback | `components/errors/EmptyState` (+ `EmptyStateButton`) |
| Search field | `components/input/search` (`SearchInput`) |
| Loading placeholder | `components/SkeletonPageLoader/RectangularSkeleton` |
| Drawer | `components/drawer/DrawerTrigger` |
| Form errors | `components/errors/FormErrorBanner` + `hooks/form/useFormError` |
| Tooltip | `components/Tooltips/Tooltip` |
| Teacher summary | `components/Card/TeacherCard` |

Only create a new component when nothing reusable exists, and put it in
`src/components/` so the next page can use it. Pieces that only one page
will ever use can live in that page's file.

## 2. Shared logic lives in hooks and utils

- Generic hooks go in `src/hooks/common/` (e.g. `useDebounce`). Do not
  redefine helpers like `useDebounce` inside a component file.
- Domain helpers go in `src/utils/<domain>/` (e.g.
  `utils/teacher/teacherFilters.js` for search and empty-list handling).
- Data hooks accept an optional `options` argument for react-query options
  instead of being copied for a new use case.

## 3. Styling

- **Do not create new stylesheet files.** Use the classes in
  `src/styles/utility.css` (spacing, colours, `text-iron-*`, `primary-*`,
  `font-size-*`, `scroll-bar-sm`, …) and Bootstrap utilities.
- If a style cannot be expressed with utilities (hover, focus, selected
  states, grid templates), add a small, prefixed block to
  `src/styles/global.css` (e.g. `.teacher-card*`). Keep this rare.
- Use the colour variables (`--primary-color-*`, `--iron-*`), not hex codes.
- Keep inline `style` for one-off values only (a width, a min-height).

## 4. Layout, height and scrolling

- Never cap content with fixed viewport heights like `maxHeight: "75dvh"`.
- Layouts already give the page a bounded height. Make the page `h-100`,
  keep toolbars `flex-shrink-0`, and make exactly one region scroll:

  ```jsx
  <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto" style={{ minHeight: 0 }}>
  ```

- In drawers, fixed headers (summary, search) sit outside `.drawer-content`;
  only the list goes inside it; actions go in `.drawer-footer`.

## 5. Every list handles every state

Each list or grid renders one of these, checked in this order:

1. **Nothing selected yet**: `EmptyState mascot="empty"` explaining what to do.
2. **Loading**: skeletons in the same grid as the real content.
3. **Error**: `EmptyState mascot="error"` with the server's title and description.
4. **Empty**: `EmptyState mascot="sad"` with an action (e.g. "Assign Teacher").
   When it matters, say *why* it is empty (e.g. "no teachers created yet" vs
   "all eligible teachers already assigned") and link to the fix.
5. **No search results**: `EmptyState mascot="notFound"` with "Clear search".
6. **Content.**

Mascots are small and centred: pass `height="100%"` and a small
`mascotHeight` (`6rem` to `7rem`).

Some endpoints answer **404 for an empty list**. Treat that as state 4, not
state 3, and do not retry it (`isEmptyListError` / `retryUnlessEmpty`).

## 6. Cards stay the same size

Cards in a grid must not grow with their data:

- Use an auto-fill grid (`.teacher-card-grid`) with `align-items: stretch`
  and cards at `height: 100%`.
- Chip rows are one line with a cap (`MAX_CHIPS`); the rest collapse into a
  `+N` chip whose tooltip lists them.
- Long text is truncated to one line with the full value in `title`.
- Footers are pushed to the bottom (`margin-top: auto`) so they line up.

## 7. Search and selection

- Every search box filters something. Debounce it (`useDebounce`, ~250ms) and
  match every word of the query against all visible fields.
- Disable search when there is nothing to search; show "X of Y" counts.
- Don't add a Filter button when search already covers the need.
- Selectable cards are keyboard accessible (`role="button"`, `tabIndex`,
  Enter/Space, `aria-pressed`). Keep selection in a `Set`, offer
  Select all / Deselect all for the visible items, show "N selected", disable
  the primary action until something is selected, and clear the selection
  after success.
