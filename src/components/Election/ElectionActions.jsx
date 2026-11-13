import {
  Ban,
  BarChart3,
  ClipboardCheck,
  Crown,
  ExternalLink,
  Lock,
  MoreHorizontal,
  Pencil,
  Rocket,
  Trash2,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfigureParticipants from "../../DrawerContent/Election/ConfigureParticipants";
import UpdateElection from "../../DrawerContent/Election/UpdateElection";
import {
  CancelElectionDialog,
  CloseVotingDialog,
  DeleteElectionDialog,
  PublishElectionDialog,
} from "../../ModalContent/Elections/ElectionLifecycleDialogs";
import { Drawer } from "../drawer/Drawer";
import CustomModal from "../Modals/Modal";
import Popover from "../Popover/Popover";

const LOCKED = ["voting_open", "voting_closed", "completed", "cancelled"];

// Dialogs and drawers render inside the card's React tree; keep their
// clicks and key presses from opening the election.
const stop = (event) => event.stopPropagation();

/**
 * Management actions available for an election in its current state.
 * kind: "drawer" | "modal" | "navigate"
 */
export function electionActions(election) {
  const status = election?.status;
  const locked = LOCKED.includes(status);
  const tab = (name) => `/elections/${election?.id}?tab=${name}`;
  const actions = [];

  if (!locked) {
    actions.push({ key: "edit", label: "Edit details", icon: Pencil, kind: "drawer", component: UpdateElection, title: "Edit Election" });
    actions.push({ key: "participants", label: "Voters & candidates", icon: UsersRound, kind: "drawer", component: ConfigureParticipants, title: "Election Participants" });
  }
  if (["upcoming", "application_open", "application_closed"].includes(status)) {
    actions.push({ key: "applications", label: "Review applications", icon: ClipboardCheck, kind: "navigate", to: tab("applications") });
  }
  if (["voting_open", "voting_closed", "completed"].includes(status)) {
    actions.push({ key: "results", label: status === "voting_open" ? "Live results" : "Results", icon: BarChart3, kind: "navigate", to: tab("results") });
  }
  if (status === "draft") {
    actions.push({ key: "publish", label: "Publish", icon: Rocket, kind: "modal", component: PublishElectionDialog });
  }
  if (status === "voting_open") {
    actions.push({ key: "close-voting", label: "Close voting now", icon: Lock, kind: "modal", component: CloseVotingDialog, tone: "danger" });
  }
  if (status && !["draft", "completed", "cancelled"].includes(status)) {
    actions.push({ key: "cancel", label: "Cancel election", icon: Ban, kind: "modal", component: CancelElectionDialog, tone: "danger" });
  }
  if (status === "draft" || status === "cancelled") {
    actions.push({ key: "delete", label: "Delete", icon: Trash2, kind: "modal", component: DeleteElectionDialog, tone: "danger" });
  }
  return actions;
}

// The single most useful action for the card's primary button.
const PRIMARY = {
  draft: { key: "publish", label: "Publish", icon: Rocket },
  upcoming: { key: "participants", label: "Participants", icon: UsersRound },
  application_open: { key: "applications", label: "Review", icon: ClipboardCheck },
  application_closed: { key: "applications", label: "Review", icon: ClipboardCheck },
  voting_open: { key: "results", label: "Live results", icon: BarChart3 },
  voting_closed: { key: "results", label: "Publish results", icon: Crown },
  completed: { key: "results", label: "Results", icon: BarChart3 },
};

/**
 * Primary action + "⋯" menu for an election, used on election cards so
 * elections can be managed without opening them.
 *
 *   <ElectionActions election={election} />
 */
export default function ElectionActions({ election }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const actions = electionActions(election);
  const primaryConfig = PRIMARY[election?.status];
  const primary = primaryConfig && actions.find((action) => action.key === primaryConfig.key);

  const run = (action) => {
    if (action.kind === "navigate") navigate(action.to);
    else setActive(action);
  };
  const close = () => setActive(null);
  const ActiveComponent = active?.component;

  return (
    <div className="d-flex flex-row align-items-center gap-1" onClick={stop} onKeyDown={stop}>
      {primary && (
        <button
          type="button"
          onClick={() => run(primary)}
          className={`border-none rounded-pill font-size-xs px-2 py-1 d-flex flex-row align-items-center gap-1 text-nowrap ${
            primary.kind === "modal" ? "primary-background text-white" : "bg-primary-50 text-primary-600"
          }`}
        >
          <primaryConfig.icon size={12} />
          {primaryConfig.label}
        </button>
      )}
      <Popover
        ariaLabel="Election actions"
        placement="bottom-end"
        triggerClassName="border rounded-pill bg-white d-grid text-iron-600"
        trigger={<MoreHorizontal size={14} style={{ margin: "0.2rem 0.45rem" }} />}
      >
        {({ close: closeMenu }) => (
          <div className="d-flex flex-column" role="menu" style={{ minWidth: "12rem" }}>
            {[{ key: "open", label: "Open election", icon: ExternalLink, kind: "navigate", to: `/elections/${election?.id}` }, ...actions].map((action) => (
              <button
                key={action.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  run(action);
                }}
                className={`border-none bg-transparent rounded-2 px-2 py-1 text-start d-flex flex-row align-items-center gap-2 font-size-sm dropdown-content-item ${
                  action.tone === "danger" ? "text-red-500" : "text-iron-700"
                }`}
              >
                <action.icon size={14} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </Popover>

      <Drawer
        isOpen={active?.kind === "drawer"}
        onClose={close}
        placement="right"
        title={active?.title}
        showHeader
        closeOnOutsideClick
      >
        {active?.kind === "drawer" && <ActiveComponent handleClose={close} drawerData={{ election }} />}
      </Drawer>
      <CustomModal show={active?.kind === "modal"} handleClose={close} size="md" centered>
        {active?.kind === "modal" && <ActiveComponent rowData={election} handleClose={close} />}
      </CustomModal>
    </div>
  );
}
