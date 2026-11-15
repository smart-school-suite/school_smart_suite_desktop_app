import { Fragment, useEffect, useRef, useState } from "react";
import CustomModal from "../Modals/Modal";
import CustomTooltip from "../Tooltips/Tooltip";
import { DropDownMenuItem } from "../DataTableComponents/ActionComponent";
import BulkActionsToast from "./BulkActionsToast";

/**
 * Declarative bulk actions for BulkActionsToast.
 *
 * actions: [{ label, icon: LucideIcon, modal: Component, props?, size?, quick? }]
 *        or [{ label, icon, onClick }]   // runs directly, no modal
 *   - every action shows in the dropdown
 *   - actions with `quick: true` also show as an icon button in the toast
 *
 * The modal receives rowData={{ selected, resetAll }}, items, resetAll,
 * handleClose and anything in `props`.
 */
function useBulkModal() {
  const [config, setConfig] = useState(null);
  const open = (action) => {
    if (typeof action.onClick === "function") {
      action.onClick();
      return;
    }
    setConfig(action);
  };
  const close = () => setConfig(null);
  return { config, open, close };
}

function BulkModalHost({ config, close, selected, resetAll }) {
  const Component = config?.modal;
  return (
    <CustomModal
      show={Boolean(Component)}
      handleClose={close}
      size={config?.size ?? "md"}
      closeOnOutsideClick
      closeOnEscape
      centered
    >
      {Component && (
        <Component
          {...(config.props ?? {})}
          rowData={{ selected, resetAll }}
          items={selected}
          resetAll={resetAll}
          handleClose={close}
        />
      )}
    </CustomModal>
  );
}

export function BulkDropdownItems({
  actions,
  selected,
  resetAll,
  onModalStateChange,
}) {
  const { config, open, close } = useBulkModal();
  const modalRef = useRef(null);
  const isOpen = Boolean(config);

  useEffect(() => {
    if (typeof onModalStateChange === "function") {
      onModalStateChange(isOpen, modalRef);
    }
  }, [isOpen, onModalStateChange]);

  return (
    <>
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Fragment key={action.label}>
            {index > 0 && <hr />}
            <DropDownMenuItem
              className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
              onClick={() => open(action)}
            >
              <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between hover-text-primary-400 text-iron-700">
                <span className="font-size-sm">{action.label}</span>
                {Icon && <Icon size={16} strokeWidth={1.5} />}
              </div>
            </DropDownMenuItem>
          </Fragment>
        );
      })}
      <BulkModalHost
        config={config}
        close={close}
        selected={selected}
        resetAll={resetAll}
      />
    </>
  );
}

export function BulkActionButtons({ actions, selected, resetAll }) {
  const { config, open, close } = useBulkModal();
  const quick = actions.filter((action) => action.quick);
  if (quick.length === 0) return null;
  return (
    <>
      {quick.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type="button"
            className="border-none transparent-bg p-0 text-iron-700"
            onClick={(event) => {
              event.stopPropagation();
              open(action);
            }}
          >
            <CustomTooltip tooltipText={action.label}>
              <span className="pointer-cursor">
                {Icon && <Icon size={20} strokeWidth={1.5} />}
              </span>
            </CustomTooltip>
          </button>
        );
      })}
      <BulkModalHost
        config={config}
        close={close}
        selected={selected}
        resetAll={resetAll}
      />
    </>
  );
}

/**
 * Bulk actions toast for card grids, driven by useCardSelection.
 *   <CardBulkActions anchorRef={ref} selection={selection}
 *     noun={["Teacher", "Teachers"]} actions={[...]} />
 */
export function CardBulkActions({ anchorRef, selection, noun, actions }) {
  if (!selection || selection.count === 0) return null;
  const [one, many] = noun;
  return (
    <BulkActionsToast
      anchorRef={anchorRef}
      rowCount={selection.count}
      label={`${selection.count > 1 ? many : one} Selected`}
      resetAll={selection.clear}
      dropDownItems={
        <BulkDropdownItems
          actions={actions}
          selected={selection.selectedItems}
          resetAll={selection.clear}
        />
      }
      actionButton={
        <BulkActionButtons
          actions={actions}
          selected={selection.selectedItems}
          resetAll={selection.clear}
        />
      }
    />
  );
}
