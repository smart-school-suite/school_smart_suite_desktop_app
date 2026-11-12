import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Audience of one participant group (voters or candidates), in the same shape
// the announcement / event target pickers read and write.
const emptyAudience = () => ({
  types: [],
  targetingContext: null,
  targeting: {
    students: {
      mode: "criteria",
      criteria: { departmentIds: [], specialtyIds: [], levelIds: [] },
      individualIds: [],
    },
    teachers: {
      mode: "all",
      criteria: { departmentIds: [], specialtyIds: [], levelIds: [] },
      individualIds: [],
    },
    administrators: { mode: "all", individualIds: [] },
  },
  exclude: { student_ids: [], teacher_ids: [], admin_ids: [] },
});

const emptyParticipants = () => ({
  // group the target pickers currently edit ("voters" | "candidates")
  activeGroup: "voters",
  voters: emptyAudience(),
  candidates: emptyAudience(),
  mustBeVoter: false,
});

// Server configuration (ids only) → picker state ({ id } objects for criteria).
const toObjects = (ids) => (ids ?? []).map((id) => ({ id }));
const audienceFromConfig = (config = {}) => {
  const audience = emptyAudience();
  const block = (list) => (Array.isArray(list) ? list[0] ?? {} : list ?? {});
  const students = block(config.student_audience);
  const teachers = block(config.teacher_audience);
  const admins = block(config.admin_audience);
  const hasTargets = (b) =>
    ["individual_ids", "department_ids", "specialty_ids", "level_ids"].some((k) => (b?.[k] ?? []).length > 0);

  if (config.school_wide) {
    audience.types = ["school_wide"];
  } else {
    if (hasTargets(students)) audience.types.push("students");
    if (hasTargets(teachers)) audience.types.push("teachers");
    if ((admins.individual_ids ?? []).length > 0) audience.types.push("schoolAdmins");
  }
  ["students", "teachers"].forEach((group) => {
    const b = group === "students" ? students : teachers;
    audience.targeting[group] = {
      mode: "criteria",
      criteria: {
        departmentIds: toObjects(b.department_ids),
        specialtyIds: toObjects(b.specialty_ids),
        levelIds: toObjects(b.level_ids),
      },
      individualIds: b.individual_ids ?? [],
    };
  });
  audience.targeting.administrators = { mode: "all", individualIds: admins.individual_ids ?? [] };
  audience.exclude = {
    student_ids: config.exclude?.student_ids ?? [],
    teacher_ids: config.exclude?.teacher_ids ?? [],
    admin_ids: config.exclude?.admin_ids ?? [],
  };
  return audience;
};

const initialState = {
  elections: null,
  tableRef: null,
  selectedTypes: [],
  rowCount: 0,
  searchText: "",
  voting: {
     context: {

     }
  },
  participants: emptyParticipants(),
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
  import: {
    status: "IDLE",
    selectedFile: null,
    mapping: {},
  },
};

const electionSlice = createSlice({
  name: "election",
  initialState,
  reducers: {
    // ── Participant (voter / candidate) audience ─────────────────────
    resetParticipants: (state) => {
      state.participants = emptyParticipants();
    },
    loadParticipants: (state, action) => {
      const { configuration } = action.payload ?? {};
      state.participants = emptyParticipants();
      if (configuration) {
        state.participants.voters = audienceFromConfig(configuration.voters);
        state.participants.candidates = audienceFromConfig(configuration.candidates);
        state.participants.mustBeVoter = Boolean(configuration.candidates?.must_be_voter);
      }
    },
    setParticipantGroup: (state, action) => {
      state.participants.activeGroup = action.payload.group;
    },
    toggleParticipantAudienceType: (state, action) => {
      const { group, audienceType } = action.payload;
      const audience = (state.participants ??= emptyParticipants())[group];
      const types = audience.types;
      if (audienceType === "school_wide") {
        audience.types = types.includes("school_wide") ? [] : ["school_wide"];
        return;
      }
      const schoolWide = types.indexOf("school_wide");
      if (schoolWide !== -1) types.splice(schoolWide, 1);
      const existing = types.indexOf(audienceType);
      if (existing !== -1) types.splice(existing, 1);
      else types.push(audienceType);
    },
    setParticipantTargetingContext: (state, action) => {
      const { group, targetContext } = action.payload;
      state.participants.activeGroup = group;
      state.participants[group].targetingContext = targetContext;
    },
    resetParticipantTargetingContext: (state, action) => {
      state.participants[action.payload.group].targetingContext = null;
    },
    // Called by the shared target pickers; they edit the active group.
    setParticipantTargetSelection: (state, action) => {
      const { targetGroup, targetKey, selectedIds } = action.payload;
      const group = state.participants[state.participants.activeGroup].targeting[targetGroup];
      if (!group) return;
      if (targetKey === "individualIds") group.individualIds = selectedIds;
      else if (group.criteria && targetKey in group.criteria) group.criteria[targetKey] = selectedIds;
    },
    setParticipantTargetIndividuals: (state, action) => {
      const { targetGroup, selectedIds } = action.payload;
      const group = state.participants[state.participants.activeGroup].targeting[targetGroup];
      if (group && "individualIds" in group) group.individualIds = selectedIds;
    },
    setParticipantExclusions: (state, action) => {
      const { group, key, ids } = action.payload;
      state.participants[group].exclude[key] = ids;
    },
    setMustBeVoter: (state, action) => {
      state.participants.mustBeVoter = Boolean(action.payload);
    },
    setVoteContext: (state, action) => {
       const { election } =  action.payload;
       state.voting.context = election; 
    },
    resetVoteContext: (state) => {
       state.voting.context = initialState.voting; 
    },
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
    setSelectedElections: (state, action) => {
      state.selectedTypes = action.payload;
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
      state.selectedTypes = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTypes = [];
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
  },
});

export const {
  resetParticipants,
  loadParticipants,
  setParticipantGroup,
  toggleParticipantAudienceType,
  setParticipantTargetingContext,
  resetParticipantTargetingContext,
  setParticipantTargetSelection,
  setParticipantTargetIndividuals,
  setParticipantExclusions,
  setMustBeVoter,
  setVoteContext,
  resetVoteContext,
  setElections,
  setSelectedElections,
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
  setColumnMapping
} = electionSlice.actions;

export default electionSlice.reducer;
