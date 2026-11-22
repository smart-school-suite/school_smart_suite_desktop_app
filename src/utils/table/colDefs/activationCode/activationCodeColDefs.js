import { BadgeRenderer, BADGE_CONTEXT } from "@/components/Renderer/badges";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import ActionComponent from "../../../../components/Badges/ActivationCode/ActionComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
export function activationCodeColDefs() {
  return [
    textColumn({
      field: "code",
      headerName: "Code",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "code_type",
      headerName: "Code Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "used_status",
      headerName: "Used Status",
      hide: false,
      cellRenderer: BadgeRenderer,
    }),
    textColumn({
      field: "expires_in",
      headerName: "Expires In",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Status",
      field: "status",
      hide: true,
      cellRenderer: BadgeRenderer,
      cellRendererParams: { context: BADGE_CONTEXT.ACTIVATION_CODE },
    }),
    numberColumn({
      headerName: "Duration",
      field: "duration",
      hide: true,
    }),
    textColumn({
      headerName: "Price",
      field: "price",
      hide: true,
      cellRenderer: CurrencyComponent,
    }),
    dateColumn({
      field: "expires_at",
      headerName: "Expire Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}
