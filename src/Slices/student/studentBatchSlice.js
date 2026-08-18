import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  studentBatches: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedstudentBatches: [],
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
        name: {
          value: "",
          error: null,
          automatched: false,
        },
        description: {
          value: "",
          error: null,
          automatched: false,
        }
      },
    },
  },
};

const studentBatchSlice = createSlice({
  name: "studentBatch",
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
    setSelectedstudentBatches: (state, action) => {
      state.selectedstudentBatches = action.payload;
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
      state.selectedstudentBatches = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedstudentBatches = [];
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
  setSelectedstudentBatches,
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
} = studentBatchSlice.actions;

export default studentBatchSlice.reducer;

// Selectors
export const selectstudentBatches = (state) => state.studentBatches.studentBatches;
export const selectstudentBatchesData = (state) =>
  state.studentBatches.studentBatches?.data ?? [];
export const selectIsLoading = (state) => state.studentBatches.isLoading;
export const selectError = (state) => state.studentBatches.error;
export const selectSelectedstudentBatches = (state) =>
  state.studentBatches.selectedstudentBatches;
export const selectRowCount = (state) => state.studentBatches.rowCount;
export const selectSearchText = (state) => state.studentBatches.searchText;
export const selectColumns = (state) => state.studentBatches.columns;
export const selectAvailableColumns = (state) =>
  state.studentBatches.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.studentBatches.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectstudentBatchesData],
  (studentBatches) => studentBatches?.length || 0,
);

export const selectFilteredstudentBatches = createSelector(
  [selectstudentBatchesData, selectSearchText],
  (studentBatches, searchText) => {
    if (!searchText) return studentBatches;
    return (
      studentBatches?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
