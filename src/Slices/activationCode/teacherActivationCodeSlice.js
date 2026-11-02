import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  teacherAccounts: null,
  tableRef: null,
  selectedTeacherAccounts: [],
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

const teacherActivationCodeSlice = createSlice({
  name: "teacherActivationCode",
  initialState,
  reducers: {
    setSelectedTeacherAccounts: (state, action) => {
      state.selectedTeacherAccounts = action.payload;
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
      state.selectedTeacherAccounts = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTeacherAccounts = [];
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
  setSelectedTeacherAccounts,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
} = teacherActivationCodeSlice.actions;

export default teacherActivationCodeSlice.reducer;
