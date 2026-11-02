import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  teacherTimePrefs: null,
  selectedTeacherTimePrefs: [],
  rowCount: 0,
  searchText: "",
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
  import: {
    status: "IDLE",
    selectedFile: null,
    mapping: {
      standardFields: {
        teacher: {
          value: "",
          error: null,
          automatched: false,
        },
        semester: {
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
        day: {
          value: "",
          error: null,
          automatched: false,
        },
        start_time: {
          value: "",
          error: null,
          automatched: false,
        },
        end_time: {
          value: "",
          error: null,
          automatched: false,
        },
      },
    },
  },
};

const teacherTimePrefSlice = createSlice({
  name: "teacherTimePref",
  initialState,
  reducers: {
    setImportStatus: (state, action) => {
      const { status } = action.payload;
      state.import.status = status;
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
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
    },
    setSelectedTeacherTimePrefs: (state, action) => {
      state.selectedTeacherTimePrefs = action.payload;
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
      state.selectedTeacherTimePrefs = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTeacherTimePrefs = [];
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
  setTeachers,
  setSelectedTeacherTimePrefs,
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
  setStandardGroupValue,
} = teacherTimePrefSlice.actions;

export default teacherTimePrefSlice.reducer;
