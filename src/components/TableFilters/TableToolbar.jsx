import {
  ArrowUpFromLine,
  Check,
  ChevronDown,
  ListFilter,
  Plus,
  RotateCcw,
  Settings2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Export from "../../ModalContent/Export/Export";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import {
  setChipFields,
  setColumnFilter,
} from "../../Slices/tableFilters/tableFiltersSlice";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import SearchInput from "../input/search";
import ConditionValueInput from "./ConditionValueInput";
import {
  OPERATORS,
  defaultOperator,
  describeValue,
  isConditionComplete,
  operatorFor,
} from "./filterEngine";
import Popover from "./Popover";
import "./tableFilters.css";

function TableToolbar({
  filters,
  tableRef,
  searchPlaceholder = "Search",
  onReset,
}) {
  const { state, columns, chipFields, activeCount } = filters;
  const conditionCount = state.applied.length;

  const [search, setSearch] = useState(state.searchText);
  useEffect(() => setSearch(state.searchText), [state.searchText]);
  useEffect(() => {
    if (search === state.searchText) return undefined;
    const timer = setTimeout(() => filters.setSearch(search), 180);
    return () => clearTimeout(timer);
  }, [search]);

  const handleReset = () => {
    filters.reset();
    setSearch("");
    onReset?.();
  };

  return (
    <div className="tf-toolbar">
      <div className="tf-toolbar__row">
        <div className="tf-toolbar__search">
          <SearchInput
            placeholder={searchPlaceholder}
            value={search}
            onChange={setSearch}
            hotkey="Ctrl+K"
          />
        </div>
        <div className="tf-toolbar__tools">
          <button
            type="button"
            className={`tf-btn ${state.panelOpen || conditionCount ? "is-active" : ""}`}
            onClick={() => filters.togglePanel()}
            aria-pressed={state.panelOpen}
          >
            <ListFilter size={15} strokeWidth={1.75} />
            <span>Filters</span>
            {conditionCount > 0 && (
              <span className="tf-count">{conditionCount}</span>
            )}
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              className="tf-btn tf-btn--ghost"
              onClick={handleReset}
            >
              <RotateCcw size={14} strokeWidth={1.75} />
              <span>Clear all</span>
            </button>
          )}
          <span className="tf-divider" aria-hidden="true" />
          <ModalButton
            action={{ modalContent: Export }}
            size="xl"
            rowData={{ tableRef, columns }}
            classname="tf-btn"
          >
            <ArrowUpFromLine size={14} strokeWidth={1.75} />
            <span>Export</span>
          </ModalButton>
          <ModalButton
            action={{ modalContent: TableColumnSetting }}
            size="xl"
            rowData={{
              tableRef,
              onSaveSuccess: filters.saveColumnLayout,
              onResetSuccess: filters.resetColumnLayout,
            }}
            classname="tf-btn tf-btn--icon"
          >
            <Settings2
              size={15}
              strokeWidth={1.75}
              aria-label="Table settings"
            />
          </ModalButton>
        </div>
      </div>

      {columns.length > 0 && (
        <div className="tf-toolbar__chips" aria-label="Quick filters">
          {chipFields.map((field) => (
            <ColumnFilterChip
              key={field}
              filters={filters}
              column={filters.columnsByField[field]}
            />
          ))}
          <ChipPicker filters={filters} />
        </div>
      )}
    </div>
  );
}

export default TableToolbar;

function ColumnFilterChip({ filters, column }) {
  const dispatch = useDispatch();
  const active = filters.state.columnFilters[column.field];
  const label = active
    ? `${operatorFor(column.type, active.match)?.label ?? ""} ${describeValue(active, column.type)}`.trim()
    : null;

  const clear = (event) => {
    event.stopPropagation();
    dispatch(
      setColumnFilter({
        tableKey: filters.tableKey,
        field: column.field,
        filter: null,
      }),
    );
  };

  return (
    <Popover
      width={300}
      trigger={
        <button
          type="button"
          className={`tf-chip bg-white rounded-3 border d-flex flex-row gap-3 font-size-sm fw-normal ${active ? "is-active" : ""}`}
          style={{ height:32}}
        >
          <span className="tf-chip__name">{column.headerName}</span>
          {label && <span className="tf-chip__value">{label}</span>}
          {active ? (
            <span
              role="button"
              tabIndex={0}
              className="tf-chip__clear"
              aria-label={`Clear ${column.headerName} filter`}
              onClick={clear}
              onKeyDown={(event) => event.key === "Enter" && clear(event)}
            >
              <X size={12} strokeWidth={2} />
            </span>
          ) : (
            <ChevronDown
              size={13}
              strokeWidth={1.75}
              className="tf-chip__chev"
            />
          )}
        </button>
      }
    >
      {(close) => (
        <ChipEditor
          filters={filters}
          column={column}
          initial={active}
          close={close}
        />
      )}
    </Popover>
  );
}

