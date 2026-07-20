import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomFilter } from "../../../Slices/teacher/teacherSlice";
import filterInputMap from "../../../utils/maps/filterInputMap";

function ColumnValueInput({ cFilters, columns, nextStep, previousStep }) {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teachers);
  
  const cf = teacherState.customFilter?.find((cf) => cf.id === cFilters.id);

  if (!cf) return null; 

  const cellDataType = cf.column?.cellDataType;
  const match = cf.match?.value;

  const inputConfig = filterInputMap.find((item) => {
    if (match === "between") {
      return item.con_1 === cellDataType && item.con_2 === "between";
    }
    return item.con_1 === cellDataType && !item.con_2;
  });

  const FilterComponent = inputConfig?.component;

  const handleSingleValueChange = (newValue) => {
    dispatch(setCustomFilter({ id: cFilters.id, field: "value", value: newValue }));
  };

  const handleRangeValueChange = (fieldKey, newValue) => {
    const currentRangeValue = typeof cf.value === "object" ? cf.value : {};
    dispatch(
      setCustomFilter({
        id: cFilters.id,
        field: "value",
        value: { ...currentRangeValue, [fieldKey]: newValue },
      })
    );
  };

  return (
    <div className="d-flex flex-column p-2 font-size-sm" style={{ height: "50dvh" }}>
      <div className="d-flex flex-column gap-1 mb-3">
        <span className="fw-semibold">{cf.column?.headerName}</span>
        <span className="text-capitalize text-muted">{match}</span>
      </div>
      <div className="my-2 flex-grow-1">
        {FilterComponent ? (
          match === "between" ? (
            <FilterComponent
              minValues={cf.value?.min || ""}
              setMinValues={(val) => handleRangeValueChange("min", val)}
              maxValues={cf.value?.max || ""}
              setMaxValues={(val) => handleRangeValueChange("max", val)}
              placeholderMin="From"
              placeholderMax="To"
            />
          ) : (
            <FilterComponent
              value={cf.value || ""}
              setValue={handleSingleValueChange}
              placeholder={`Enter ${cf.column?.headerName?.toLowerCase()}...`}
            />
          )
        ) : (
          <div className="text-danger small">No filter input template found for this data type.</div>
        )}
      </div>

      <div className="d-flex flex-row justify-content-end mt-auto">
        <div className="d-flex flex-row align-items-center gap-2">
          <button
            style={{ width: "2rem", height: "2rem" }}
            className="rounded-circle border-none bg-transparent border d-flex align-items-center justify-content-center"
            onClick={previousStep}
          >
            <Icon icon="famicons:chevron-back" />
          </button>
          <button
            style={{ width: "2rem", height: "2rem" }}
            className="rounded-circle border-none bg-transparent border d-flex align-items-center justify-content-center"
            onClick={nextStep}
          >
            <Icon icon="ion:chevron-forward-outline" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColumnValueInput;