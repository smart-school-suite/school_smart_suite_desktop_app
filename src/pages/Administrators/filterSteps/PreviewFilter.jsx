import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { removeCustomFilter } from "../../../Slices/teacher/teacherSlice";
function PreviewFilter({ cFilters, columns, nextStep, previousStep }) {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teachers);
  const cf = teacherState.customFilter.find((cf) => cf.id === cFilters.id);
  return (
    <>
      <div className="px-2 my-2">
        <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-2">
          <div className="d-flex flex-row justify-content-end">
            <span>{cf.id}</span>
          </div>
          <div className="d-flex flex-column">
            <span className="fw-semibold">{cf.column.headerName}</span>
            <span className="fw-medium">{cf.match.label}</span>
          </div>
          <div className="d-flex flex-row align-items-center gap-2 justify-content-end">
            <button className="border-none bg-transparent">
              <Icon icon="mynaui:edit" width={20} height={20} />
            </button>
            <button
              className="border-none bg-transparent"
              onClick={() => {
                dispatch(removeCustomFilter({ id: cf.id }));
              }}
            >
              <Icon icon="proicons:delete" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PreviewFilter;
