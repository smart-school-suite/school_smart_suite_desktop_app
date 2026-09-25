import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  studentAccounts: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedStudentAccounts: [],
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
  },
};

const studentActivationCodeSlice = createSlice({
  name: "studentActivationCode",
  initialState,
  reducers: {
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
    toggleGeneralFilter: (state) => {
      state.isGeneralFilterOpen = !state.isGeneralFilterOpen;
    },
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
  addCustomFilter,
  removeCustomFilter,
  setCustomFilter,
  setSelectedStudentAccounts,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
  toggleGeneralFilter,
  resetAllCustomFilters,
} = studentActivationCodeSlice.actions;

export default studentActivationCodeSlice.reducer;
