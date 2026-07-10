import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  teachers: null,
  isLoading: false,
  error: null,
  selectedTeachers: [],
  rowCount: 0,
  searchText: "",
  columns: {
    selectedColumns: [],
    availableColumns: [],
  },
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedTeachers: (state, action) => {
      state.selectedTeachers = action.payload;
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
      state.selectedTeachers = [];
      state.rowCount = 0;
    },
    resetAll: (state) => {
      state.selectedTeachers = [];
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
  setTeachers,
  setLoading,
  setError,
  setSelectedTeachers,
  setRowCount,
  setSearchText,
  setColumns,
  resetSelections,
  resetAll,
  updateAvailableColumns,
  updateSelectedColumns,
} = teacherSlice.actions;

export default teacherSlice.reducer;

export const selectTeachers = (state) => state.teachers.teachers;
export const selectTeachersData = (state) =>
  state.teachers.teachers?.data ?? [];
export const selectIsLoading = (state) => state.teachers.isLoading;
export const selectError = (state) => state.teachers.error;
export const selectSelectedTeachers = (state) =>
  state.teachers.selectedTeachers;
export const selectRowCount = (state) => state.teachers.rowCount;
export const selectSearchText = (state) => state.teachers.searchText;
export const selectColumns = (state) => state.teachers.columns;
export const selectAvailableColumns = (state) =>
  state.teachers.columns.availableColumns;
export const selectSelectedColumns = (state) =>
  state.teachers.columns.selectedColumns;

export const selectTeacherCount = createSelector(
  [selectTeachersData],
  (teachers) => teachers?.length || 0,
);

export const selectFilteredTeachers = createSelector(
  [selectTeachersData, selectSearchText],
  (teachers, searchText) => {
    if (!searchText) return teachers;
    return (
      teachers?.filter((teacher) =>
        Object.values(teacher).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      ) ?? []
    );
  },
);
