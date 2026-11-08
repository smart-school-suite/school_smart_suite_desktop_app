import { useSelector } from "react-redux";
import GridWrapper from "../../examTimetable/GridWrapper";
import VersionWrapper from "../../examTimetable/VersionWrapper";
function ExamTimetable() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div
          className="d-flex flex-row align-items-start flex-grow-1"
          style={{ minHeight: 0 }}
        >
          <VersionWrapper />
          <GridWrapper />
        </div>
      </main>
    </>
  );
}
export default ExamTimetable;
