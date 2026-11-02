import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  additionalFees: null,
  tableRef: null,
  selectedAdditionalFees: [],
  rowCount: 0,
  searchText: "",
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
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

const additionalFeeSlice = createSlice({
  name: "additionalFee",
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
    setTableRef: (state, action) => {
      state.tableRef = action.payload.tableRef;
    },
    setSelectedAdditionalFees: (state, action) => {
      state.selectedAdditionalFees = action.payload;
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
      state.selectedAdditionalFees = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedAdditionalFees = [];
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
  setSelectedAdditionalFees,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
  updateAvailableColumns,
  updateSelectedColumns,
  setTableRef,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  setStandardGroupValue
} = additionalFeeSlice.actions;

export default additionalFeeSlice.reducer;

// Selectors
export const selectadditionalFees = (state) => state.additionalFees.additionalFees;
export const selectAdditionalFeeData = (state) =>
  state.additionalFees.additionalFees?.data ?? [];
export const selectIsLoading = (state) => state.additionalFees.isLoading;
export const selectError = (state) => state.additionalFees.error;
export const selectSelectedadditionalFees = (state) =>
  state.additionalFees.selectedAdditionalFees;
export const selectRowCount = (state) => state.additionalFees.rowCount;
export const selectSearchText = (state) => state.additionalFees.searchText;
export const selectColumns = (state) => state.additionalFees.columns;
export const selectAvailableColumns = (state) =>
  state.additionalFees.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.additionalFees.columns.selectedColumns;

export const selectAdditionalFeeCount = createSelector(
  [selectAdditionalFeeData],
  (additionalFees) => additionalFees?.length || 0,
);

export const selectFilteredAdditionalFees = createSelector(
  [selectAdditionalFeeData, selectSearchText],
  (additionalFees, searchText) => {
    if (!searchText) return additionalFees;
    return (
      additionalFees?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
