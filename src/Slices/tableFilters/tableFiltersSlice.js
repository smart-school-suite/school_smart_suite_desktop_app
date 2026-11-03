import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/**
 * Filter state for every data table in the app, keyed by a stable table key
 * (for example "students" or "tuition-fees"). Each table keeps its own entry,
 * so filters never leak between pages, and the slice is persisted so a page
 * reopens with the filters the user left it with.
 *
 * Entry shape:
 *   searchText      quick search across all columns
 *   chipFields      fields shown as quick-filter chips in the toolbar
 *   columnFilters   { [field]: { type, value } } set from the chips
 *   conditions      draft conditions in the filter panel
 *   applied         conditions currently applied to the grid
 *   logic           "and" | "or" for combining conditions
 *   panelOpen       whether the filter panel is open
 *   columnLayout    saved column order and visibility from the table
 *                   settings, as [{ colId, hide }], or null for the default
 */
export const createTableFilterEntry = () => ({
  searchText: "",
  chipFields: null,
  columnFilters: {},
  conditions: [],
  applied: [],
  logic: "and",
  appliedLogic: "and",
  panelOpen: false,
  columnLayout: null,
});

const newCondition = () => ({
  id: uuidv4(),
  field: null,
  match: null,
  value: null,
});

const entryFor = (state, tableKey) => {
  if (!state.byTable[tableKey]) {
    state.byTable[tableKey] = createTableFilterEntry();
  }
  return state.byTable[tableKey];
};

const tableFiltersSlice = createSlice({
  name: "tableFilters",
  initialState: { byTable: {} },
  reducers: {
    setSearchText(state, { payload: { tableKey, value } }) {
      entryFor(state, tableKey).searchText = value;
    },
    setChipFields(state, { payload: { tableKey, fields } }) {
      const entry = entryFor(state, tableKey);
      entry.chipFields = fields;
      // Drop filters for chips that are no longer shown.
      Object.keys(entry.columnFilters).forEach((field) => {
        if (!fields.includes(field)) delete entry.columnFilters[field];
      });
    },
    setColumnFilter(state, { payload: { tableKey, field, filter } }) {
      const entry = entryFor(state, tableKey);
      if (filter) entry.columnFilters[field] = filter;
      else delete entry.columnFilters[field];
    },
    togglePanel(state, { payload: { tableKey, open } }) {
      const entry = entryFor(state, tableKey);
      entry.panelOpen = open ?? !entry.panelOpen;
      if (entry.panelOpen && entry.conditions.length === 0) {
        entry.conditions = entry.applied.length
          ? entry.applied.map((condition) => ({ ...condition }))
          : [newCondition()];
      }
    },
    addCondition(state, { payload: { tableKey } }) {
      entryFor(state, tableKey).conditions.push(newCondition());
    },
    updateCondition(state, { payload: { tableKey, id, changes } }) {
      const condition = entryFor(state, tableKey).conditions.find(
        (item) => item.id === id,
      );
      if (condition) Object.assign(condition, changes);
    },
    removeCondition(state, { payload: { tableKey, id } }) {
      const entry = entryFor(state, tableKey);
      entry.conditions = entry.conditions.filter((item) => item.id !== id);
    },
    setLogic(state, { payload: { tableKey, logic } }) {
      entryFor(state, tableKey).logic = logic;
    },
    applyConditions(state, { payload: { tableKey, conditions } }) {
      const entry = entryFor(state, tableKey);
      entry.applied = conditions;
      entry.appliedLogic = entry.logic;
    },
    clearConditions(state, { payload: { tableKey } }) {
      const entry = entryFor(state, tableKey);
      entry.conditions = [newCondition()];
      entry.applied = [];
      entry.logic = "and";
      entry.appliedLogic = "and";
    },
    setColumnLayout(state, { payload: { tableKey, layout } }) {
      entryFor(state, tableKey).columnLayout = layout?.length
        ? layout.map(({ colId, hide }) => ({ colId, hide: Boolean(hide) }))
        : null;
    },
    resetTableFilters(state, { payload: { tableKey } }) {
      const entry = entryFor(state, tableKey);
      state.byTable[tableKey] = {
        ...createTableFilterEntry(),
        // Clearing filters must not throw away the user's column layout.
        columnLayout: entry.columnLayout ?? null,
        chipFields: entry.chipFields,
        panelOpen: entry.panelOpen,
        conditions: entry.panelOpen ? [newCondition()] : [],
      };
    },
  },
});

export const {
  setSearchText,
  setChipFields,
  setColumnFilter,
  togglePanel,
  addCondition,
  updateCondition,
  removeCondition,
  setLogic,
  applyConditions,
  clearConditions,
  resetTableFilters,
  setColumnLayout,
} = tableFiltersSlice.actions;

const EMPTY = createTableFilterEntry();
export const selectTableFilters = (tableKey) => (state) =>
  state.tableFilters?.byTable?.[tableKey] ?? EMPTY;

export default tableFiltersSlice.reducer;
