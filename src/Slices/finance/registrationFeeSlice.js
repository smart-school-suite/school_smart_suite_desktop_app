import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  registrationFees: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedRegistrationFees: [],
  rowCount: 0,
  searchText: "",
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
  customFilter: [],
  import: {
    status: "IDLE",
    selectedFile: null,
    headers: [],
    preview: [],
    mapping: {
      standardFields: {
      },
    },
  },
};

const registrationFeeSlice = createSlice({
  name: "registrationFee",
  initialState,
  reducers: {
    setImportStatus: (state, action) => {
      state.import.status = action.payload.status;
    },
    setImportSelectedFile: (state, action) => {
      state.import.selectedFile = action.payload.selectedFile;
    },
    setImportReset: (state) => {
      state.import = initialState.import;
    },
    setColumnMapping: (state, action) => {
      state.import.mapping = action.payload;
    },
    addCustomFilter: (state) => {
      state.customFilter.push({
        id: uuidv4(),
        column: null,
        match: null,
        value: null,
      });
    },
    resetAllCustomFilters: (state) => {
      state.customFilter = [];
    },
    removeCustomFilter: (state, action) => {
      const { id } = action.payload;
      state.customFilter = state.customFilter.filter((cf) => cf.id !== id);
    },
    setCustomFilter: (state, action) => {
      const { id, field, value } = action.payload;
      const customFilter = state.customFilter.find((cf) => cf.id === id);
      if (!customFilter) return;

      if (field === "column") customFilter.column = value;
      if (field === "match") customFilter.match = value;
      if (field === "value") customFilter.value = value;
    },
    setTableRef: (state, action) => {
      state.tableRef = action.payload.tableRef;
    },
    toggleGeneralFilter: (state) => {
      state.isGeneralFilterOpen = !state.isGeneralFilterOpen;
    },
    setSelectedRegistrationFees: (state, action) => {
      state.selectedRegistrationFees = action.payload;
    },
    setRowCount: (state, action) => {
      state.rowCount = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = {
        ...state.columns,
        ...action.payload,
      };
    },
    resetSelections: (state) => {
      state.selectedRegistrationFees = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedRegistrationFees = [];
      state.rowCount = 0;
      state.searchText = "";
      state.columns = {
        selectedColumns: [],
        availableColumns: [],
      };
    },
    updateAvailableColumns: (state, action) => {
      state.columns.availableColumns = action.payload;
    },
    updateSelectedColumns: (state, action) => {
      state.columns.selectedColumns = action.payload;
    },
    setStandardGroupValue: (state, action) => {
      const { field, value, automatched = false } = action.payload;
      const group = state.import.mapping.standardFields;

      if (!group[field]) {
        group[field] = { value: "", error: null, automatched: false };
      }

      group[field].value = value;
      group[field].automatched = automatched;
    },
  },
});

export const {
  addCustomFilter,
  removeCustomFilter,
  setCustomFilter,
  setSelectedRegistrationFees,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
  updateAvailableColumns,
  updateSelectedColumns,
  setTableRef,
  toggleGeneralFilter,
  resetAllCustomFilters,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  setStandardGroupValue
} = registrationFeeSlice.actions;

export default registrationFeeSlice.reducer;

// Selectors
export const selectregistrationFees = (state) => state.registrationFees.registrationFees;
export const selectRegistrationFeesData = (state) =>
  state.registrationFees.registrationFees?.data ?? [];
export const selectIsLoading = (state) => state.registrationFees.isLoading;
export const selectError = (state) => state.registrationFees.error;
export const selectSelectedregistrationFees = (state) =>
  state.registrationFees.selectedRegistrationFees;
export const selectRowCount = (state) => state.registrationFees.rowCount;
export const selectSearchText = (state) => state.registrationFees.searchText;
export const selectColumns = (state) => state.registrationFees.columns;
export const selectAvailableColumns = (state) =>
  state.registrationFees.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.registrationFees.columns.selectedColumns;

export const selectRegistrationFeeCount = createSelector(
  [selectRegistrationFeesData],
  (registrationFees) => registrationFees?.length || 0,
);

export const selectFilteredRegistrationFees = createSelector(
  [selectRegistrationFeesData, selectSearchText],
  (registrationFees, searchText) => {
    if (!searchText) return registrationFees;
    return (
      registrationFees?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
