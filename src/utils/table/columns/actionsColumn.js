import { baseColumn } from "./baseColumn";

export const actionsColumn = (options = {}) =>
  baseColumn({
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filter: false,
    editable: false,
    resizable: false,
    width: 100,
    pinned: "right",
    suppressMovable: true,
    lockPinned: true,
    ...options,
  });
