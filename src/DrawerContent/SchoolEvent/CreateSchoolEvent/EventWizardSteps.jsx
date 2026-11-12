import { createContext, useContext } from "react";
import WizardStepBar from "../../../components/Wizard/WizardStepBar";

/**
 * Shared state of the create / edit-draft event drawer: the steps, where the
 * user is, and which steps they may jump to.
 */
export const EventWizardContext = createContext(null);

export const useEventWizard = () => useContext(EventWizardContext);


// Clickable step bar shown under the drawer header.
export function EventWizardStepBar() {
  const wizard = useEventWizard();
  if (!wizard) return null;
  return <WizardStepBar {...wizard} ariaLabel="Event steps" layoutId="event-wizard-active-step" />;
}
