import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  draftAnnouncements: null,
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
  updateDraftAnnouncement: {
    isDirty: false,
    initial: {
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
    draft: {
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
  },
};

const draftAnnouncementSlice = createSlice({
  name: "draftAnnouncement",
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

    setUpdateDraftContentInitial: (state, action) => {
      const { announcement } = action.payload;
      if (!announcement) return;

      const parseJson = (data, fallback) => {
        if (!data) return fallback;
        if (typeof data === "object") return data;
        try {
          return JSON.parse(data);
        } catch (e) {
          return fallback;
        }
      };

      const audience = parseJson(announcement.audience, {});
      const tags = parseJson(announcement.tags, []);

      // Safe checks for object vs array structure
      const studentAudience = Array.isArray(audience?.student_audience)
        ? audience.student_audience[0]
        : audience?.student_audience || {};

      const teacherAudience = Array.isArray(audience?.teacher_audience)
        ? audience.teacher_audience[0]
        : audience?.teacher_audience || {};

      const adminAudience = Array.isArray(audience?.admin_audience)
        ? audience.admin_audience[0]
        : audience?.admin_audience || {};

      // Extract arrays safely
      const studentDepts = studentAudience.department_ids || [];
      const studentSpecs = studentAudience.specialty_ids || [];
      const studentLevels = studentAudience.level_ids || [];
      const studentInds = studentAudience.individual_ids || [];

      const teacherDepts = teacherAudience.department_ids || [];
      const teacherSpecs = teacherAudience.specialty_ids || [];
      const teacherLevels = teacherAudience.level_ids || [];
      const teacherInds = teacherAudience.individual_ids || [];

      const adminInds = adminAudience.individual_ids || [];

      // Compute audience types
      const computedTypes = [];

      // If student mode is 'all' OR criteria/individuals exist
      const hasStudents =
        studentAudience.mode === "all" ||
        studentDepts.length > 0 ||
        studentSpecs.length > 0 ||
        studentLevels.length > 0 ||
        studentInds.length > 0;

      if (hasStudents) computedTypes.push("students");

      const hasTeachers =
        teacherAudience.mode === "all" ||
        teacherDepts.length > 0 ||
        teacherSpecs.length > 0 ||
        teacherLevels.length > 0 ||
        teacherInds.length > 0;

      if (hasTeachers) computedTypes.push("teachers");

      const hasAdmins = adminAudience.mode === "all" || adminInds.length > 0;

      if (hasAdmins) computedTypes.push("schoolAdmins");

      // Construct payload structure
      const buildPayload = () => ({
        content: {
          category: {
            error: "",
            value: announcement?.announcement_category ?? "",
          },
          label: { error: "", value: announcement?.announcement_label ?? "" },
          title: { isValid: "", value: announcement?.title ?? "" },
          content: { isValid: "", value: announcement?.content ?? "" },
          tags: {
            value: tags,
            error: "",
          },
        },
        audience: {
          types: computedTypes,
          targetingContext: null,
          targeting: {
            students: {
              mode: studentAudience.mode || "criteria",
              criteria: {
                departmentIds: studentDepts,
                specialtyIds: studentSpecs,
                levelIds: studentLevels,
              },
              individualIds: studentInds,
            },
            teachers: {
              mode: teacherAudience.mode || "all",
              criteria: {
                departmentIds: teacherDepts,
                specialtyIds: teacherSpecs,
                levelIds: teacherLevels,
              },
              individualIds: teacherInds,
            },
            administrators: {
              mode: adminAudience.mode || "all",
              individualIds: adminInds,
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
      });

      // Mutate draft properties directly so Immer registers updates properly
      state.updateDraftAnnouncement.initial = buildPayload();
      state.updateDraftAnnouncement.draft = buildPayload();
      state.updateDraftAnnouncement.isDirty = false;
    },

    resetUpdateDraftState: (state) => {
      state.updateDraftAnnouncement = initialState.updateDraftAnnouncement;
    },
    setAnnouncementContent: (state, action) => {
      const { field, value, error, isValid } = action.payload;
      const targetField = state.updateDraftAnnouncement.draft.content[field];
      if (!targetField) return;
      if (value !== undefined) targetField.value = value;
      if (error !== undefined) targetField.error = error;
      if (isValid !== undefined) targetField.isValid = isValid;

      state.updateDraftAnnouncement.isDirty = hasChange(
        state.updateDraftAnnouncement.initial,
        state.updateDraftAnnouncement.draft,
      );
    },

    setAudienceType: (state, action) => {
      const { audienceType } = action.payload;
      console.log(audienceType)
      const types = state.updateDraftAnnouncement.draft.audience.types;
      if (audienceType === "school_wide") {
        state.updateDraftAnnouncement.draft.audience.types = ["school_wide"];
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
      state.updateDraftAnnouncement.draft.audience.targetingContext = targetContext;
      return;
    },

    resetTargetingContext: (state) => {
      state.updateDraftAnnouncement.draft.audience.targetingContext = null;
    },

    setTargetMode: (state, action) => {
      const { targetGroup, mode } = action.payload;
      if (state.updateDraftAnnouncement.draft.targeting[targetGroup]) {
        state.updateDraftAnnouncement.draft.targeting[targetGroup].mode = mode;
      }
    },
    setTargetCriteria: (state, action) => {
      const { targetGroup, criteriaType, selectedIds } = action.payload;
      const group = state.updateDraftAnnouncement.draft.targeting[targetGroup];

      if (group && group.criteria && criteriaType in group.criteria) {
        group.criteria[criteriaType] = selectedIds;
      }
    },
    setTargetIndividuals: (state, action) => {
      const { targetGroup, selectedIds } = action.payload;
      const group = state.updateDraftAnnouncement.draft.targeting[targetGroup];

      if (group && "individualIds" in group) {
        group.individualIds = selectedIds;
      }
    },
    setTargetSelection: (state, action) => {
      const { targetGroup, targetKey, selectedIds } = action.payload;
      const group = state.updateDraftAnnouncement.draft.targeting[targetGroup];

      if (!group) return;

      if (targetKey === "individualIds") {
        group.individualIds = selectedIds;
      } else if (group.criteria && targetKey in group.criteria) {
        group.criteria[targetKey] = selectedIds;
      }
    },

    resetTargetGroup: (state, action) => {
      const { targetGroup } = action.payload;
      const targeting = state.updateDraftAnnouncement.draft.audience.targeting;

      if (targetGroup === "administrators") {
        targeting.administrators = {
          mode: "all",
          individualIds: [],
        };
      } else if (targeting[targetGroup]) {
        targeting[targetGroup] = {
          mode: "all",
          criteria: { departmentIds: [], specialtyIds: [], levelIds: [] },
          individualIds: [],
        };
      }
    },

    setPublicationType: (state, action) => {
      const { type } = action.payload;
      state.updateDraftAnnouncement.draft.publication.type = type;
    },

    setPublicationValue: (state, action) => {
      const { field, value } = action.payload;
      state.updateDraftAnnouncement.draft.publication.schedule[field] = value;
    },
  },
});

export const {
  addCustomFilter,
  removeCustomFilter,
  setCustomFilter,
  setAnnouncements,
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
  setUpdateDraftContentInitial,
  resetUpdateDraftState,
  setPublicationType,
  setPublicationValue,
  resetTargetGroup,
  setTargetSelection,
  setTargetIndividuals,
  setTargetCriteria,
  setTargetMode,
  setAudienceType,
  setTargetingContext,
  resetTargetingContext,
  setAnnouncementContent,
} = draftAnnouncementSlice.actions;

export default draftAnnouncementSlice.reducer;

const IGNORED_KEYS = new Set(["error", "isValid", "targetingContext"]);

const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

function normalize(val) {
  if (val === null || val === undefined || val === "") return null;

  if (Array.isArray(val)) {
    return val.map(normalize).sort((a, b) => {
      const sa = JSON.stringify(a);
      const sb = JSON.stringify(b);
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }

  if (isPlainObject(val)) {
    if (val.id !== undefined) return String(val.id);

    if ("value" in val) return normalize(val.value);

    return Object.keys(val)
      .filter((k) => !IGNORED_KEYS.has(k))
      .sort()
      .reduce((acc, k) => {
        acc[k] = normalize(val[k]);
        return acc;
      }, {});
  }

  if (typeof val === "string") return val.trim();
  if (typeof val === "number") return String(val);

  return val;
}

export function hasChange(initial, draft) {
  return (
    JSON.stringify(normalize(initial)) !== JSON.stringify(normalize(draft))
  );
}
