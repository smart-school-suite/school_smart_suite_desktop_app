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
| Tooltip (hover hint only) | `components/Tooltips/Tooltip` |
| Click-to-open list / small panel | `components/Popover/Popover` |
| Dialog | `ModalButton` (`components/DataTableComponents/ActionComponent`) + content in `src/ModalContent/` |
| Teacher summary / full profile | `components/Card/TeacherCard` / `ModalContent/Teacher/TeacherQuickView` |
| Pick teachers from a list (all states built in) | `components/Teacher/TeacherSelectList` |
| Course summary | `components/Card/CourseCard` (+ `CourseStatusPill`), drawer header `DrawerContent/Course/CourseSummary` |
| One line of chips with a "+N" popover | `components/Card/ChipRow` |
| Teacher course/specialty counts | `components/Card/TeacherStats` |
| Confirmation dialog (title, copy, optional fields, error banner) | `components/Modals/ConfirmDialog` |
| Multi-step drawer step bar | `components/Wizard/WizardStepBar` |
| Status label with tone (and live pulse) | `components/Election/StatusPill` |
| Person (student, teacher, admin) avatar + name + type | `components/Election/ParticipantIdentity` |
| Pick one student, teacher or administrator | `components/Election/PersonPicker` |
| KPI tile / white panel with header | `components/Election/StatTile` / `components/Election/SectionCard` |
| Who-can-vote / who-can-apply audience picker | `components/Election/ParticipantAudiencePicker` |
| Election card, lifecycle timeline, vote share bar, office holder card | `components/Election/*` |

Only create a new component when nothing reusable exists, and put it in
`src/components/` so the next page can use it. Pieces that only one page
will ever use can live in that page's file.

## 2. Shared logic lives in hooks and utils

- Generic hooks go in `src/hooks/common/` (e.g. `useDebounce`,
  `useEscapeKey`). Do not
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

For teacher pickers, `TeacherSelectList` already renders states 2 to 6; pass
it the `empty` copy. `useSpecialtyTeachersEmptyState` builds that copy for
"teachers of a specialty" lists, telling "no teachers created yet" apart
from "none assigned to this specialty".

Mascots are small and centred: pass `height="100%"` and a small
`mascotHeight` (`6rem` to `7rem`).

Some endpoints answer **404 for an empty list**. Treat that as state 4, not
state 3, and do not retry it (`isEmptyListError` / `retryUnlessEmpty`).

## 6. Cards stay the same size; details open on demand

Cards are summaries. They never grow or expand in place, because one tall
card stretches its whole grid row and breaks scanning. Use three layers:

1. **Card**: fixed size.
   - Auto-fill grid (`.teacher-card-grid`) with `align-items: stretch` and
     cards at `height: 100%`; footers pushed down with `margin-top: auto`.
   - Chip rows are one line with a cap (`MAX_CHIPS`).
   - Long text is truncated to one line with the full value in `title`.
2. **Popover** for "more of the same": the `+N` chip is a button that opens
   `Popover` with the full list. Use a popover, not a hover tooltip, for
   anything the user needs to read; tooltips can't be reached by keyboard.
3. **Dialog** for the full record: a "View details" button opens a
   `ModalContent` component through `ModalButton`, showing everything the
   card can't (e.g. institution and year per qualification). Pass the data
   the card already has as `rowData` so it opens instantly.

Avoid a second drawer on top of a drawer; use a dialog.

### Popovers and dialogs inside cards and drawers

- React events from portalled content still bubble through the React tree.
  Stop click/keydown propagation at the boundary so using a popover or
  dialog never toggles the card's selection (`Popover` does this itself;
  wrap `ModalButton` in an element that stops propagation).
- A selectable card only reacts to Enter/Space when the card itself has
  focus (`event.target === event.currentTarget`), so buttons inside it work.
- Drawers close on Escape. Popovers and dialogs use `useEscapeKey` so Escape
  closes only the top layer.

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
