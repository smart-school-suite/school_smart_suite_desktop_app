import { Icon } from "@iconify/react";
import { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomFilter } from "../../../Slices/teacher/teacherSlice";

function ColumnSelect({ cFilters, columns, nextStep }) {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teachers);

  const isColumnSelected = useMemo(() => {
    const cf = teacherState.customFilter?.find(
      (cf) => cf.id === cFilters.id,
    );
    return !!cf?.column?.headerName;
  }, [teacherState.customFilter, cFilters.id]);

  return (
    <>
      <div className="d-flex flex-column p-2 gap-2">
        <div className="d-flex flex-column gap-2 pe-2">
          <span>What Will You Like to filter</span>
          <div>
            <input
              type="search"
              className="form-control font-size-sm"
              placeholder="Search Columns"
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">Columns</span>
          <div
            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-2 pe-1"
            style={{ maxHeight: "32dvh" }}
          >
            {columns?.availableColumns?.map((column, index) => {
              const cf = teacherState.customFilter?.find(
                (cf) => cf.id === cFilters.id,
              );
              const isSelected = cf?.column?.headerName === column?.headerName;

              return (
                <div
                  key={index}
                  className="card rounded-3 p-2 pointer-cursor"
                  onClick={() => {
                    dispatch(
                      setCustomFilter({
                        id: cFilters.id,
                        field: "column",
                        value: column,
                      }),
                    );
                  }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span>{column?.headerName}</span>
                    {isSelected && (
                      <span>
                        <Icon
                          icon="material-symbols:check-circle-rounded"
                          width={20}
                          height={20}
                          className="green-color"
                        />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div className="d-flex flex-row align-items-center gap-2">
            <button
              style={{ width: "2rem", height: "2rem" }}
              className="rounded-circle border-none bg-transparent border d-flex align-items-center justify-content-center"
              onClick={() => nextStep()}
              disabled={!isColumnSelected}
              {...(!isColumnSelected && {
                style: { 
                  width: "2rem", 
                  height: "2rem", 
                  opacity: 0.5, 
                  cursor: "not-allowed" 
                }
              })}
            >
              <Icon icon="ion:chevron-forward-outline" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColumnSelect;