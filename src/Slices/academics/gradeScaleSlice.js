import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  hasGradeScaleChanges,
  validateGradeScale,
} from "../../utils/gradeScale/gradeScaleHelpers";
const initialState = {
  gradeScales: null,
  tableRef: null,
  selectedGradeScales: [],
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
    configType: null,
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
    copyGrade: {
      sourceScale: null,
      targetScales: [],
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
    setTableRef: (state, action) => {
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
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
      const { data, maxScore, field, configType } = action.payload;
      state.gradeScale.configContext[field] = { ...data };
      if (field == "category") {
        state.gradeScale.draft.maximumScore = maxScore;
        state.gradeScale.initialconfig.maximumScore = data?.max_score || "";
        state.gradeScale.configType = configType;
        if (configType === "automatic") {
          state.gradeScale.isDirty = true;
        }
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
      if (
        field === "min_score" ||
        field === "max_score" ||
        field === "performance"
      ) {
        state.gradeScale.diagnostics = validateGradeScale(
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
    setCopyScaleValue: (state, action) => {
      const { field, value, actionType } = action.payload;
      if (field === "source") {
        state.gradeScale.copyGrade.sourceScale = value;
      }
      if (field === "target") {
        if (actionType === "bulkCopy") {
          state.gradeScale.copyGrade.targetScales = value;
        }
        state.gradeScale.copyGrade.targetScales.push(value);
      }
    },
    resetCopyScaleState: (state, action) => {
      state.gradeScale.copyGrade = initialState.gradeScale.copyGrade;
    },
  },
});

export const {
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
  resetCopyScaleState,
  setCopyScaleValue,
} = gradeScaleSlice.actions;

export default gradeScaleSlice.reducer;
