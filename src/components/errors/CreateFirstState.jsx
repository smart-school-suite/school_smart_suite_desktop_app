import { Plus } from "lucide-react";
import DrawerTrigger from "../drawer/DrawerTrigger";
import EmptyState, { EmptyStateButton } from "./EmptyState";

/**
 * An empty list whose fix is to create the first item: a small mascot, what
 * the list is for, and a button that opens the create drawer.
 *
 *   <CreateFirstState
 *     title="No expense categories yet"
 *     description="Categories group your school's expenses..."
 *     createLabel="Create category"
 *     drawerTitle="Create Expense Category"
 *     createDrawer={CreateExpenseCategory}
 *   />
 */
export default function CreateFirstState({
  title,
  description,
  createLabel,
  drawerTitle,
  createDrawer,
  height = "100%",
  mascotHeight = "6rem",
}) {
  return (
    <EmptyState
      mascot="sad"
      title={title}
      description={description}
      height={height}
      mascotHeight={mascotHeight}
      actions={
        <DrawerTrigger title={drawerTitle} placement="right" drawerChildren={createDrawer}>
          <EmptyStateButton icon={Plus}>{createLabel}</EmptyStateButton>
        </DrawerTrigger>
      }
    />
  );
}
