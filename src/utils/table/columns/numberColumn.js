import { baseColumn } from "./baseColumn";

export const numberColumn = (options = {}) =>
  baseColumn({
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    },
    cellDataType: "number",
    ...options,
  });
