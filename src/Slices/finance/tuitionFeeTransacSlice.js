import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tuitionFeeTransactions: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedTransactions: [],
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
      repeatableGroups: {
      },
    },
  },
};

const tuitionFeeTransactionSlice = createSlice({
  name: "tuitionFeeTransactions",
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
    setSelectedTuitionFeeTransactions: (state, action) => {
      state.selectedTransactions = action.payload;
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
      state.selectedTransactions = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTransactions = [];
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
  setSelectedTuitionFeeTransactions,
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
  setStandardGroupValue,
} = tuitionFeeTransactionSlice.actions;

export default tuitionFeeTransactionSlice.reducer;

// Selectors
export const selectTeachers = (state) => state.tuitionFeeTransactions.tuitionFeeTransactions;
export const selectTeachersData = (state) =>
  state.tuitionFeeTransactions.tuitionFeeTransactions?.data ?? [];
export const selectIsLoading = (state) => state.tuitionFeeTransactions.isLoading;
export const selectError = (state) => state.tuitionFeeTransactions.error;
export const selectSelectedTeachers = (state) =>
  state.tuitionFeeTransactions.selectedTransactions;
export const selectRowCount = (state) => state.tuitionFeeTransactions.rowCount;
export const selectSearchText = (state) => state.tuitionFeeTransactions.searchText;
export const selectColumns = (state) => state.tuitionFeeTransactions.columns;
export const selectAvailableColumns = (state) =>
  state.tuitionFeeTransactions.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.tuitionFeeTransactions.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectTeachersData],
  (tuitionFeeTransactions) => tuitionFeeTransactions?.length || 0,
);

export const selectFilteredTeachers = createSelector(
  [selectTeachersData, selectSearchText],
  (tuitionFeeTransactions, searchText) => {
    if (!searchText) return tuitionFeeTransactions;
    return (
      tuitionFeeTransactions?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
