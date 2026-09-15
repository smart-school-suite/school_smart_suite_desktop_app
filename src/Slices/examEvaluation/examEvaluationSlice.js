import { createSlice } from "@reduxjs/toolkit";
import { RESULT } from "@/constants";

const initialState = {
  scores: [],
  gradeScale: [],
  resultSummary: {
    coursesPassed: 0,
    coursesFailed: 0,
    examStatus: "NA",
    totalScore: 0,
    totalCredit: 0,
    totalGradePoints: 0,
    gpa: 0,
  },
  maxGpa: 0.0,
  maxScore: 0,
  caMaxScore: 0,
  update: {
    maxGpa: 0.0,
    maxScore: 0,
    caMaxScore: 0,
    isDirty: false,
    gradeScale: [],
    initial: {
      scores: [],
      resultSummary: {
        coursesPassed: 0,
        coursesFailed: 0,
        examStatus: "NA",
        totalScore: 0,
        totalCredit: 0,
        totalGradePoints: 0,
        gpa: 0,
      },
    },
    draft: {
      scores: [],
      resultSummary: {
        coursesPassed: 0,
        coursesFailed: 0,
        examStatus: "NA",
        totalScore: 0,
        totalCredit: 0,
        totalGradePoints: 0,
        gpa: 0,
      },
    },
  },
};

const examEvaluationSlice = createSlice({
  name: "examEvaluation",
  initialState: initialState,
  reducers: {
    setUpdateInitialData: (state, action) => {
      const {
        courses = [],
        gradeScale = [],
        maxGpa = 0.0,
        maxScore = 70,
        caMaxScore = 30,
      } = action.payload;

      const mappedScale = gradeScale.map((gs) => ({
        scale_id: gs.id,
        gradePoints: gs.grade_points,
        result: gs.result,
        maximumScore: gs.maximum_score,
        minimumScore: gs.minimum_score,
        performance: gs.performance,
        resitResult: gs.resit_result,
        grade: gs.grade?.letter_grade || gs.grade,
      }));

      const mappedCourses = courses.map((course) => ({
        id: course?.id,
        course_id: course?.course_id,
        course_title: course?.course_title,
        course_code: course?.course_code,
        course_credit: course?.credit,
        caScore: parseFloat(course?.ca_score) || 0,
        score: isNaN(course?.score) ? "" : parseFloat(course?.score),
        gradePoints: parseFloat(course?.grade_points) || 0,
        result: course?.result || "N/A",
        resitResult: course?.resit_result || "N/A",
        performance: course?.performance || "N/A",
        grade: course?.grade || "N/A",
      }));

      state.update.gradeScale = mappedScale;
      state.update.maxGpa = maxGpa;
      state.update.maxScore = maxScore;
      state.update.caMaxScore = caMaxScore;

      state.update.initial.scores = mappedCourses;
      state.update.initial.resultSummary = calculateResultSummary(mappedCourses);

      state.update.draft.scores = mappedCourses.map((c) => ({ ...c }));
      state.update.draft.resultSummary = calculateResultSummary(mappedCourses);

      state.update.isDirty = false;
    },

    setInitialData: (state, action) => {
      const {
        caScores = [],
        gradeScale = [],
        maxGpa = 0.0,
        maxScore = 70,
        caMaxScore = 30,
      } = action.payload;

      state.scores = caScores.map((item) => ({
        course_id: item.course.id,
        course_title: item.course.course_title,
        course_code: item.course.course_code,
        course_credit: item.course.credit,
        caScore: parseFloat(item.score) || 0,
        score: "",
        gradePoints: 0,
        result: "N/A",
        resitResult: "N/A",
        performance: "N/A",
        grade: "N/A",
      }));

      state.gradeScale = gradeScale.map((gs) => ({
        scale_id: gs.id,
        gradePoints: gs.grade_points,
        result: gs.result,
        maximumScore: gs.maximum_score,
        minimumScore: gs.minimum_score,
        performance: gs.performance,
        resitResult: gs.resit_result,
        grade: gs.grade?.letter_grade || gs.grade,
      }));

      state.maxGpa = maxGpa;
      state.maxScore = maxScore;
      state.caMaxScore = caMaxScore;
    },

    updateScore: (state, action) => {
      const { courseId, score } = action.payload;
      const parsedExamScore = score === "" || isNaN(score) ? 0 : parseFloat(score);

      const courseToUpdate = state.scores.find(
        (course) => course.course_id === courseId
      );

      if (courseToUpdate) {
        const caScore =
          typeof courseToUpdate.caScore === "number"
            ? courseToUpdate.caScore
            : parseFloat(courseToUpdate.caScore) || 0;

        const totalScore = caScore + parsedExamScore;

        const grade = state.gradeScale.find(
          (g) => totalScore >= g.minimumScore && totalScore <= g.maximumScore
        );

        courseToUpdate.score = score;

        if (grade) {
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.result = grade.result;
          courseToUpdate.resitResult = grade.resitResult;
          courseToUpdate.performance = grade.performance;
          courseToUpdate.grade = grade.grade;
        } else {
          courseToUpdate.gradePoints = 0;
          courseToUpdate.result = "NA";
          courseToUpdate.resitResult = "NA";
          courseToUpdate.performance = "NA";
          courseToUpdate.grade = "NA";
        }
      }

      state.resultSummary = calculateResultSummary(state.scores);
    },

    updateDraftScore: (state, action) => {
      const { scoreId, score } = action.payload;
      const parsedExamScore = score === "" || isNaN(score) ? 0 : parseFloat(score);

      const courseToUpdate = state.update.draft.scores.find(
        (course) => course.id === scoreId
      );

      if (courseToUpdate) {
        const caScore =
          typeof courseToUpdate.caScore === "number"
            ? courseToUpdate.caScore
            : parseFloat(courseToUpdate.caScore) || 0;

        const totalScore = caScore + parsedExamScore;

        const grade = state.update.gradeScale.find(
          (g) => totalScore >= g.minimumScore && totalScore <= g.maximumScore
        );

        courseToUpdate.score = score;

        if (grade) {
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.result = grade.result;
          courseToUpdate.resitResult = grade.resitResult;
          courseToUpdate.performance = grade.performance;
          courseToUpdate.grade = grade.grade;
        } else {
          courseToUpdate.gradePoints = 0;
          courseToUpdate.result = "NA";
          courseToUpdate.resitResult = "NA";
          courseToUpdate.performance = "NA";
          courseToUpdate.grade = "NA";
        }
      }

      state.update.draft.resultSummary = calculateResultSummary(state.update.draft.scores);

      state.update.isDirty = checkIsDirty(
        state.update.draft.scores,
        state.update.initial.scores
      );
    },

    resetUpdateState: (state) => {
      state.update = initialState.update;
    },

    resetExamScoreState: () => initialState,
  },
});

