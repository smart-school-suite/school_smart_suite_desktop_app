import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  AllowedLevelInstance,
  QualificationInstance,
} from "../../utils/instance/teacher/teacherInstance";
import { teacherInstanceMap } from "../../utils/maps/teacher/teacherInstanceMap";

const initialState = {
  tuitionFee: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedTuitionFees: [],
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
      },
      repeatableGroups: {
      },
    },
  },
};

const teacherSlice = createSlice({
  name: "tuitionFee",
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
    setSelectedTuitionFees: (state, action) => {
      state.selectedTuitionFees = action.payload;
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
      state.selectedTuitionFees = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTuitionFees = [];
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
    addRepeatableGroup: (state, action) => {
      const { field } = action.payload;
      const instanceConfig = teacherInstanceMap.find(
        (inst) => inst.key.toLowerCase() === field.toLowerCase(),
      );

      if (!instanceConfig) return;

      const group = state.import.mapping.repeatableGroups[field];
      if (!group || group.instances.length >= 5) return;

      group.instances.push({...instanceConfig.instance, id:uuidv4() });
    },
    removeRepeatableGroup: (state, action) => {
      const { id, field } = action.payload;
      const group = state.import.mapping.repeatableGroups[field];

      if (!group || group.instances.length <= 1) return;

      const index = group.instances.findIndex((i) => i.id === id);
      if (index !== -1) {
        group.instances.splice(index, 1);
      }
    },
    setRepeatableGroupValue: (state, action) => {
      const { field, value, id, group } = action.payload;
      const groupInstances =
        state.import.mapping.repeatableGroups[group].instances;
      const instance = groupInstances.find((gI) => gI.id === id).mapping;
      if (!instance) {
        return;
      }
      if (!instance[field]) {
        return;
      }
      instance[field].value = value;
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
  setSelectedTuitionFees,
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
  removeRepeatableGroup,
  addRepeatableGroup,
  setRepeatableGroupValue,
  setStandardGroupValue,
} = teacherSlice.actions;

export default teacherSlice.reducer;

// Selectors
export const selectTeachers = (state) => state.tuitionFee.tuitionFee;
export const selectTeachersData = (state) =>
  state.tuitionFee.tuitionFee?.data ?? [];
export const selectIsLoading = (state) => state.tuitionFee.isLoading;
export const selectError = (state) => state.tuitionFee.error;
export const selectSelectedTeachers = (state) =>
  state.tuitionFee.selectedTuitionFees;
export const selectRowCount = (state) => state.tuitionFee.rowCount;
export const selectSearchText = (state) => state.tuitionFee.searchText;
export const selectColumns = (state) => state.tuitionFee.columns;
export const selectAvailableColumns = (state) =>
  state.tuitionFee.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.tuitionFee.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectTeachersData],
  (tuitionFee) => tuitionFee?.length || 0,
);

export const selectFilteredTeachers = createSelector(
  [selectTeachersData, selectSearchText],
  (tuitionFee, searchText) => {
    if (!searchText) return tuitionFee;
    return (
      tuitionFee?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
