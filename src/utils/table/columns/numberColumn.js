import { baseColumn } from "./baseColumn";

export const numberColumn = (options = {}) =>
  baseColumn({
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    cellStyle: {
      textAlign: "right",
    },
    cellDataType: "number",
    ...options,
  });
