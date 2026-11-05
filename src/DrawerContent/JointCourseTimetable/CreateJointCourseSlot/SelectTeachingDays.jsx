import { useSelector } from "react-redux";
function SelectTeachingDays({ handleClose, drawerData }){
     const { term, selectedCourseId } = useSelector(
    (state) => state.jointCourseTimetable,
  );
     return (
        <>
        <h1>Select Teaching Days</h1>
        </>
     )
}
export default SelectTeachingDays;