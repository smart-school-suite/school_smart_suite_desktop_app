import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addCondition,
  applyConditions,
  clearConditions,
  removeCondition,
  setLogic,
  updateCondition,
} from "../../Slices/tableFilters/tableFiltersSlice";
import ConditionValueInput from "./ConditionValueInput";
import {
  OPERATORS,
  defaultOperator,
  isConditionComplete,
  operatorFor,
} from "./filterEngine";
import "./tableFilters.css";

const PANEL_WIDTH = 320;
const sameConditions = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Side panel for building filter conditions. Edits are drafts until Apply;
 * the footer previews how many rows the draft would keep.
 */
function TableFilterPanel({ filters }) {
  const dispatch = useDispatch();
  const { tableKey, state, columns, columnsByField } = filters;
  const { conditions, logic } = state;

  const typeOf = (field) => columnsByField[field]?.type ?? "text";
  const complete = conditions.filter((condition) =>
    isConditionComplete(condition, typeOf(condition.field)),
  );
  const incomplete = conditions.filter(
    (condition) =>
      condition.field &&
      !isConditionComplete(condition, typeOf(condition.field)),
  );
  const preview = filters.countMatching({ conditions: complete, logic });
  const dirty =
    !sameConditions(complete, state.applied) || logic !== state.appliedLogic;

  const update = (id, changes) =>
    dispatch(updateCondition({ tableKey, id, changes }));

  return (
    <aside className="tf-panel" aria-label="Filters">
      <header className="tf-panel__head">
        <div>
          <h3 className="tf-panel__title">Filters</h3>
          <p className="tf-panel__sub">
            Show only rows that match these conditions.
          </p>
        </div>
        <button
          type="button"
          className="tf-icon-btn"
          onClick={() => filters.togglePanel(false)}
          aria-label="Close filters"
        >
          <X size={16} strokeWidth={1.75} />
        </button>
      </header>

      <div className="tf-panel__body">
        {conditions.length > 1 && (
          <div
            className="tf-logic"
            role="radiogroup"
            aria-label="Combine conditions"
          >
            <span className="tf-muted">Rows must match</span>
            <div className="tf-seg">
              {[
                { value: "and", label: "All" },
                { value: "or", label: "Any" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={logic === option.value}
                  className={`tf-seg__btn ${logic === option.value ? "is-active" : ""}`}
                  onClick={() =>
                    dispatch(setLogic({ tableKey, logic: option.value }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <ol className="tf-conditions">
          {conditions.map((condition, index) => {
            const column = columnsByField[condition.field];
            const operators = OPERATORS[column?.type] ?? OPERATORS.text;
            return (
              <li key={condition.id} className="tf-condition">
                <div className="tf-condition__head">
                  <span className="tf-condition__join">
                    {index === 0 ? "Where" : logic === "or" ? "Or" : "And"}
                  </span>
                  <button
                    type="button"
                    className="tf-icon-btn tf-icon-btn--sm"
                    onClick={() =>
                      dispatch(removeCondition({ tableKey, id: condition.id }))
                    }
                    aria-label="Remove condition"
                  >
                    <X size={14} strokeWidth={1.75} />
                  </button>
                </div>
                <div className="tf-condition__fields">
                  <select
                    className="form-select form-select-sm"
                    value={condition.field ?? ""}
                    aria-label="Column"
                    onChange={(event) => {
                      const next = columnsByField[event.target.value];
                      update(condition.id, {
                        field: event.target.value || null,
                        match: next
                          ? next.type === "text" && next.options?.length
                            ? "isAnyOf"
                            : defaultOperator(next.type)
                          : null,
                        value: null,
                      });
                    }}
                  >
                    <option value="">Choose a column</option>
                    {columns.map((item) => (
                      <option key={item.field} value={item.field}>
                        {item.headerName}
                      </option>
                    ))}
                  </select>
                  {column && (
                    <select
                      className="form-select form-select-sm"
                      value={condition.match ?? ""}
                      aria-label="Condition"
                      onChange={(event) => {
                        const nextOp = operatorFor(
                          column.type,
                          event.target.value,
                        );
                        const prevOp = operatorFor(
                          column.type,
                          condition.match,
                        );
                        const shapeChanged =
                          Boolean(nextOp?.multi) !== Boolean(prevOp?.multi) ||
                          Boolean(nextOp?.range) !== Boolean(prevOp?.range);
                        update(condition.id, {
                          match: event.target.value,
                          ...(shapeChanged ? { value: null } : {}),
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
                  )}
                  {column && (
                    <ConditionValueInput
                      column={column}
                      match={condition.match}
                      value={condition.value}
                      onChange={(value) => update(condition.id, { value })}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          className="tf-btn tf-btn--dashed"
          onClick={() => dispatch(addCondition({ tableKey }))}
        >
          <Plus size={14} strokeWidth={2} />
          <span>Add condition</span>
        </button>

        {incomplete.length > 0 && (
          <p className="tf-hint">
            {incomplete.length === 1
              ? "One condition is missing a value and will be ignored."
              : `${incomplete.length} conditions are missing a value and will be ignored.`}
          </p>
        )}
      </div>

      <footer className="tf-panel__foot">
        <span className="tf-muted">
          <strong className="tf-strong">{preview.matching}</strong> of{" "}
          {preview.total} rows
        </span>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="tf-btn tf-btn--ghost"
            onClick={() => dispatch(clearConditions({ tableKey }))}
            disabled={!conditions.some((c) => c.field) && !state.applied.length}
          >
            Clear
          </button>
          <button
            type="button"
            className="tf-btn tf-btn--primary"
            disabled={!dirty}
            onClick={() =>
              dispatch(applyConditions({ tableKey, conditions: complete }))
            }
          >
            Apply
          </button>
        </div>
      </footer>
    </aside>
  );
}

/**
 * Lays the table out next to the filter panel. Pass the table (and anything
 * anchored to it, like the bulk-actions toast) as children.
 */
export function TableFilterLayout({ filters, children, tableWrapperRef }) {
  const open = filters.state.panelOpen;
  return (
    <div className="tf-layout">
      <div className="tf-layout__table" ref={tableWrapperRef}>
        {children}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="filter-panel"
            className="tf-layout__panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: PANEL_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <TableFilterPanel filters={filters} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TableFilterPanel;
