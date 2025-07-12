import { useGetStudents } from "../../hooks/student/useGetStudent";
import Pageloaderspinner from "../../components/Spinners/Spinners";
function ExamCandidates(){
    const { data: students, isLoading, isError, error, refetch } = useGetStudents();
    if(isLoading){
        <Pageloaderspinner />
    }
    return(
        <>
        {
            console.table(students)
        }
        </>
    )
}
export default ExamCandidates;