import Pageloaderspinner from "../../components/Spinners";
import { useFetchGraduationDatesByBatchQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
function ViewGraduationDates({ handleClose, row_id: batchId }) {
  const { data: graduationDate, isLoading: isGraduationDateLoading } =
    useFetchGraduationDatesByBatchQuery(batchId);
  if (isGraduationDateLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h5 className="m-0">Graduation Dates</h5>
        <span className="m-0" onClick={handleClose}>
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="modalContainer">
          <div className="block">
            {graduationDate.data.map((item, index) => (
              <div
                className="d-flex flex-row align-items-center justify-content-between border-bottom py-2"
                key={index}
              >
                <div>
                  <p className="m-0 fw-semibold">{item.specialty_name}</p>
                  <p className="m-0 fw-medium font-size-sm fw-semibold">
                    {formatDate(item.graduation_date)}
                  </p>
                  <p className="m-0 fw-medium font-size-sm">
                    {item.level_name}, {item.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}
export default ViewGraduationDates;
