import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
import { GradesConfigurationNavbarOptions } from "../componentConfigurations/navBarConfig";
import { useFetchLetterGradesQuery } from "../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../components/Spinners";
function Gradesconfiguration(){
  const { data:letter_grades, isLoading, error  } = useFetchLetterGradesQuery();
   if(isLoading){
    return(
         <Pageloaderspinner />
    )
   }
    return(
        <>
        <Navbar 
           options={GradesConfigurationNavbarOptions}
         />
          <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100 ">
                <div className="d-block">
                  <h5 className="fw-bold my-0">Configure Exam Grades</h5>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Save Changes"
                    bg="green-bg"
                  />
                </div>
              </div>
        </div>
        <div>
            <div className="card px-2  shadow-sm rounded-4 mt-2 py-2">
                <table>
                    <thead className="score-tablehead-aggregator">
                        <th>Exam Name</th>
                        <th className="text-center">Min Score</th>
                        <th className="text-center">Max Score</th>
                        <th className="text-center">Letter Grade</th>
                        <th className="text-center">Weighted Mark</th>
                    </thead>
                    <tbody className="score-table-aggregator" style={{ height:"10rem" }}>
                        {
                          letter_grades.letter_grades.map((grades) => (
                            <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                               {grades.letter_grade}
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                          ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default Gradesconfiguration;