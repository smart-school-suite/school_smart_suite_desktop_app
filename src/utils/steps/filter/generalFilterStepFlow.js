import ColumnFilterMatch from "../../../components/GeneralFilter/Table/ColumnFilterMatch"
import ColumnSelect from "../../../components/GeneralFilter/Table/ColumnSelect"
import ColumnValueInput from "../../../components/GeneralFilter/Table/ColumnValueInput"
import PreviewFilter from "../../../components/GeneralFilter/Table/PreviewFilter"
export const GEN_FILTER_FLOW = [
    {
        program_name:"SELECT_COLUMN",
        component:ColumnSelect
    },
    {
        program_name:"FILTER_MATCH",
        component:ColumnFilterMatch
    },
    {
        program_name:"VALUE_INPUT",
        component:ColumnValueInput
    },
    {
        program_name:"PREVIEW",
        component: PreviewFilter
    }
]