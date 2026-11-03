import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTableFilters,
  selectTableFilters,
  setColumnLayout,
  setSearchText,
  togglePanel,
} from "../../Slices/tableFilters/tableFiltersSlice";
import { buildPredicate, detectType, distinctValues } from "./filterEngine";

const SYSTEM_COLUMN = /^(ag-|action)/i;
const DEFAULT_CHIP_COUNT = 4;

const readPath = (row, field) =>
  field.includes(".")
    ? field.split(".").reduce((value, key) => value?.[key], row)
    : row?.[field];

/**
 * Everything a data table page needs for search and filtering.
 *
 *   const filters = useTableFilters("students", tableRef);
 *   <TableToolbar filters={filters} ... />
 *   <Table ref={tableRef} {...filters.gridProps} ... />
 *
 * State lives in the persisted `tableFilters` slice under `tableKey`, so each
 * table keeps its own search, chips and conditions across navigation and
 * restarts. Column metadata (names, detected types, distinct values) is read
 * from the grid whenever its rows change. The column layout chosen in the
 * table settings (order and visibility) is kept in the same entry and handed
 * to <Table> as `columnState`, which re-applies it whenever columns load.
 */
export function useTableFilters(tableKey, tableRef) {
  const dispatch = useDispatch();
  const state = useSelector(selectTableFilters(tableKey));
  const [columns, setColumns] = useState([]);
  const [api, setApi] = useState(null);

  const refreshColumns = useCallback((gridApi) => {
    if (!gridApi) return;
    const rows = [];
    gridApi.forEachNode((node) => node.data && rows.push(node.data));
    const next = (gridApi.getColumns() ?? [])
      .map((column) => column.getColDef())
      .filter(
        (colDef) =>
          colDef.field &&
          !SYSTEM_COLUMN.test(colDef.field) &&
          !SYSTEM_COLUMN.test(colDef.colId ?? ""),
      )
      .map((colDef) => {
        const values = rows.map((row) => readPath(row, colDef.field));
        const type = detectType(values, colDef.cellDataType);
        return {
          field: colDef.field,
          headerName: colDef.headerName ?? colDef.field,
          type,
          options: type === "text" ? distinctValues(values) : null,
        };
      });
    setColumns(next);
  }, []);

  const onGridReady = useCallback(
    (params) => {
      setApi(params.api);
      refreshColumns(params.api);
    },
    [refreshColumns],
  );

  const onRowDataUpdated = useCallback(
    (params) => refreshColumns(params.api),
    [refreshColumns],
  );

  const columnsByField = useMemo(
    () => Object.fromEntries(columns.map((column) => [column.field, column])),
    [columns],
  );
  const typeOf = useCallback(
    (field) => columnsByField[field]?.type ?? "text",
    [columnsByField],
  );

  const externalFilter = useMemo(() => {
    const predicate = buildPredicate({
      columnFilters: state.columnFilters,
      conditions: state.applied,
      logic: state.appliedLogic,
      getValue: (row, field) => readPath(row, field),
      typeOf,
    });
    return predicate ? (node) => predicate(node.data) : null;
  }, [state.columnFilters, state.applied, state.appliedLogic, typeOf]);

  /** Count rows a draft set of conditions would keep, for live previews. */
  const countMatching = useCallback(
    ({ columnFilters = state.columnFilters, conditions, logic }) => {
      const gridApi = api ?? tableRef?.current?.getGridApi?.();
      if (!gridApi) return { matching: 0, total: 0 };
      const predicate = buildPredicate({
        columnFilters,
        conditions,
        logic,
        getValue: readPath,
        typeOf,
      });
      let total = 0;
      let matching = 0;
      gridApi.forEachNode((node) => {
        if (!node.data) return;
        total += 1;
        if (!predicate || predicate(node.data)) matching += 1;
      });
      return { matching, total };
    },
    [api, tableRef, state.columnFilters, typeOf],
  );

  const chipFields =
    state.chipFields ??
    columns.slice(0, DEFAULT_CHIP_COUNT).map((column) => column.field);

  const activeCount =
    Object.keys(state.columnFilters).length +
    state.applied.length +
    (state.searchText ? 1 : 0);

  return {
    tableKey,
    state,
    columns,
    columnsByField,
    chipFields: chipFields.filter((field) => columnsByField[field]),
    activeCount,
    countMatching,
    setSearch: (value) => dispatch(setSearchText({ tableKey, value })),
    togglePanel: (open) => dispatch(togglePanel({ tableKey, open })),
    reset: () => dispatch(resetTableFilters({ tableKey })),
    columnLayout: state.columnLayout ?? null,
    saveColumnLayout: (layout) =>
      dispatch(setColumnLayout({ tableKey, layout })),
    resetColumnLayout: () =>
      dispatch(setColumnLayout({ tableKey, layout: null })),
    gridProps: {
      columnState: state.columnLayout ?? null,
      quickFilterText: state.searchText,
      externalFilter,
      onGridReady,
      onRowDataUpdated,
    },
  };
}

export default useTableFilters;
