import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  activationCodes: null,
  tableRef: null,
  selectedActivationCodes: [],
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
  purchaseCode: {
     
  }
};

const activationCodeSlice = createSlice({
  name: "activationCode",
  initialState,
  reducers: {
    setSelectedActivationCodes: (state, action) => {
      state.selectedActivationCodes = action.payload;
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
      state.selectedActivationCodes = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedActivationCodes = [];
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
    setPurchaseCodeContext: (state, action) => {
       const { context } = action.payload;
       state.purchaseCode = context;
    },
    resetPurchaseCodeState: (state, action) => {
       state.purchaseCode = initialState.purchaseCode;
    }
  },
});

export const {
  setPurchaseCodeContext,
  resetPurchaseCodeState,
  setSelectedActivationCodes,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
} = activationCodeSlice.actions;

export default activationCodeSlice.reducer;
