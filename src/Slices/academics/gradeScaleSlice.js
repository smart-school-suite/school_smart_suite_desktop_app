import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  hasGradeScaleChanges,
  validateGradeRanges,
} from "../../utils/gradeScale/gradeScaleHelpers";
const initialState = {
  gradeScales: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedGradeScales: [],
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
    mapping: {
      standardFields: {
        grade_title: {
          value: "",
          error: null,
          automatched: false,
        },
        exam_type: {
          value: "",
          error: null,
          automatched: false,
        },
        grade_max_score: {
          value: "",
          error: null,
          automatched: false,
        },
        max_score: {
          value: "",
          error: null,
          automatched: false,
        },
        min_score: {
          value: "",
          error: null,
          automatched: false,
        },
        grade: {
          value: "",
          error: null,
          automatched: false,
        },
        result: {
          value: "",
          error: null,
          automatched: false,
        },
        resit_result: {
          value: "",
          error: null,
          automatched: false,
        },
        performance: {
          value: "",
          error: null,
          automatched: false,
        },
      },
    },
  },
  gradeScale: {
    isDirty: false,
    configContext: {
      category: {},
      scale: {},
    },
    initialconfig: {
      maximumScore: "",
      grades: {},
    },
    draft: {
      maximumScore: "",
      grades: {},
    },
    diagnostics: {
      isValid: null,
      conflicts: [],
      warnings: [],
    },
  },
};

const gradeScaleSlice = createSlice({
  name: "gradeScale",
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
    addCustomFilter: (state, action) => {
      const id = uuidv4();
      state.customFilter.push({
        id: id,
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
      const customFilterIndex = state.customFilter.findIndex(
        (cf) => cf.id === id,
      );
      state.customFilter.splice(customFilterIndex, 1);
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
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
    },
    toggleGeneralFilter: (state) => {
      state.isGeneralFilterOpen = !state.isGeneralFilterOpen;
    },
    setSelectedGradeScales: (state, action) => {
      state.selectedGradeScales = action.payload;
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
      state.selectedGradeScales = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedGradeScales = [];
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
    updatedGradeContext: (state, action) => {
      const { data, maxScore, field } = action.payload;
      state.gradeScale.configContext[field] = { ...data };
      if (field == "category") {
        state.gradeScale.draft.maximumScore = maxScore;
        state.gradeScale.initialconfig.maximumScore = data?.max_score || "";
      }
    },
    setGradeScaleLoadData: (state, action) => {
      const { value } = action.payload;
      state.gradeScale.initialconfig.grades = value;
      state.gradeScale.draft.grades = value;
    },
    setDraftFieldValue: (state, action) => {
      const { field, value, grade_id } = action.payload;
      const grade = state.gradeScale?.draft?.grades?.[grade_id];
      if (!grade || !grade[field]) {
        return;
      }
      grade[field].value = value;
      if (grade.is_configured === false) {
        grade.is_configured = true;
      }
      state.gradeScale.isDirty = hasGradeScaleChanges(
        state.gradeScale.initialconfig,
        state.gradeScale.draft,
      );
      if (field === "min_score" || field === "max_score") {
        state.gradeScale.diagnostics = validateGradeRanges(
          state.gradeScale.draft.grades,
          state.gradeScale.draft.maximumScore,
        );
      }
    },
    setDraftFieldValidation: (state, action) => {
      const { field, value, grade_id } = action.payload;
      if (state.gradeScale?.draft?.grades?.[grade_id]?.[field]) {
        state.gradeScale.draft.grades[grade_id][field].isValid = value;
      }
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
    resetScaleState: (state, action) => {
      state.gradeScale = initialState.gradeScale;
    },
  },
});

export const {
  addCustomFilter,
  removeCustomFilter,
  setCustomFilter,
  setTeachers,
  setSelectedGradeScales,
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
  updatedGradeContext,
  setGradeScaleLoadData,
  setDraftFieldValue,
  setDraftFieldValidation,
  setStandardGroupValue,
  resetScaleState,
} = gradeScaleSlice.actions;

export default gradeScaleSlice.reducer;