function ChipEditor({ filters, column, initial, close }) {
  const dispatch = useDispatch();
  const operators = OPERATORS[column.type] ?? OPERATORS.text;
  const [draft, setDraft] = useState(() => ({
    field: column.field,
    match:
      initial?.match ??
      (column.type === "text" && column.options?.length
        ? "isAnyOf"
        : defaultOperator(column.type)),
    value: initial?.value ?? null,
  }));
  const complete = isConditionComplete(draft, column.type);
  const preview = filters.countMatching({
    columnFilters: {
      ...filters.state.columnFilters,
      ...(complete ? { [column.field]: draft } : {}),
    },
    conditions: filters.state.applied,
    logic: filters.state.appliedLogic,
  });

  const save = (filter) => {
    dispatch(
      setColumnFilter({
        tableKey: filters.tableKey,
        field: column.field,
        filter,
      }),
    );
    close();
  };

  return (
    <form
      className="tf-editor"
      onSubmit={(event) => {
        event.preventDefault();
        if (complete) save({ match: draft.match, value: draft.value });
      }}
    >
      <div className="tf-editor__head">
        <span className="tf-editor__title">{column.headerName}</span>
        <select
          className="form-select form-select-sm tf-editor__op"
          value={draft.match}
          aria-label="Condition"
          onChange={(event) => {
            const nextOp = operatorFor(column.type, event.target.value);
            const prevOp = operatorFor(column.type, draft.match);
            const shapeChanged =
              Boolean(nextOp?.multi) !== Boolean(prevOp?.multi) ||
              Boolean(nextOp?.range) !== Boolean(prevOp?.range);
            setDraft({
              ...draft,
              match: event.target.value,
              value: shapeChanged ? null : draft.value,
            });
          }}
        >
          {operators
            .filter((op) => !op.multi || column.options?.length)
            .map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
        </select>
      </div>
      <ConditionValueInput
        column={column}
        match={draft.match}
        value={draft.value}
        autoFocus
        onChange={(value) => setDraft({ ...draft, value })}
      />
      <div className="tf-editor__foot">
        <span className="tf-muted">
          {preview.matching} of {preview.total} rows
        </span>
        <div className="d-flex gap-2">
          {initial && (
            <button
              type="button"
              className="tf-btn tf-btn--ghost"
              onClick={() => save(null)}
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="tf-btn tf-btn--primary"
            disabled={!complete}
          >
            Apply
          </button>
        </div>
      </div>
    </form>
  );
}

function ChipPicker({ filters }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const selected = filters.chipFields;
  const visible = filters.columns.filter((column) =>
    column.headerName.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const toggle = (field) => {
    const fields = selected.includes(field)
      ? selected.filter((item) => item !== field)
      : [...selected, field];
    dispatch(setChipFields({ tableKey: filters.tableKey, fields }));
  };

  return (
    <Popover
      width={240}
      trigger={
        <button
          type="button"
          className="tf-chip tf-chip--add bg-white rounded-2 border"
          aria-label="Choose quick filters"
          style={{ width:32, height:32}}
        >
          <Plus size={13} strokeWidth={2} />
          {selected.length === 0 && (
            <span className="tf-chip__name">Add filter</span>
          )}
        </button>
      }
    >
      {() => (
        <div className="tf-picker">
          <span className="tf-picker__title">Quick filters</span>
          {filters.columns.length > 8 && (
            <input
              type="search"
              className="form-control form-control-sm mb-1"
              placeholder="Find a column"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
          <ul className="tf-multi__list">
            {visible.map((column) => {
              const isOn = selected.includes(column.field);
              return (
                <li key={column.field}>
                  <button
                    type="button"
                    className={`tf-multi__item ${isOn ? "is-selected" : ""}`}
                    onClick={() => toggle(column.field)}
                  >
                    <span className="tf-check" aria-hidden="true">
                      {isOn && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span className="tf-multi__label">{column.headerName}</span>
                    <span className="tf-type">{column.type}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Popover>
  );
}
