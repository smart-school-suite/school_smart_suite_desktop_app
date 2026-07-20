import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomFilter } from "../../../Slices/teacher/teacherSlice";
import { filterMatchMap } from "../../../utils/maps/fIlterMatchMap";
import { Fragment } from "react";
function ColumnFilterMatch({ cFilters, columns, nextStep, previousStep }) {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teachers);
  const cf = teacherState.customFilter.find((cf) => cf.id === cFilters.id);
  const fms = filterMatchMap.find((fm) => fm.type === cf.column.cellDataType);
  return (
    <>
      <div className="d-flex flex-column gap-2 p-2" style={{ height: "50dvh" }}>
        <div className="d-flex flex-column gap-3">
          <span>How should {cf.column?.headerName} be matched? </span>
          <div className="d-flex flex-row align-items-center flex-wrap gap-2">
            {fms.matches.map((match, index) => {
              const isSelected = cf?.match?.value === match.value;
              return (
                <Fragment key={index}>
                  <button
                    className={`border-none rounded-3 transition-all px-3 py-2 border ${isSelected ? "primary-background-100 color-primary" : "bg-transparent "}`}
                    onClick={() => {
                      dispatch(
                        setCustomFilter({
                          id: cFilters.id,
                          field: "match",
                          value: match,
                        }),
                      );
                    }}
                  >
                    {match.label}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end mt-auto">
          <div className="d-flex flex-row align-items-center gap-2">
            <button
              style={{ width: "2rem", height: "2rem" }}
              className="rounded-circle border-none bg-transparent border d-flex align-items-center justify-content-center"
              onClick={() => previousStep()}
            >
              <Icon icon="famicons:chevron-back" />
            </button>
            <button
              style={{ width: "2rem", height: "2rem" }}
              className="rounded-circle border-none bg-transparent border d-flex align-items-center justify-content-center"
              onClick={() => {
                  if(cf.match){
                      nextStep()
                  }
                  return
              }}
            >
              <Icon icon="ion:chevron-forward-outline" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ColumnFilterMatch;
