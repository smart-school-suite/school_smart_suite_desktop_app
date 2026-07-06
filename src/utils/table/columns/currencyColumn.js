import CurrencyComponent from "../../../components/DataTableComponents/CurrencyComponent";
import { baseColumn } from "./baseColumn";

export const currentColumn = (options = {}) =>
  baseColumn({
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    cellRenderer: CurrencyComponent,
  });
