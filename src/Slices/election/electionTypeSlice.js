import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  electionTypes: null,
  tableRef: null,
  selectedTypes: [],
  rowCount: 0,
  searchText: "",
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
  import: {
    status: "IDLE",
    selectedFile: null,
    mapping: {},
  },
};

const electionTypeSlice = createSlice({
  name: "electionType",
  initialState,
  reducers: {
    setImportStatus: (state, action) => {
      const { status } = action.payload;
      state.import.status = status;
    },
    setImportSelectedFile: (state, action) => {
      const { selectedFile } = action.payload;
      state.import.selectedFile = selectedFile;
    },
    setImportReset: (state, action) => {
      state.import = {
        status: "IDLE",
        selectedFile: null,
      };
    },
    setColumnMapping: (state, action) => {
      state.import.mapping = action.payload;
    },
    setTableRef: (state, action) => {
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
    },
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
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
      state.selectedTypes = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTypes = [];
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
  },
});

export const {
  setTeachers,
  setSelectedTypes,
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
  setColumnMapping
} = electionTypeSlice.actions;

export default electionTypeSlice.reducer;
