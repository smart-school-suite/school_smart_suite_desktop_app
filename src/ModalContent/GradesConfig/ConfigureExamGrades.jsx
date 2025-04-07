import { Icon } from "@iconify/react";
import { useFetchExamConfigDataQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners";
import { useEffect, useState } from "react";
import { useAddGradeMutation } from "../../Slices/Asynslices/postSlice";
function ConfigureExamGrades({ handleClose, row_id: examId }) {
  const [formData, setFormData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { data: examConfig, isLoading } = useFetchExamConfigDataQuery({
    examId: examId,
  });
  useEffect(() => {
    if (examConfig?.data) {
      const preSetFormData = examConfig.data.map((item) => ({
        letter_grade_id: item.letter_grade_id,
        minimum_score: 0.0,
        maximum_score: 0.0,
        determinant: "",
        grade_status: "",
        grade_points: 0.0,
        exam_id: examId,
      }));
      setFormData(preSetFormData);
    }
  }, [examId]);

  const handleInputChange = (index, field, value) => {
    setFormData((prevState) => {
      const updatedFormData = [...prevState];
      updatedFormData[index] = {
        ...prevState[index],
        [field]: value,
      };
      return updatedFormData;
    });
  };
  const [addGrade] = useAddGradeMutation();
  const handleCreateGrades = async () => {
    const payload = {
      grades: formData
        .filter(
          (items) => items.determinant !== "" || items.grade_status !== ""
        )
        .map((grade) => ({
          letter_grade_id: grade.letter_grade_id,
          minimum_score: parseFloat(grade.minimum_score),
          maximum_score: parseFloat(grade.maximum_score),
          grade_points: parseFloat(grade.grade_points),
          determinant: grade.determinant,
          exam_id: grade.exam_id,
          grade_status: grade.grade_status,
        })),
    };
    setIsCreating(true);
    try {
      await addGrade(payload).unwrap();
      handleClose();
      setIsCreating(false);
      toast.custom(
        <ToastSuccess
          title={"Creation Successfull ✅"}
          description={"The Exam Grades has been created successfully "}
        />
      );
    } catch (error) {
      setIsCreating(false);
      toast.custom(
        <ToastDanger
          title={"Something went wrong ❌"}
          description={
            " ❌ Something went wrong! The Grades failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block w-100">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Configure Exam Grades {examId}</h5>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button
            className="p-2 primary-background border-none rounded-2 px-3 font-size-sm text-white mb-2"
            onClick={() => {
              handleCreateGrades();
            }}
          >
            {isCreating ? <SingleSpinner /> : "Submit Grades Config"}
          </button>
        </div>
        <div className="card border grades-box">
          <table className="table table-responsive">
            <thead className="grades-thead">
              <tr>
                <th className="text-center border">Maximum Score</th>
                <th className="text-center border">Letter Grade</th>
                <th className="text-center border">Status</th>
                <th className="text-center border">Determinant</th>
                <th className="text-center border">Grade Points</th>
                <th className="text-center border">Min Score</th>
                <th className="text-center border">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {examConfig.data.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ width: "11%", textAlign: "center" }}>
                    {item.weighted_score}
                  </td>
                  <td style={{ width: "11%", textAlign: "center" }}>
                    {item.letter_grade}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="grade_status"
                      value={
                        formData[index] ? formData[index].grade_status : ""
                      }
                      onChange={(e) =>
                        handleInputChange(index, "grade_status", e.target.value)
                      }
                    >
                      <option value="pass">Pass</option>
                      <option value="fail">Failed</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="determinant"
                      value={formData[index] ? formData[index].determinant : ""}
                      onChange={(e) =>
                        handleInputChange(index, "determinant", e.target.value)
                      }
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Outstanding">Outstanding</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Satisfactory">Satisfactory</option>
                      <option value="Fair">Fair</option>
                      <option value="Unsatisfactory">Unsatisfactory</option>
                      <option value="Poor">Poor</option>
                      <option value="Inadequate">Inadequate</option>
                      <option value="Below Average">Below Average</option>
                      <option value="Marginal">Marginal</option>
                      <option value="Commendable">Commendable</option>
                      <option value="Promising">Promising</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      step="0.01"
                      name="grade_points"
                      value={
                        formData[index] ? formData[index].grade_points : ""
                      }
                      placeholder="4.00 - 3.00"
                      onChange={(e) =>
                        handleInputChange(index, "grade_points", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ width: "11%" }}>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData[index] ? formData[index].minimum_score : ""
                      }
                      name="minimum_score"
                      step="0.01"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "minimum_score",
                          e.target.value
                        )
                      }
                      placeholder={`1 - ${item.weighted_score}`}
                    />
                  </td>
                  <td style={{ width: "11%" }}>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData[index] ? formData[index].maximum_score : ""
                      }
                      name="maximum_score"
                      step="0.01"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "maximum_score",
                          e.target.value
                        )
                      }
                      placeholder={`1 - ${item.weighted_score}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default ConfigureExamGrades;
