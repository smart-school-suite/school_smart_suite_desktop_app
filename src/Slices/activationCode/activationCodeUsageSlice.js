import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  studentAccounts: null,
  tableRef: null,
  selectedStudentAccounts: [],
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
  },
};

const activationCodeUsageSlice = createSlice({
  name: "activationCodeUsage",
  initialState,
  reducers: {
    setSelectedStudentAccounts: (state, action) => {
      state.selectedStudentAccounts = action.payload;
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
      state.selectedStudentAccounts = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedStudentAccounts = [];
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
  setSelectedStudentAccounts,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
} = activationCodeUsageSlice.actions;

export default activationCodeUsageSlice.reducer;
