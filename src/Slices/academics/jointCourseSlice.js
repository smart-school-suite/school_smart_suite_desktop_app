import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  courseTypeInstance,
  specialtyInstance,
} from "../../utils/instance/course/jointCourseInstance";
import { jointCourseInstanceMap } from "../../utils/maps/course/jointCourseInstanceMap";
const initialState = {
  jointCourses: null,
  isGeneralFilterOpen: false,
  selectedJointCourses: [],
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
        course_code: {
          value: "",
          error: null,
          automatched: false,
        },
        course_credit: {
          value: "",
          error: null,
          automatched: false,
        },
        course_title: {
          value: "",
          error: null,
          automatched: false,
        },
        description: {
          value: "",
          error: null,
          automatched: false,
        },
        semester: {
          value: "",
          error: null,
          automatched: false,
        },
      },
      repeatableGroups: {
        course_types: {
          instances: [courseTypeInstance],
        },
        specialties: {
          instances: [specialtyInstance],
        },
      },
    },
  },
};

const jointCourseSlice = createSlice({
  name: "jointCourse",
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
      const myId = uuidv4();
      state.customFilter.push({
        id: myId,
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
    toggleGeneralFilter: (state) => {
      state.isGeneralFilterOpen = !state.isGeneralFilterOpen;
    },
    setSelectedJointCourses: (state, action) => {
      state.selectedJointCourses = action.payload;
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
      state.selectedJointCourses = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedJointCourses = [];
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
      const instanceConfig = jointCourseInstanceMap.find(
        (inst) => inst.key.toLowerCase() === field.toLowerCase(),
      );

      if (!instanceConfig) return;

      const group = state.import.mapping.repeatableGroups[field];
      if (!group || group.instances.length >= 5) return;

      group.instances.push({ ...instanceConfig.instance, id: uuidv4() });
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
  setTeachers,
  setSelectedJointCourses,
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
} = jointCourseSlice.actions;

export default jointCourseSlice.reducer;
