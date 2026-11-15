import { useDispatch, useSelector } from "react-redux";
import {
  useAssignResitInvigilators,
  useGetPotentialResitInvigilators,
  useGetResitInvigilators,
  useRemoveResitInvigilators,
  useResitExamsAsExams,
} from "../../hooks/resitTimetableGeneration";
import { setSelectedResitExam } from "../../Slices/exam/examInvigilatorSlice";
import { InvigilatorManager } from "../Exam/ExamInvigilator";

// Same page as the exam invigilators, for resit exams: whoever is assigned here
// can be given resit sessions by the resit timetable, never for a course they teach.
const RESIT_INVIGILATOR_CONFIG = {
  ownerKey: "resit_exam_id",
  useSelected: () => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.examInvigilator.selectedResitExam);
    return [selected, (exam) => dispatch(setSelectedResitExam({ exam }))];
  },
  useAssigned: useGetResitInvigilators,
  useRemove: useRemoveResitInvigilators,
  useExams: useResitExamsAsExams,
  drawerData: {
    usePotential: useGetPotentialResitInvigilators,
    useAssign: useAssignResitInvigilators,
  },
  copy: {
    heading: "Manage Resit Invigilators",
    owner: "resit exam",
    navigatorTitle: "Resit invigilators",
    navigatorDescription: "Select a resit exam to see and assign who supervises it.",
    readyTitle: "Ready to manage resit invigilators?",
    readyDescription: "Select a resit exam on the left to see who supervises it and assign teachers or school admins.",
    emptyDescription:
      "Assign teachers or school admins to supervise this resit exam. The resit timetable then gives them resit sessions, never for a course they teach.",
    remove: "Remove from resit",
  },
};

function ResitInvigilator() {
  return <InvigilatorManager config={RESIT_INVIGILATOR_CONFIG} />;
}
export default ResitInvigilator;
