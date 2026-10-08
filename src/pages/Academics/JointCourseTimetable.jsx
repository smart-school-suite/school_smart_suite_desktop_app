import { useGetSemesterJointCourse } from "../../hooks/semesterJointCourse/useGetSemesterJointCourse";
function JointCourseTimetable(){
 const { data: joinCourse, isLoading, error } = useGetSemesterJointCourse();
     return (
        <>
        </>
     )
}
export default JointCourseTimetable;