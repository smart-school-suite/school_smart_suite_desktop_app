import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  announcement: null,
  isGeneralFilterOpen: false,
  tableRef: null,
  selectedAnnouncements: [],
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
    mapping: {},
  },
  createAnnouncement: {
    isDirty: false,
    content: {
      category: {
        error: "",
        value: "",
      },
      label: {
        error: "",
        value: "",
      },
      title: {
        isValid: "",
        value: "",
      },
      content: {
        isValid: "",
        value: "",
      },
      tags: {
        value: [],
        error: "",
      },
    },
    audience: {
      types: [],
      targetingContext: null,
      targeting: {
        students: {
          mode: "criteria", // 'all' | 'criteria' | 'individuals'
          criteria: {
            departmentIds: [],
            specialtyIds: [],
            levelIds: [],
          },
          individualIds: [],
        },

        teachers: {
          mode: "all", // 'all' | 'criteria' | 'individuals'
          criteria: {
            departmentIds: [],
            specialtyIds: [],
            levelIds: [],
          },
          individualIds: [],
        },

        administrators: {
          mode: "all", // 'all' | 'individuals'
          individualIds: [],
        },
      },
    },
    publication: {
      type: "",
      schedule: {
        value: "",
        isValid: "",
      },
    },
  },
  updateContent: {
    isDirty: false,
    initial: {
      category: {
        error: "",
        value: "",
      },
      label: {
        error: "",
        value: "",
      },
      title: {
        isValid: "",
        value: "",
      },
      content: {
        isValid: "",
        value: "",
      },
      tags: {
        value: [],
        error: "",
      },
    },
    draft: {
      category: {
        error: "",
        value: "",
      },
      label: {
        error: "",
        value: "",
      },
      title: {
        isValid: "",
        value: "",
      },
      content: {
        isValid: "",
        value: "",
      },
      tags: {
        value: [],
        error: "",
      },
    },
  },
};

