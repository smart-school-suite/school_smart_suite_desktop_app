import { baseColumn } from "./baseColumn";

export const textColumn = (options = {}) =>
  baseColumn({
    ...options,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    },
    cellDataType: 'text',
    filter: "agTextColumnFilter",
  });
