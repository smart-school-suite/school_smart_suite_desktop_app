// utils/table/columns/dateColumn.js

import { format } from "date-fns";
import { baseColumn } from "./baseColumn";

export const dateColumn = ({
  format: dateFormat = "dd MMM yyyy",
  raw = false,
  valueFormatter,
  ...options
} = {}) =>
  baseColumn({
    filter: "agDateColumnFilter",
    cellDataType: "dateString",
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    },
    valueFormatter:
      valueFormatter ||
      ((params) => {
        const { value } = params;

        if (!value) return "";

        if (raw) {
          return value;
        }

        try {
          return format(new Date(value), dateFormat);
        } catch {
          return value;
        }
      }),

    ...options,
  });