const announcementSlice = createSlice({
  name: "announcement",
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
    setTableRef: (state, action) => {
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
    },
    toggleGeneralFilter: (state) => {
      state.isGeneralFilterOpen = !state.isGeneralFilterOpen;
    },
    setSelectedAnnouncements: (state, action) => {
      state.selectedAnnouncements = action.payload;
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
      state.selectedAnnouncements = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedAnnouncements = [];
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
    setAnnouncementContent: (state, action) => {
      const { field, value, error, isValid, actionType } = action.payload;
      if (actionType === "updateContent") {
        const targetField = state[actionType].draft[field];
        if (!targetField) return;
        if (value !== undefined) targetField.value = value;
        if (error !== undefined) targetField.error = error;
        if (isValid !== undefined) targetField.isValid = isValid;
        state.updateContent.isDirty = hasFormChanged(
          state.updateContent.initial,
          state.updateContent.draft,
        );
        return;
      }
      const targetField = state[actionType].content[field];
      if (!targetField) return;
      if (value !== undefined) targetField.value = value;
      if (error !== undefined) targetField.error = error;
      if (isValid !== undefined) targetField.isValid = isValid;

      state.createAnnouncement.isDirty = true;
    },
    setAudienceType: (state, action) => {
      const { audienceType } = action.payload;
      const types = state.createAnnouncement.audience.types;
      if (audienceType === "school_wide") {
        state.createAnnouncement.audience.types = ["school_wide"];
        return;
      }
      const swIndex = types.indexOf("school_wide");
      if (swIndex !== -1) {
        types.splice(swIndex, 1);
      }
      const existingIndex = types.indexOf(audienceType);
      if (existingIndex !== -1) {
        types.splice(existingIndex, 1);
      } else {
        types.push(audienceType);
      }
    },
    setTargetingContext: (state, action) => {
      const { targetContext } = action.payload;
      state.createAnnouncement.audience.targetingContext = targetContext;
      return;
    },
    resetTargetingContext: (state, action) => {
      state.createAnnouncement.audience.targetingContext =
        initialState.createAnnouncement.audience.targetingContext;
    },
    setTargetMode: (state, action) => {
      const { targetGroup, mode } = action.payload;
      if (state.createAnnouncement.audience.targeting[targetGroup]) {
        state.createAnnouncement.audience.targeting[targetGroup].mode = mode;
      }
    },
    setTargetCriteria: (state, action) => {
      const { targetGroup, criteriaType, selectedIds } = action.payload;
      const group = state.createAnnouncement.audience.targeting[targetGroup];

      if (group && group.criteria && criteriaType in group.criteria) {
        group.criteria[criteriaType] = selectedIds;
      }
    },
    setTargetIndividuals: (state, action) => {
      const { targetGroup, selectedIds } = action.payload;
      const group = state.createAnnouncement.audience.targeting[targetGroup];

      if (group && "individualIds" in group) {
        group.individualIds = selectedIds;
      }
    },
    setTargetSelection: (state, action) => {
      const { targetGroup, targetKey, selectedIds } = action.payload;
      const group = state.createAnnouncement.audience.targeting[targetGroup];

      if (!group) return;

      if (targetKey === "individualIds") {
        group.individualIds = selectedIds;
      } else if (group.criteria && targetKey in group.criteria) {
        group.criteria[targetKey] = selectedIds;
      }
    },
    resetTargetGroup: (state, action) => {
      const { targetGroup } = action.payload;
      if (targetGroup === "administrators") {
        state.createAnnouncement.audience.targeting.administrators = {
          mode: "all",
          individualIds: [],
        };
      } else if (state.audience.targeting[targetGroup]) {
        state.createAnnouncement.audience.targeting[targetGroup] = {
          mode: "all",
          criteria: { departmentIds: [], specialtyIds: [], levelIds: [] },
          individualIds: [],
        };
      }
    },

    setPublicationType: (state, action) => {
      const { type } = action.payload;
      state.createAnnouncement.publication.type = type;
    },

    setPublicationValue: (state, action) => {
      const { field, value } = action.payload;
      state.createAnnouncement.publication.schedule[field] = value;
    },
    resetCreateAnnouncement: (state) => {
      state.createAnnouncement = initialState.createAnnouncement;
    },
    setUpdateContentInitial: (state, action) => {
      const { announcement } = action.payload;
      const formattedPayload = {
        category: {
          error: "",
          value: announcement?.announcement_category ?? "",
        },
        label: { error: "", value: announcement?.announcement_label ?? "" },
        title: { isValid: "", value: announcement?.title ?? "" },
        content: { isValid: "", value: announcement?.content ?? "" },
        tags: {
          value: announcement?.tags ? JSON.parse(announcement.tags) : [],
          error: "",
        },
      };
      state.updateContent.initial = formattedPayload;
      state.updateContent.draft = formattedPayload;
      state.updateContent.isDirty = false;
    },
    resetUpdateContent: (state) => {
      state.updateContent = initialState.updateContent;
    },
  },
});

export const {
  addCustomFilter,
  removeCustomFilter,
  setCustomFilter,
  setTeachers,
  setSelectedAnnouncements,
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
  setAnnouncementContent,
  setAudienceType,
  setTargetingContext,
  resetTargetingContext,
  resetTargetGroup,
  setTargetSelection,
  setTargetIndividuals,
  setTargetCriteria,
  setTargetMode,
  setPublicationType,
  setPublicationValue,
  resetCreateAnnouncement,
  setUpdateContentInitial,
  resetUpdateContent
} = announcementSlice.actions;

export default announcementSlice.reducer;

function hasFormChanged(initialObj, draftObj) {
  function extractComparableValue(field) {
    if (!field || field.value === undefined) return null;

    const val = field.value;

    if (val === null || typeof val !== 'object') {
      return val;
    }

    if (Array.isArray(val)) {
      return val
        .map(item => (item && typeof item === 'object' && item.id !== undefined ? item.id : item))
        .sort();
    }

    if (typeof val === 'object') {
      return val.id !== undefined ? val.id : val;
    }

    return val;
  }

  const keys = new Set([...Object.keys(initialObj || {}), ...Object.keys(draftObj || {})]);

  for (const key of keys) {
    const initialVal = extractComparableValue(initialObj[key]);
    const draftVal = extractComparableValue(draftObj[key]);

    if (JSON.stringify(initialVal) !== JSON.stringify(draftVal)) {
      return true;
    }
  }

  return false;
}
