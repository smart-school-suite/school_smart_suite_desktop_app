import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  examInvigilators: null,
  tableRef: null,
  selectedInvigilators: [],
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
  selectedExam: null,
  selectedAcademicYear: null,
  assignInvigilator: {
    selectedInvigilator: [],
  },
};

const examInvigilatorSlice = createSlice({
  name: "examInvigilator",
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
    setSelectedExams: (state, action) => {
      state.selectedInvigilators = action.payload;
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
      state.selectedInvigilators = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedInvigilators = [];
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
    setSelectedExam: (state, action) => {
      const { exam } = action.payload;
      state.selectedExam = exam;
    },
    setSelectedAcademicYear: (state, action) => {
      const { academicYear } = action.payload;
      state.selectedAcademicYear = academicYear;
    },
    toggleInvigilator: (state, action) => {
      const { invigilator } = action.payload;
      const index = state.assignInvigilator.selectedInvigilator.findIndex(
        (item) =>
          item.actorable_id === invigilator.actorable_id &&
          item.actorable_type === invigilator.actorable_type,
      );

      if (index !== -1) {
        state.assignInvigilator.selectedInvigilator.splice(index, 1);
      } else {
        state.assignInvigilator.selectedInvigilator.push(invigilator);
      }
    },
    resetAssignInvigilatorState: (state, action) => {
      state.assignInvigilator = initialState.assignInvigilator;
    },
  },
});

export const {
  setTeachers,
  setSelectedExams,
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
  setSelectedExam,
  setSelectedAcademicYear,
  toggleInvigilator,
  resetAssignInvigilatorState
} = examInvigilatorSlice.actions;

export default examInvigilatorSlice.reducer;
