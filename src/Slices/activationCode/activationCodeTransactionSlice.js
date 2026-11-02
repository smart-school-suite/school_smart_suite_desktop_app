import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  transactions: null,
  tableRef: null,
  selectedTransactions: [],
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

const activationCodeTransactionSlice = createSlice({
  name: "activationCodeTransaction",
  initialState,
  reducers: {
    setSelectedTransactions: (state, action) => {
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
  },
});

export const {
  setSelectedTransactions,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
} = activationCodeTransactionSlice.actions;

export default activationCodeTransactionSlice.reducer;
