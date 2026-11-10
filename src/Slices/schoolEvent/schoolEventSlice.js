import { createSlice } from "@reduxjs/toolkit";

const emptyContent = {
  category: {
    error: "",
    value: "",
  },
  title: {
    isValid: "",
    value: "",
  },
  description: {
    isValid: "",
    value: "",
  },
  tags: {
    value: [],
    error: "",
  },
  start_date: {
    value: "",
    isValid: "",
  },
  end_date: {
    value: "",
    isValid: "",
  },
  location: {
    value: "",
    isValid: "",
  },
  organizer: {
    value: "",
    isValid: "",
  },
};

const emptyTargeting = {
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
};

const initialState = {
  tableRef: null,
  selectedEvents: [],
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
  createEvent: {
    isDirty: false,
    // id of the draft being edited, null when creating a new event
    draftEventId: null,
    content: emptyContent,
    // images already saved on a draft event ({ id, object_key })
    existingImages: [],
    removeImageIds: [],
    audience: {
      types: [],
      targetingContext: null,
      targeting: emptyTargeting,
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
    initial: emptyContent,
    draft: emptyContent,
    existingImages: [],
    removeImageIds: [],
  },
};

const schoolEventSlice = createSlice({
  name: "schoolEvent",
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
    setImportReset: (state) => {
      state.import = {
        status: "IDLE",
        selectedFile: null,
        mapping: {},
      };
    },
    setColumnMapping: (state, action) => {
      state.import.mapping = action.payload;
    },
    setTableRef: (state, action) => {
      const { tableRef } = action.payload;
      state.tableRef = tableRef;
    },
    setSelectedEvents: (state, action) => {
      state.selectedEvents = action.payload;
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
      state.selectedEvents = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedEvents = [];
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
    setEventContent: (state, action) => {
      const { field, value, error, isValid, actionType } = action.payload;
      if (actionType === "updateContent") {
        const targetField = state.updateContent.draft[field];
        if (!targetField) return;
        if (value !== undefined) targetField.value = value;
        if (error !== undefined) targetField.error = error;
        if (isValid !== undefined) targetField.isValid = isValid;
        state.updateContent.isDirty = isUpdateContentDirty(state.updateContent);
        return;
      }
      const targetField = state.createEvent.content[field];
      if (!targetField) return;
      if (value !== undefined) targetField.value = value;
      if (error !== undefined) targetField.error = error;
      if (isValid !== undefined) targetField.isValid = isValid;

      if (value !== undefined) state.createEvent.isDirty = true;
    },
    // New images and their order live in the drawer's component state (File
    // objects are not serializable); this only flags the form as changed.
    markCreateEventDirty: (state) => {
      state.createEvent.isDirty = true;
    },
    toggleRemoveImage: (state, action) => {
      const { imageId, actionType = "createEvent" } = action.payload;
      const target = state[actionType];
      const index = target.removeImageIds.indexOf(imageId);
      if (index === -1) {
        target.removeImageIds.push(imageId);
      } else {
        target.removeImageIds.splice(index, 1);
      }
      if (actionType === "updateContent") {
        target.isDirty = isUpdateContentDirty(target);
      } else {
        target.isDirty = true;
      }
    },
    setUpdateContentImagesChanged: (state, action) => {
      const { hasImageChanges } = action.payload;
      state.updateContent.hasImageChanges = hasImageChanges;
      state.updateContent.isDirty = isUpdateContentDirty(state.updateContent);
    },
    setAudienceType: (state, action) => {
      const { audienceType } = action.payload;
      const types = state.createEvent.audience.types;
      state.createEvent.isDirty = true;
      if (audienceType === "school_wide") {
        state.createEvent.audience.types = types.includes("school_wide")
          ? []
          : ["school_wide"];
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
      state.createEvent.audience.targetingContext = targetContext;
    },
    resetTargetingContext: (state) => {
      state.createEvent.audience.targetingContext = null;
    },
    setTargetMode: (state, action) => {
      const { targetGroup, mode } = action.payload;
      if (state.createEvent.audience.targeting[targetGroup]) {
        state.createEvent.audience.targeting[targetGroup].mode = mode;
      }
    },
    setTargetCriteria: (state, action) => {
      const { targetGroup, criteriaType, selectedIds } = action.payload;
      const group = state.createEvent.audience.targeting[targetGroup];

      if (group && group.criteria && criteriaType in group.criteria) {
        group.criteria[criteriaType] = selectedIds;
        state.createEvent.isDirty = true;
      }
    },
    setTargetIndividuals: (state, action) => {
      const { targetGroup, selectedIds } = action.payload;
      const group = state.createEvent.audience.targeting[targetGroup];

      if (group && "individualIds" in group) {
        group.individualIds = selectedIds;
        state.createEvent.isDirty = true;
      }
    },
    setTargetSelection: (state, action) => {
      const { targetGroup, targetKey, selectedIds } = action.payload;
      const group = state.createEvent.audience.targeting[targetGroup];

      if (!group) return;

      if (targetKey === "individualIds") {
        group.individualIds = selectedIds;
      } else if (group.criteria && targetKey in group.criteria) {
        group.criteria[targetKey] = selectedIds;
      }
      state.createEvent.isDirty = true;
    },
    resetTargetGroup: (state, action) => {
      const { targetGroup } = action.payload;
      if (targetGroup === "administrators") {
        state.createEvent.audience.targeting.administrators = {
          mode: "all",
          individualIds: [],
        };
      } else if (state.createEvent.audience.targeting[targetGroup]) {
        state.createEvent.audience.targeting[targetGroup] = {
          mode: "all",
          criteria: { departmentIds: [], specialtyIds: [], levelIds: [] },
          individualIds: [],
        };
      }
    },
    setPublicationType: (state, action) => {
      const { type } = action.payload;
      state.createEvent.publication.type = type;
    },
    setPublicationValue: (state, action) => {
      const { field, value } = action.payload;
      state.createEvent.publication.schedule[field] = value;
    },
    resetCreateEvent: (state) => {
      state.createEvent = initialState.createEvent;
    },
    // Loads a draft event into the create wizard so it can be edited and published.
    setCreateEventFromDraft: (state, action) => {
      const { event } = action.payload;
      const audience = parseJson(event?.audience) ?? {};
      const schoolWide = Boolean(audience?.school_wide);
      const students = audience?.student_audience?.[0] ?? {};
      const teachers = audience?.teacher_audience?.[0] ?? {};
      const admins = audience?.admin_audience?.[0] ?? {};
      const toRefs = (ids) => (ids ?? []).map((id) => ({ id }));

      const types = [];
      if (schoolWide) {
        types.push("school_wide");
      } else {
        if (hasTargets(students)) types.push("students");
        if (hasTargets(teachers)) types.push("teachers");
        if ((admins?.individual_ids ?? []).length > 0) types.push("schoolAdmins");
      }

      state.createEvent = {
        ...initialState.createEvent,
        draftEventId: event?.id ?? null,
        content: contentFromEvent(event),
        existingImages: imagesFromEvent(event),
        removeImageIds: [],
        audience: {
          types,
          targetingContext: null,
          targeting: {
            students: {
              mode: "criteria",
              criteria: {
                departmentIds: toRefs(students?.department_ids),
                specialtyIds: toRefs(students?.specialty_ids),
                levelIds: toRefs(students?.level_ids),
              },
              individualIds: students?.individual_ids ?? [],
            },
            teachers: {
              mode: "all",
              criteria: {
                departmentIds: toRefs(teachers?.department_ids),
                specialtyIds: toRefs(teachers?.specialty_ids),
                levelIds: toRefs(teachers?.level_ids),
              },
              individualIds: teachers?.individual_ids ?? [],
            },
            administrators: {
              mode: "all",
              individualIds: admins?.individual_ids ?? [],
            },
          },
        },
      };
    },
    setUpdateContentInitial: (state, action) => {
      const { event } = action.payload;
      const formattedPayload = contentFromEvent(event);
      state.updateContent.initial = formattedPayload;
      state.updateContent.draft = formattedPayload;
      state.updateContent.existingImages = imagesFromEvent(event);
      state.updateContent.removeImageIds = [];
      state.updateContent.hasImageChanges = false;
      state.updateContent.isDirty = false;
    },
    resetUpdateContent: (state) => {
      state.updateContent = initialState.updateContent;
    },
  },
});

export const {
  setSelectedEvents,
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
  setEventContent,
  markCreateEventDirty,
  toggleRemoveImage,
  setUpdateContentImagesChanged,
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
  resetCreateEvent,
  setCreateEventFromDraft,
  setUpdateContentInitial,
  resetUpdateContent,
} = schoolEventSlice.actions;

export default schoolEventSlice.reducer;

// "2026-11-10T08:30:00.000000Z" or "2026-11-10 08:30:00" -> "2026-11-10 08:30"
export function toDateTimeInputValue(value) {
  if (!value || typeof value !== "string") return "";
  const match = value.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  return match ? `${match[1]} ${match[2]}` : "";
}

function parseJson(value) {
  if (!value) return null;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function hasTargets(group) {
  return ["individual_ids", "department_ids", "specialty_ids", "level_ids"].some(
    (key) => (group?.[key] ?? []).length > 0,
  );
}

function contentFromEvent(event) {
  return {
    category: {
      error: "",
      value: event?.event_category ?? "",
    },
    title: { isValid: "", value: event?.title ?? "" },
    description: { isValid: "", value: event?.description ?? "" },
    tags: {
      value: parseJson(event?.tags) ?? [],
      error: "",
    },
    start_date: {
      isValid: "",
      value: toDateTimeInputValue(event?.start_date),
    },
    end_date: { isValid: "", value: toDateTimeInputValue(event?.end_date) },
    location: { isValid: "", value: event?.location ?? "" },
    organizer: { isValid: "", value: event?.organizer ?? "" },
  };
}

function imagesFromEvent(event) {
  return (event?.current_images ?? []).map((image) => ({
    id: image?.id,
    object_key: image?.object_key,
  }));
}

function isUpdateContentDirty(updateContent) {
  return (
    hasFormChanged(updateContent.initial, updateContent.draft) ||
    (updateContent.removeImageIds ?? []).length > 0 ||
    Boolean(updateContent.hasImageChanges)
  );
}

function hasFormChanged(initialObj, draftObj) {
  function extractComparableValue(field) {
    if (!field || field.value === undefined) return null;

    const val = field.value;

    if (val === null || typeof val !== "object") {
      return val;
    }

    if (Array.isArray(val)) {
      return val
        .map((item) =>
          item && typeof item === "object" && item.id !== undefined
            ? item.id
            : item,
        )
        .sort();
    }

    return val.id !== undefined ? val.id : val;
  }

  const keys = new Set([
    ...Object.keys(initialObj || {}),
    ...Object.keys(draftObj || {}),
  ]);

  for (const key of keys) {
    const initialVal = extractComparableValue(initialObj[key]);
    const draftVal = extractComparableValue(draftObj[key]);

    if (JSON.stringify(initialVal) !== JSON.stringify(draftVal)) {
      return true;
    }
  }

  return false;
}
