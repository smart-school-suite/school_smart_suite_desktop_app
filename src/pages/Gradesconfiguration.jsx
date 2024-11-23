import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
function Gradesconfiguration(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Exams",
                icon:null,
                route:"/exams"
            },
            {
               lable:"Exam Analysis",
               route:"/exam-analysis",
               icon:null
            },
            {
               lable:"Grades Configuration",
               icon:null,
               route:"/grades-configuration"
            }
        ],
    }
    return(
        <>
        <Navbar 
           options={navBarOptions}
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
                        <th>First Semester CA</th>
                        <th className="text-center">Exam Score</th>
                        <th className="text-center">Letter Grade</th>
                        <th className="text-center">Weighted Mark</th>
                    </thead>
                    <tbody className="score-table-aggregator">
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                        <tr>
                            <td>First Semester CA</td>
                            <td>
                                <input type="number"
                                 className="form-control score-input"
                                 placeholder="score"
                                />
                            </td>
                            <td className="text-center">
                                A+
                            </td>
                            <td className="text-center">
                                100
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default Gradesconfiguration;