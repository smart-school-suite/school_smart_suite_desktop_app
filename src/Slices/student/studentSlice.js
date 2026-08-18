import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  students: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedstudents: [],
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
        student_source: {
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

const studentslice = createSlice({
  name: "student",
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
    setSelectedstudents: (state, action) => {
      state.selectedstudents = action.payload;
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
      state.selectedstudents = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedstudents = [];
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
  setSelectedstudents,
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
} = studentslice.actions;

export default studentslice.reducer;

// Selectors
export const selectstudents = (state) => state.students.students;
export const selectstudentsData = (state) =>
  state.students.students?.data ?? [];
export const selectIsLoading = (state) => state.students.isLoading;
export const selectError = (state) => state.students.error;
export const selectSelectedstudents = (state) =>
  state.students.selectedstudents;
export const selectRowCount = (state) => state.students.rowCount;
export const selectSearchText = (state) => state.students.searchText;
export const selectColumns = (state) => state.students.columns;
export const selectAvailableColumns = (state) =>
  state.students.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.students.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectstudentsData],
  (students) => students?.length || 0,
);

export const selectFilteredstudents = createSelector(
  [selectstudentsData, selectSearchText],
  (students, searchText) => {
    if (!searchText) return students;
    return (
      students?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
