import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  parents: null,
  tableRef: null,
  selectedParents: [],
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
        email: {
          value: "",
          error: null,
          automatched: false,
        },
        full_names: {
          value: "",
          error: null,
          automatched: false,
        },
        first_name: {
          value: "",
          error: null,
          automatched: false,
        },
        last_name: {
          value: "",
          error: null,
          automatched: false,
        },
        phone: {
          value: "",
          error: null,
          automatched: false,
        },
        gender: {
          value: "",
          error: null,
          automatched: false,
        },
        specialty: {
          value: "",
          error: null,
          automatched: false,
        },
        level: {
          value: "",
          error: null,
          automatched: false,
        },
        batch: {
          value: "",
          error: null,
          automatched: false,
        },
        relationship: {
          value: "",
          error: null,
          automatched: false,
        },
        parent_source: {
          value: "",
          error: null,
          automatched: false,
        },
        dob: {
          value: "",
          error: null,
          automatched: false,
        },
        fee_payment_format: {
          value: "",
          error: null,
          automatched: false,
        },
        guardian: {
           value: "",
           error: null,
           automatched: false
        }
      },
    },
  },
};

const parentslice = createSlice({
  name: "parent",
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
    setSelectedParents: (state, action) => {
      state.selectedParents = action.payload;
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
      state.selectedParents = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedParents = [];
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
  setSelectedParents,
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
} = parentslice.actions;

export default parentslice.reducer;

// Selectors
export const selectparents = (state) => state.parents.parents;
export const selectparentsData = (state) =>
  state.parents.parents?.data ?? [];
export const selectIsLoading = (state) => state.parents.isLoading;
export const selectError = (state) => state.parents.error;
export const selectSelectedParents = (state) =>
  state.parents.selectedParents;
export const selectRowCount = (state) => state.parents.rowCount;
export const selectSearchText = (state) => state.parents.searchText;
export const selectColumns = (state) => state.parents.columns;
export const selectAvailableColumns = (state) =>
  state.parents.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.parents.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectparentsData],
  (parents) => parents?.length || 0,
);

export const selectFilteredparents = createSelector(
  [selectparentsData, selectSearchText],
  (parents, searchText) => {
    if (!searchText) return parents;
    return (
      parents?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