const calculateResultSummary = (scores) => {
  let coursesPassed = 0;
  let coursesFailed = 0;
  let totalGradePoints = 0;

  const totalCourses = scores.length;

  scores.forEach((course) => {
    const status = course.result?.toLowerCase();
    if (status === RESULT.PASSED || status === "pass") {
      coursesPassed++;
    } else if (status === RESULT.FAILED || status === "fail") {
      coursesFailed++;
    }

    const points = typeof course.gradePoints === "number" ? course.gradePoints : 0;
    totalGradePoints += points;
  });

  const gpa = totalCourses > 0 ? totalGradePoints / totalCourses : 0;
  const examStatus = coursesFailed > 0 ? RESULT.FAILED : RESULT.PASSED;

  return { coursesPassed, coursesFailed, totalGradePoints, gpa, examStatus };
};

const checkIsDirty = (draftScores, initialScores) => {
  if (draftScores.length !== initialScores.length) return true;

  return draftScores.some((draftCourse) => {
    const initialCourse = initialScores.find(
      (init) => init.id === draftCourse.id || init.course_id === draftCourse.course_id
    );

    if (!initialCourse) return true;

    return String(draftCourse.score) !== String(initialCourse.score);
  });
};

export const {
  setUpdateInitialData,
  setInitialData,
  updateScore,
  updateDraftScore,
  resetUpdateState,
  resetExamScoreState,
} = examEvaluationSlice.actions;

export default examEvaluationSlice.reducer;