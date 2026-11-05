import { useDispatch, useSelector } from "react-redux";
import CreateJointCourseWizzard from "../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/CreateJointCourseWizzard";
import { setJointCourseTerm } from "../../Slices/jointCourse/jointCourseTimetableSlice";
import DrawerTrigger from "../drawer/DrawerTrigger";
import TermDropdown from "./TermDropdown";
function JointCourseWorkspace() {
  const dispatch = useDispatch();
  const { term } = useSelector((state) => state.jointCourseTimetable);

  return (
    <div
      style={{ width: "75%", height: "100%" }}
      className="d-flex flex-column align-items-center px-2 gap-2"
    >
      <div className="d-flex flex-row justify-content-center w-100">
        <TermDropdown
          value={term}
          onChange={(value) => dispatch(setJointCourseTerm(value))}
        />
      </div>
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center gap-2 text-center">
          <img
            src="/sss-maskot/timetable.png"
            alt="sss-timetable-maskot"
            style={{
              height: "150px",
              width: "150px",
              objectFit: "contain",
            }}
          />
          <div>
            <p>Joint Course Schedule Has Not Been Created Yet</p>
            <DrawerTrigger
              title={"Create Joint Course Timetable"}
              drawerChildren={CreateJointCourseWizzard}
            >
              <button className="border-none border bg-primary-500 text-white font-size-sm p-2 rounded-2">
                Create Timetable
              </button>
            </DrawerTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JointCourseWorkspace;
