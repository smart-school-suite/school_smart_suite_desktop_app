import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { EXAM_TIMETABLE_KIND } from "./kinds";

/** Which timetable of exams the page works on; the exam timetable unless a provider says otherwise. */
export const TimetableKindContext = createContext(EXAM_TIMETABLE_KIND);

export const TimetableKindProvider = TimetableKindContext.Provider;

export const useTimetableKind = () => useContext(TimetableKindContext);

/** Reads the page state of the current kind, e.g. useKindState((state) => state.exam). */
export function useKindState(select) {
  const kind = useTimetableKind();
  return useSelector((state) => select(state[kind.stateKey]));
}
